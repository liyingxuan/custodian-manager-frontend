<!--
  - /***************************************************************************************
  - * Copyright © 2014-2018 Ontology Foundation Ltd.
  - * All rights reserved.
  - *
  - * This software is supplied only under the terms of a license agreement,
  - * nondisclosure agreement or other written agreement with Ontology Foundation Ltd.
  - * Use, redistribution or other disclosure of any parts of this
  - * software is prohibited except in accordance with the terms of such written
  - * agreement with Ontology Foundation Ltd. This software is confidential
  - * and proprietary information of Ontology Foundation Ltd.
  - *
  - ****************************************************************************************/
  -
  -->

<template>
  <div class="no-fixed-width-container">
    <div class="detail-table">
      <el-table
        :data="[workflowDetail]"
        header-cell-class-name="header-cell"
        cell-class-name="body-cell normal"
      >
        <el-table-column
          label="Activity"
          prop="activity"
          align="center"
          :formatter="(row, col, value) => $formatEnumType('ActivityType', value)"
        />
        <el-table-column label="Asset Type" prop="coin_type" align="center"/>
        <el-table-column
          label="Create Time"
          prop="create_time"
          align="center"
          :formatter="(row, col, value) => $formatDatetime(value)"
        />
        <el-table-column label="Address Name" prop="address_name" align="center"/>
      </el-table>
    </div>

    <div class="sections-row">
      <div class="section create-address">
        <div class="section-name">Create Address:</div>
        <el-steps
          :space="62"
          direction="vertical"
          :active="co_signFlowData.active"
          :process-status="processStatus"
        >
          <el-step v-for="(value, key, index) in co_signFlowData.list" :key="index" :title="value"></el-step>
        </el-steps>
      </div>
    </div>
    <div class="divider-line"/>

    <el-form ref="form" :model="this" :rules="formRules">
      <el-form-item v-if="inAction" class="input-row first last" label="GA Code:" prop="ga">
        <el-input v-model="ga" size="medium" placeholder="Enter your Google Authenticator code"/>
      </el-form-item>
    </el-form>
    <div v-if="inAction" class="divider-line"/>

    <div v-if="inAction || workflowDetail.has_permission" class="buttons-row">
      <el-button v-if="inAction" size="medium" round @click="onRejectClick">REJECT</el-button>
      <el-button v-if="inAction" type="primary" size="medium" round @click="onApproveClick">APPROVE</el-button>
      <el-button v-if="!inAction" size="primary" round @click="onActionClick">Action</el-button>
    </div>

    <confirm-dialog
      ref="rejectDialog"
      title="REJECT"
      message="Are you sure to reject this application?"
    />
    <confirm-dialog
      ref="approveDialog"
      title="APPROVE"
      message="Please make sure your Ledger is plugged in."
      :okOnly="true"
    />
    <progress-dialog
      title="CONNECTING"
      iconClass="ledger-connecting"
      message="Connecting to your Ledger..."
      :loading="ledgerConnecting"
    />
  </div>
</template>

<script>
import LedgerSDK from "@/ledgers/ledgerSDK";

