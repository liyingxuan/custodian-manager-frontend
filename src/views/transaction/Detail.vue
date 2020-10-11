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
        :data="[transactionDetail]"
        header-cell-class-name="header-cell"
        cell-class-name="body-cell normal"
      >
        <el-table-column label="Corporate Name" prop="cust_name" align="center"/>
        <el-table-column
          label="Transaction Type"
          prop="tx_type"
          align="center"
          :formatter="(row, col, value) => $formatEnumType('TransactionType', value)"
        />
        <el-table-column
          label="Status"
          prop="status"
          align="center"
          :formatter="(row, col, value) => $formatEnumType('TransactionStatusType', value)"
        />
        <el-table-column label="Asset Type" prop="coin_type" align="center"/>
        <el-table-column label="Amount" prop="amount" align="center"/>
        <el-table-column label="Balance" prop="current_balance" align="center"/>
        <el-table-column
          label="Create Time"
          prop="create_time"
          align="center"
          :formatter="(row, col, value) => $formatDatetime(value)"
        />
      </el-table>
    </div>

    <!--Note and Reject Reason-->
    <div class="sections-row" v-if="transactionDetail.note">
      <div class="cust-notice__div">
        <div class="cust-notice__text">{{ transactionDetail.note }}</div>
      </div>
    </div>
    <div class="sections-row" v-if="transactionDetail.reject_reason">
      <div class="cust-warning__div">{{ transactionDetail.reject_reason }}</div>
    </div>

    <div class="sections-row" v-if="tx_id">
      <div class="section transaction-id">
        <div class="section-name">Transaction ID:</div>
        <div class="section-value">
          <copy-btn :value="tx_id"></copy-btn>
        </div>
      </div>
    </div>

    <div class="sections-row" v-if="transactionDetail.tx_hash">
      <div class="section transaction-hash">
        <div class="section-name">Transaction Hash:</div>
        <div class="section-value">
          <copy-btn :value="transactionDetail.tx_hash"></copy-btn>
        </div>
      </div>
    </div>

    <div class="sections-row">
      <div class="section from">
        <div class="section-name">FROM:</div>
        <div v-if="inWithdraw" class="section-prop-row">
          <span class="section-prop-name">Address Name:</span>
          <span class="section-prop-value">{{ transactionDetail.from_address_name }}</span>
        </div>
        <div class="section-prop-row">
          <span class="section-prop-name">Address:</span>
          <span class="section-prop-value">{{ transactionDetail.from_address }}</span>
        </div>
        <div v-if="inWithdraw" class="section-prop-row">
          <span class="section-prop-name">Home Account:</span>
          <span class="section-prop-value">
            {{ $formatEnumType("CustodianType", transactionDetail.custodian_type) }}
            {{ transactionDetail.custodian_type ? "Account" : "" }}
          </span>
        </div>
      </div>
      <div class="section to">
        <div class="section-name">TO:</div>
        <div v-if="inDeposit" class="section-prop-row">
          <span class="section-prop-name">Address Name:</span>
          <span class="section-prop-value">{{ transactionDetail.to_address_name }}</span>
        </div>
        <div class="section-prop-row">
          <span class="section-prop-name">Address:</span>
          <span class="section-prop-value">{{ transactionDetail.to_address }}</span>
        </div>
        <div v-if="inDeposit" class="section-prop-row">
          <span class="section-prop-name">Home Account:</span>
          <span class="section-prop-value">
            {{ $formatEnumType("CustodianType", transactionDetail.custodian_type) }}
            {{ transactionDetail.custodian_type ? "Account" : "" }}
          </span>
        </div>
      </div>
    </div>
    <div v-if="inWithdraw" class="sections-row">
      <div class="section approval">
        <div class="section-name">Approval:</div>
        <el-steps
          :space="62"
          direction="vertical"
          :active="approvalFlowData.active"
          :process-status="transactionDetail.activity === 'withdraw-review' ? processStatus : undefined"
        >
          <el-step v-for="(value, key, index) in approvalFlowData.list" :key="index" :title="value"></el-step>
        </el-steps>
      </div>
      <div class="section multi-sig">
        <div class="section-name">Multi-sig:</div>
        <el-steps
          :space="62"
          direction="vertical"
          :active="co_signFlowData.active"
          :process-status="transactionDetail.activity === 'withdraw-operate' ? processStatus : undefined"
        >
          <el-step v-for="(value, key, index) in co_signFlowData.list" :key="index" :title="value"></el-step>
        </el-steps>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    tx_id() {
      return this.$route.params.tx_id;
    },
    transactionDetail() {
      return this.$store.getters.selectTransactionDetail(this.tx_id) || {};
    },
    inWithdraw() {
      return this.transactionDetail.tx_type === "withdraw";
    },
    inDeposit() {
      return this.transactionDetail.tx_type === "deposit";
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
      return this.transactionDetail.status === "rejected" ? "error" : "process";
    },
  },
  watch: {
    inWithdraw(val) {
      if (val) {
        this.$store.dispatch("getTransactionApprovalFlow", this.tx_id);
        this.$store.dispatch("getTransactionCo_signFlow", this.tx_id);
      }
    },
  },
  created() {
    this.$store.dispatch("getTransactionDetail", this.tx_id);
  },
};
</script>

<style lang="scss" scoped>
.no-fixed-width-container {
  background-color: rgba(255, 255, 255, 1);
  padding-bottom: 40px;
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
    }
  }
}
</style>
