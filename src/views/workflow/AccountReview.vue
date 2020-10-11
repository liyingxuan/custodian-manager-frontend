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
        header-cell-class-name="header-cell light"
        cell-class-name="body-cell normal"
      >
        <el-table-column label="Corporate Name" prop="cust_name" align="center"/>
        <el-table-column label="User ID" prop="cust_id" align="center"/>
        <el-table-column label="Email" prop="cust_email" align="center"/>
      </el-table>
    </div>

    <div class="message">Pending for Approval</div>

    <div class="detail-table">
      <el-table
        :data="[workflowDetail]"
        header-cell-class-name="header-cell"
        cell-class-name="body-cell normal"
      >
        <el-table-column label="Name" prop="acct_name" align="center"/>
        <el-table-column label="Position" prop="position" align="center"/>
        <el-table-column label="Phone Number" prop="mobile" align="center"/>
        <el-table-column label="Email" prop="acct_email" align="center"/>
        <el-table-column label="User Type" prop="role_type" align="center"/>
      </el-table>
    </div>

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
    inAction() {
      return this.$route.name.includes("action");
    },
    tx_id() {
      return this.$route.params.tx_id;
    },
    workflowDetail() {
      return this.$store.getters.selectWorkflowDetail(this.tx_id) || {};
    },
  },
  created() {
    this.$store.dispatch("getWorkflowDetail", this.tx_id);
  },
  methods: {
    async onRejectClick() {
      await this.$refs.form.validate();
      await this.$refs.rejectDialog.show();
      await this.$store.dispatch("approveAccount", {
        data: {
          approver_email: this.workflowDetail.acct_email,
          approved: false,
        },
        ga: this.ga,
      });
      this.$message.success("Success");
      this.$router.back();
    },
    async onApproveClick() {
      await this.$refs.form.validate();
      await this.$refs.approveDialog.show();
      await this.$store.dispatch("approveAccount", {
        data: {
          approver_email: this.workflowDetail.acct_email,
          approved: true,
        },
        ga: this.ga,
      });
      this.$message.success("Success");
      this.$router.back();
    },
    onActionClick() {
      this.$router.replace({ name: "account-review-action", params: { tx_id: this.tx_id } });
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

.message {
  margin: 34px 0 24px 22px;
  font-size: 14px;
  font-family: OpenSans-Semibold, "PingFang SC", "微软雅黑", sans-serif;
  font-weight: 600;
  color: rgba(0, 0, 0, 1);
  line-height: 19px;
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