export default {
  data() {
    return {
      ga: "",
      ledgerConnecting: false,
    };
  },
  computed: {
    formRules() {
      return {
        ga: [
          { required: true, message: "Please input GA code", trigger: "blur" },
          { pattern: /^\d{6}$/, trigger: "blur", message: "GA code must be a six-digit number" },
        ],
      };
    },
    inAction() {
      return this.$route.name.includes("action");
    },
    tx_id() {
      return this.$route.params.tx_id;
    },
    workflowDetail() {
      return this.$store.getters.selectWorkflowDetail(this.tx_id) || {};
    },
    co_signFlowData() {
      return this.$formatCo_signFlow(
        this.$store.getters.selectTransactionCo_signFlow(this.tx_id) || {},
        { hideInitiator: false },
      );
    },
    processStatus() {
      return this.workflowDetail.status === "rejected" ? "error" : "process";
    },
  },
  created() {
    Promise.all([
      this.$store.dispatch("getWorkflowDetail", this.tx_id),
      this.$store.dispatch("getTransactionCo_signFlow", this.tx_id),
    ]).then(() => {
      const total = this.co_signFlowData.list.length;
      const current = this.co_signFlowData.active;
      if (this.workflowDetail.status === "in-process" && current === total - 1) {
        this.$message.info("Please wait, creating an address takes up to 5 minutes to complete.");
      }
    });
  },
  methods: {
    async onRejectClick() {
      await this.$refs.form.validate();
      await this.$refs.rejectDialog.show();
      await this.$store.dispatch("rejectCreateAddress", {
        data: {
          tx_id: this.tx_id,
        },
        ga: this.ga,
      });
      this.$message.success("Success");
      this.$router.back();
    },
    async onApproveClick() {
      await this.$refs.form.validate();
      await this.$refs.approveDialog.show();
      const path = await this.$store.dispatch("getAddressLedgerPath", {
        tx_id: this.tx_id,
        ga: this.ga,
      });
      let result;
      try {
        this.ledgerConnecting = true;
        const sdk = await LedgerSDK.create(this.workflowDetail.coin_type);
        result = await sdk.getAddressAndPublicKey(path);
      } finally {
        this.ledgerConnecting = false;
      }
      await this.$store.dispatch("addAddressPublicKey", {
        tx_id: this.tx_id,
        data: {
          path,
          public_key: result.publicKey,
          hardware_address: result.address,
        },
      });
      this.$message.success("Success");
      this.$router.back();
    },
    onActionClick() {
      this.$router.replace({ name: "create-address-action", params: { tx_id: this.tx_id } });
    },
  },
};
</script>

<style lang="scss" scoped>
.no-fixed-width-container {
  background-color: rgba(255, 255, 255, 1);
}

.detail-table {
  /deep/ .header-cell {
    height: 48px;
    background-color: rgba(105, 135, 167, 1);

    .cell {
      font-size: 14px;
      font-family: OpenSans-Semibold, "PingFang SC", "微软雅黑", sans-serif;
      font-weight: 600;
      color: rgba(255, 255, 255, 1);
      line-height: 19px;
    }
  }

  /deep/ .body-cell {
    height: 48px;

    &.normal {
      .cell {
        color: rgba(95, 106, 118, 1);
      }
    }

    &.bold {
      .cell {
        color: rgba(0, 0, 0, 1);
      }
    }

    .cell {
      font-size: 14px;
      font-family: OpenSans, "PingFang SC", "微软雅黑", sans-serif;
      line-height: 19px;
    }
  }
}

.divider-line {
  border: 1px solid rgba(183, 200, 206, 0.5);
  transform: scaleY(0.5);
  transform-origin: 0 100%;
}

.sections-row {
  display: flex;

  .section {
    flex: 1;
    margin-left: 92px;

    &.create-address {
      margin-top: 39px;
      margin-bottom: 40px;
    }

    .section-name {
      font-size: 14px;
      font-family: OpenSans-Semibold, "PingFang SC", "微软雅黑", sans-serif;
      font-weight: 600;
      color: rgba(0, 0, 0, 1);
      line-height: 19px;
    }

    .el-steps {
      margin-top: 24px;

      /deep/ .el-step__title {
        font-size: 14px;
        font-family: OpenSans, "PingFang SC", "微软雅黑", sans-serif;
        color: rgba(0, 0, 0, 1);
        line-height: 19px;
        font-weight: normal;
      }

      /deep/ .is-error {
        color: rgba(200, 41, 9, 1);
      }
    }
  }
}

.input-row {
  margin-top: 22px;
  margin-left: 92px;
  display: flex;
  align-items: center;

  &.first {
    margin-top: 47px;
  }

  &.last {
    margin-bottom: 46px;
  }

  /deep/ .el-form-item__label {
    width: 200px;
    font-size: 14px;
    font-family: OpenSans, "PingFang SC", "微软雅黑", sans-serif;
    color: rgba(95, 106, 118, 1);
    line-height: 19px;
    text-align: left;
  }

  .el-input {
    width: 360px;
  }
}

.buttons-row {
  margin-top: 22px;
  margin-bottom: 22px;
  display: flex;
  justify-content: center;
  align-items: center;

  .el-button {
    width: 120px;

    &:not(:first-child) {
      margin-left: 48px;
    }
  }
}
</style>
