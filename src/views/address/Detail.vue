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
    <div class="content">
      <div class="detail-table">
        <el-table
          :data="[addressDetail]"
          header-cell-class-name="header-cell"
          cell-class-name="body-cell normal"
        >
          <el-table-column label="Corporate Name" prop="cust_name" align="center"/>
          <el-table-column label="Asset Type" prop="coin_type" align="center"/>
          <el-table-column label="Address Name" prop="address_name" align="center"/>
          <el-table-column label="Address" prop="address" align="center"/>
          <el-table-column
            label="Account Type"
            prop="custodian_type"
            align="center"
            :formatter="(row, col, value) => $formatEnumType('CustodianType', value)"
          />
          <el-table-column
            label="Sign Type"
            prop="algorithm"
            align="center"
            :formatter="(row, col, value) => $formatEnumType('AlgorithmType', value)"
          />
          <el-table-column label="Current Balance" prop="current_balance" align="center"/>
        </el-table>
      </div>

      <div class="sections-row">
        <div class="section address-qrcode">
          <div class="section-name">Address QR Code:</div>
          <vue-qr class="qrcode" :text="addressDetail.address|| ''" :size="140" :margin="0"/>
        </div>
        <div class="section approval">
          <div class="section-name">Approval Flow:</div>
          <el-steps :space="62" direction="vertical" :active="approvalFlowData.active">
            <el-step
              v-for="(value, key, index) in approvalFlowData.list"
              :key="index"
              :title="value"
            ></el-step>
          </el-steps>
        </div>
        <div class="section multi-sig">
          <div class="section-name">Withdraw Multi-sig Flow:</div>
          <el-steps :space="62" direction="vertical" :active="co_signFlowData.active">
            <el-step
              v-for="(value, key, index) in co_signFlowData.list"
              :key="index"
              :title="value"
            ></el-step>
          </el-steps>
        </div>
      </div>
    </div>

    <div class="title">TRANSACTION HISTORY</div>
    <div class="content">
      <div class="transaction-table">
        <div class="search-bar">
          <el-date-picker
            v-model="transactionSearchRange"
            type="datetimerange"
            range-separator="-"
            start-placeholder="Start Date"
            end-placeholder="End Date"
          ></el-date-picker>
          <div style="flex: 1"/>
          <el-button type="primary" size="mini" round @click="onTransactionResetClick">Reset</el-button>
        </div>
        <el-table
          class="g-header"
          ref="transactionTable"
          :data="transactionTableData"
          header-cell-class-name="header-cell"
          cell-class-name="body-cell normal"
          @filter-change="onTransactionFilterChange"
        >
          <el-table-column label="Transaction ID" prop="tx_id" align="center"/>
          <el-table-column
            label="Transaction Type"
            prop="tx_type"
            align="center"
            :formatter="(row, col, value) => $formatEnumType('TransactionType', value)"
            :filters="allTransactionTypeFilters"
            :filter-multiple="false"
            :filtered-value="transactionTransactionType ? [transactionTransactionType] : []"
            column-key="tx_type"
          />
          <el-table-column label="Asset Type" prop="coin_type" align="center"/>
          <el-table-column label="Address" prop="address" align="center"/>
          <el-table-column label="Amount" prop="amount" align="center"/>
          <el-table-column label="Balance" prop="current_balance" align="center"/>
          <el-table-column
            label="Status"
            prop="status"
            align="center"
            :formatter="(row, col, value) => $formatEnumType('TransactionStatusType', value)"
            :filters="allTransactionStatusTypeFilters"
            :filter-multiple="false"
            :filtered-value="transactionTransactionStatusType ? [transactionTransactionStatusType] : []"
            column-key="status"
          />
          <el-table-column
            label="Create Time"
            prop="create_time"
            align="center"
            :formatter="(row, col, value) => $formatDatetime(value)"
          />
          <el-table-column label="Operation" align="center">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="medium"
                @click="onDetailClick(scope.$index, scope.row)"
              >Detail</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination-row">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="transactionTableDataTotal"
            :current-page.sync="transactionTableCurrentPage"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueQr from "vue-qr";
import simplifyParams from "@/utils/simplifyParams";

