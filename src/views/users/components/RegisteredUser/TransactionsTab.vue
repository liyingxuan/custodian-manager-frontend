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
  <div class="addresses-area">
    <div class="history">
      <div class="transaction-history-table">
        <el-table
          class="g-header"
          :data="transactionTableData"
          row-class-name="g-table-row-regular"
        >
          <el-table-column label="Transaction ID" prop="tx_id"/>
          <el-table-column label="Amount" prop="amount"></el-table-column>

          <el-table-column label="Asset Type" prop="coin_type"></el-table-column>
          <el-table-column width="300px" label="Address" prop="address"></el-table-column>
          <el-table-column
            label="Status"
            prop="status"
            :formatter="(row, col, value) => $formatEnumType('TransactionStatusType', value)"
          ></el-table-column>

          <el-table-column
            label="Create Time"
            prop="create_time"
            align="center"
            :formatter="(row, col, value) => $formatDatetime(value)"
          />

          <el-table-column label="Balance" prop="current_balance"></el-table-column>

          <el-table-column label="Operation">
            <template slot-scope="scope">
              <div class="g-table-actions">
                <div
                  class="g-table-action"
                  @click="handleSeeDetail(scope.$index, scope.row)"
                >See Detail</div>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div class="g-pagination-area">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="transactionTableDataTotal"
            :current-page.sync="txParams.page_index"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["userId"],
  data() {
    return {
      inputAddress: "",
      transactionTableDataLoading: false,
      txParams: {
        page_index: 1,
        page_offset: 10,
      },
    };
  },
  computed: {
    queryParamsOfGetTransactions() {
      return {
        customerId: this.userId,
        queryParams: this.txParams,
      };
    },
    transactionTableData() {
      return (
        this.$store.getters.selectCustomerTransactions(this.queryParamsOfGetTransactions) || []
      );
    },
    transactionTableDataTotal() {
      return (
        this.$store.getters.selectCustomerTransactionsTotal(this.queryParamsOfGetTransactions) || 0
      );
    },
  },
  watch: {
    queryParamsOfGetTransactions: {
      async handler(val) {
        try {
          this.transactionTableDataLoading = true;
          await this.$store.dispatch("getCustomerTransactions", val);
        } finally {
          this.transactionTableDataLoading = false;
        }
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    cellClassName(o) {
      const { row, column, rowIndex, columnIndex } = o;

      if (columnIndex === 1 || columnIndex === 4) {
        return "g-table-column-bold";
      } else {
        return "g-table-column-light";
      }
    },
    handleSeeDetail(index, row) {
      this.$router.push({
        name: "transaction-detail",
        params: { tx_id: row.tx_id },
      });
    },
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped></style>
