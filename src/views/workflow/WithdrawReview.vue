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
        <el-table-column label="Amount" prop="tx_amount" align="center"/>
        <el-table-column label="Balance" prop="current_balance" align="center"/>
      </el-table>
    </div>

    <div class="sections-row" v-if="workflowDetail.note">
      <div class="cust-notice__div">
        <div class="cust-notice__text">{{ workflowDetail.note }}</div>
      </div>
    </div>
    <div class="sections-row" v-if="workflowDetail.reject_reason">
      <div class="cust-warning__div">{{ workflowDetail.reject_reason }}</div>
    </div>

    <div class="sections-row" v-if="tx_id">
      <div class="section transaction-id">
        <div class="section-name">Transaction ID:</div>
        <div class="section-value">
          <copy-btn :value="tx_id"></copy-btn>
        </div>
      </div>
    </div>

    <div class="sections-row" v-if="workflowDetail.tx_hash">
      <div class="section transaction-hash">
        <div class="section-name">Transaction Hash:</div>
        <div class="section-value">
          <copy-btn :value="workflowDetail.tx_hash"></copy-btn>
        </div>
      </div>
    </div>

    <div class="sections-row">
      <div class="section from">
        <div class="section-name">FROM:</div>
        <div class="section-prop-row">
          <span class="section-prop-name">Address Name:</span>
          <span class="section-prop-value">{{ workflowDetail.address_name }}</span>
        </div>
        <div class="section-prop-row">
          <span class="section-prop-name">Address:</span>
          <span class="section-prop-value">{{ workflowDetail.address }}</span>
        </div>
        <div class="section-prop-row">
          <span class="section-prop-name">Home Account:</span>
          <span class="section-prop-value">
            {{ $formatEnumType("CustodianType", workflowDetail.custodian_type) }}
            {{ workflowDetail.custodian_type ? "Account" : "" }}
          </span>
        </div>
      </div>
      <div class="section to">
        <div class="section-name">TO:</div>
        <div class="section-prop-row">
          <span class="section-prop-name">Address:</span>
          <span class="section-prop-value">{{ workflowDetail.to_address }}</span>
        </div>
      </div>
    </div>
    <div class="sections-row">
      <div class="section approval">
        <div class="section-name">Approval:</div>
        <el-steps
          :space="62"
          direction="vertical"
          :active="approvalFlowData.active"
          :process-status="processStatus"
        >
          <el-step v-for="(value, key, index) in approvalFlowData.list" :key="index" :title="value"></el-step>
        </el-steps>
      </div>
      <div class="section multi-sig">
        <div class="section-name">Multi-sig:</div>
        <el-steps :space="62" direction="vertical" :active="co_signFlowData.active">
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

    <input-dialog
      ref="rejectDialog"
      :inputRules="inputDialogInputRules"
      title="REJECT"
      message="Are you sure to reject this application?"
      placeholder="Please input the reason of this rejection (less than 200 characters)"
    />
    <confirm-dialog
      ref="approveDialog"
      title="APPROVE"
      message="Are you sure to approve this application?"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      ga: "",
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
    inputDialogInputRules() {
      return [
        { required: true, message: "Please input reject reason", trigger: "blur" },
        { min: 3, max: 200, message: "Input length must between 3 and 200", trigger: "blur" },
      ];
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
    approvalFlowData() {
      return this.$formatApprovalFlow(
        this.$store.getters.selectTransactionApprovalFlow(this.tx_id) || {},
        { hideInitiator: false },
      );
    },
    co_signFlowData() {
      return this.$formatCo_signFlow(
        this.$store.getters.selectTransactionCo_signFlow(this.tx_id) || {},
        { hideInitiator: true },
      );
    },
    processStatus() {
      return this.workflowDetail.status === "rejected" ? "error" : "process";
    },
  },
  created() {
    this.$store.dispatch("getWorkflowDetail", this.tx_id);
    this.$store.dispatch("getTransactionApprovalFlow", this.tx_id);
    this.$store.dispatch("getTransactionCo_signFlow", this.tx_id);
  },
  methods: {
    async onRejectClick() {
      await this.$refs.form.validate();
      const text = await this.$refs.rejectDialog.show();
      await this.$store.dispatch("approveTransaction", {
        tx_id: this.tx_id,
        data: {
          audit_result: false,
          msg: text,
        },
        ga: this.ga,
      });
      this.$message.success("Success");
      this.$router.back();
    },
    async onApproveClick() {
      await this.$refs.form.validate();
      const text = await this.$refs.approveDialog.show();
      await this.$store.dispatch("approveTransaction", {
        tx_id: this.tx_id,
        data: {
          audit_result: true,
          message: "",
        },
        ga: this.ga,
      });
      this.$message.success("Success");
      this.$router.back();
    },
    onActionClick() {
      this.$router.replace({ name: "withdraw-review-action", params: { tx_id: this.tx_id } });
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

    &.light {
      background-color: rgba(105, 135, 167, 0.5);
    }

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

    &.transaction-hash, &.transaction-id {
      margin-top: 39px;

      .fa-copy {
        margin-left: 9px;
        cursor: pointer;
      }
    }

    &.from,
    &.to {
      margin-top: 32px;
    }

    &.approval,
    &.multi-sig {
      margin-top: 60px;
      margin-bottom: 40px;
    }

    .section-name {
      font-size: 14px;
      font-family: OpenSans-Semibold, "PingFang SC", "微软雅黑", sans-serif;
      font-weight: 600;
      color: rgba(0, 0, 0, 1);
      line-height: 19px;
    }

    .section-value {
      margin-top: 10px;
      font-size: 14px;
      font-family: OpenSans, "PingFang SC", "微软雅黑", sans-serif;
      color: rgba(0, 120, 250, 1);
      line-height: 19px;
    }

    .section-prop-row {
      margin-top: 10px;
      display: flex;

      .section-prop-name {
        display: inline-block;
        width: 130px;
        font-size: 14px;
        font-family: OpenSans, "PingFang SC", "微软雅黑", sans-serif;
        color: rgba(95, 106, 118, 1);
        line-height: 19px;
      }

      .section-prop-value {
        flex: 1;
        font-size: 14px;
        font-family: OpenSans, "PingFang SC", "微软雅黑", sans-serif;
        color: rgba(0, 0, 0, 1);
        line-height: 19px;
        word-wrap: break-word;
        word-break: break-all;
      }
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