export default {
  components: { VueQr },
  data() {
    return {
      transactionTableDataLoading: false,
      transactionSearchRange: this.$route.query.transactionStartDate &&
        this.$route.query.transactionEndDate && [
          new Date(Number(this.$route.query.transactionStartDate)),
          new Date(Number(this.$route.query.transactionEndDate)),
        ],
      transactionTransactionType: this.$route.query.transactionTransactionType,
      transactionTransactionStatusType: this.$route.query.transactionTransactionStatusType,
      transactionTableCurrentPage: Number(this.$route.query.transactionTableCurrentPage) || 1,
    };
  },
  computed: {
    address() {
      return this.$route.params.address;
    },
    coin_type() {
      return this.$route.params.coin_type;
    },
    addressDetail() {
      return (
        this.$store.getters.selectAddressDetail({
          address: this.address,
          queryParams: {
            coin_type: this.coin_type,
          },
        }) || {}
      );
    },
    approvalFlowData() {
      return this.$formatApprovalFlow(
        this.$store.getters.selectAddressApprovalFlow(this.address) || {},
        { hideInitiator: true },
      );
    },
    co_signFlowData() {
      return this.$formatCo_signFlow(
        this.$store.getters.selectAddressCo_signFlow(this.address) || {},
        { hideInitiator: true },
      );
    },
    queryParamsOfGetTransactions() {
      return simplifyParams({
        address: this.address,
        coin_type: this.coin_type,
        start_date:
          (this.transactionSearchRange && this.transactionSearchRange[0].getTime()) || undefined,
        end_date:
          (this.transactionSearchRange && this.transactionSearchRange[1].getTime()) || undefined,
        tx_type: this.transactionTransactionType || undefined,
        status_type: this.transactionTransactionStatusType || undefined,
        page_index: this.transactionTableCurrentPage,
        page_offset: 10,
      });
    },
    transactionTableData() {
      return this.$store.getters.selectTransactions(this.queryParamsOfGetTransactions) || [];
    },
    transactionTableDataTotal() {
      return this.$store.getters.selectTransactionsTotal(this.queryParamsOfGetTransactions) || 0;
    },
    allTransactionTypes() {
      return ["withdraw", "deposit"];
    },
    allTransactionTypeFilters() {
      return this.allTransactionTypes.map(item => ({
        text: this.$formatEnumType("TransactionType", item),
        value: item,
      }));
    },
    allTransactionStatusTypes() {
      return [
        "succeed",
        "failed",
        "rejected",
        "pending-for-approval",
        "pending-for-sign",
        "in-process",
        "blockchain-confirming",
      ];
    },
    allTransactionStatusTypeFilters() {
      return this.allTransactionStatusTypes.map(item => ({
        text: this.$formatEnumType("TransactionStatusType", item),
        value: item,
      }));
    },
  },
  watch: {
    queryParamsOfGetTransactions: {
      async handler(val) {
        this.$router.replace({
          name: this.$route.name,
          query: simplifyParams({
            ...this.$route.query,
            transactionStartDate: val.start_date,
            transactionEndDate: val.end_date,
            transactionTransactionType: val.tx_type,
            transactionTransactionStatusType: val.status_type,
            transactionTableCurrentPage: val.page_index,
          }),
        });
        try {
          this.transactionTableDataLoading = true;
          await this.$store.dispatch("getTransactions", val);
        } finally {
          this.transactionTableDataLoading = false;
        }
      },
      deep: true,
      immediate: true,
    },
  },
  created() {
    this.$store.dispatch("getAddressDetail", {
      address: this.address,
      queryParams: {
        coin_type: this.coin_type,
      },
    });
    this.$store.dispatch("getAddressApprovalFlow", this.address);
    this.$store.dispatch("getAddressCo_signFlow", this.address);
  },
  methods: {
    onDetailClick(index, row) {
      this.$router.push({ name: "transaction-detail", params: { tx_id: row.tx_id } });
    },
    onTransactionFilterChange(filters) {
      if (filters.tx_type) {
        this.transactionTransactionType = filters.tx_type[0];
      }
      if (filters.status) {
        this.transactionTransactionStatusType = filters.status[0];
      }
      this.transactionTableCurrentPage = 1;
    },
    onTransactionResetClick() {
      this.transactionSearchRange = null;
      this.transactionTransactionType = "";
      this.transactionTransactionStatusType = "";
      this.transactionTableCurrentPage = 1;
      this.$refs.transactionTable.clearFilter();
    },
  },
};
</script>

<style lang="scss" scoped>
.no-fixed-width-container {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.content {
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
      font-family: OpenSans-Semibold;
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
      font-family: OpenSans;
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
    margin-left: 60px;

    &.address-qrcode {
      margin-top: 40px;
      margin-bottom: 40px;

      .qrcode {
        margin-top: 10px;
      }
    }

    &.approval,
    &.multi-sig {
      margin-top: 40px;
      margin-bottom: 40px;
    }

    .section-name {
      font-size: 14px;
      font-family: OpenSans-Semibold;
      font-weight: 600;
      color: rgba(0, 0, 0, 1);
      line-height: 19px;
    }

    .section-value {
      margin-top: 10px;
      font-size: 14px;
      font-family: OpenSans;
      color: rgba(0, 0, 0, 1);
      line-height: 19px;
    }

    .el-steps {
      margin-top: 24px;

      /deep/ .el-step__title {
        font-size: 14px;
        font-family: OpenSans;
        color: rgba(0, 0, 0, 1);
        line-height: 19px;
        font-weight: normal;
      }
    }
  }
}

.title {
  margin: 24px 24px;
  font-size: 38px;
  font-family: OpenSans-Light;
  font-weight: 300;
  color: rgba(0, 51, 106, 1);
  line-height: 52px;
}

.transaction-table {
  .search-bar {
    padding: 10px;
    display: flex;
    align-items: center;
  }

  /deep/ .header-cell {
    height: 48px;
    background-color: rgba(105, 135, 167, 1);

    .cell {
      font-size: 14px;
      font-family: OpenSans-Semibold;
      font-weight: 600;
      color: rgba(255, 255, 255, 1);
      line-height: 19px;

      i {
        color: rgba(255, 255, 255, 1);
      }
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
      font-family: OpenSans;
      line-height: 19px;
    }
  }

  .pagination-row {
    height: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
