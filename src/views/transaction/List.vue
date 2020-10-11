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
    <div class="cust__table-title-manage">TRANSACTION RECORD</div>

    <div class="content" v-loading="transactionTableDataLoading">
      <div class="transaction-table">
        <div class="search-bar">
          <el-input
            v-model="transactionSearchStringTemp"
            placeholder="Address"
            @keyup.enter.native="onTransactionSearchClick"
          >
            <el-button slot="append" icon="el-icon-search" @click="onTransactionSearchClick"/>
          </el-input>
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
          <el-table-column label="Corporate Name" prop="cust_name" align="center"/>
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
          <el-table-column
            label="Asset Type"
            prop="coin_type"
            align="center"
            :filters="allCoinTypeFilters"
            :filter-multiple="false"
            :filtered-value="transactionCoinType ? [transactionCoinType] : []"
            column-key="coin_type"
          />
          <el-table-column label="Address" prop="address" align="center"/>
          <el-table-column label="Amount" prop="amount" align="center"/>
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
import simplifyParams from "@/utils/simplifyParams";

export default {
  data() {
    return {
      transactionTableDataLoading: false,
      transactionSearchStringTemp: this.$route.query.transactionSearchString,
      transactionSearchString: this.$route.query.transactionSearchString,
      transactionSearchRange: this.$route.query.transactionStartDate &&
        this.$route.query.transactionEndDate && [
          new Date(Number(this.$route.query.transactionStartDate)),
          new Date(Number(this.$route.query.transactionEndDate)),
        ],
      transactionTransactionType: this.$route.query.transactionTransactionType,
      transactionCoinType: this.$route.query.transactionCoinType,
      transactionTransactionStatusType: this.$route.query.transactionTransactionStatusType,
      transactionTableCurrentPage: Number(this.$route.query.transactionTableCurrentPage) || 1,
    };
  },
  computed: {
    queryParamsOfGetTransactions() {
      return simplifyParams({
        tx_and_addr_and_cust_name: this.transactionSearchString || undefined,
        start_date:
          (this.transactionSearchRange && this.transactionSearchRange[0].getTime()) || undefined,
        end_date:
          (this.transactionSearchRange && this.transactionSearchRange[1].getTime()) || undefined,
        tx_type: this.transactionTransactionType || undefined,
        coin_type: this.transactionCoinType || undefined,
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
    allCoinTypes() {
      return ["BTC", "LTC", "ETH"];
    },
    allCoinTypeFilters() {
      return this.allCoinTypes.map(item => ({ text: item, value: item }));
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
            transactionSearchString: val.tx_and_addr_and_cust_name,
            transactionStartDate: val.start_date,
            transactionEndDate: val.end_date,
            transactionTransactionType: val.tx_type,
            transactionCoinType: val.coin_type,
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
  methods: {
    onDetailClick(index, row) {
      this.$router.push({ name: "transaction-detail", params: { tx_id: row.tx_id } });
    },
    onTransactionFilterChange(filters) {
      if (filters.tx_type) {
        this.transactionTransactionType = filters.tx_type[0];
      }
      if (filters.coin_type) {
        this.transactionCoinType = filters.coin_type[0];
      }
      if (filters.status) {
        this.transactionTransactionStatusType = filters.status[0];
      }
      this.transactionTableCurrentPage = 1;
    },
    onTransactionSearchClick() {
      this.transactionSearchString = this.transactionSearchStringTemp;
      this.transactionTableCurrentPage = 1;
    },
    onTransactionResetClick() {
      this.transactionSearchStringTemp = "";
      this.transactionSearchString = "";
      this.transactionSearchRange = null;
      this.transactionTransactionType = "";
      this.transactionCoinType = "";
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

.transaction-table {
  .search-bar {
    padding: 10px;
    display: flex;
    align-items: center;

    .el-input {
      width: 450px;
    }

    .el-date-editor {
      margin-left: 10px;
    }
  }

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

  .pagination-row {
    height: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
