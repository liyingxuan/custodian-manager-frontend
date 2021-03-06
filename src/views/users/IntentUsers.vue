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
    <div class="address">
      <div class="cust__table-title-manage">INTENT USER MANAGEMENT</div>

      <div class="content" v-loading="dataLoading">
        <div class="customer-table">
          <div class="search-bar">
            <el-input
              v-model="customerSearchStringTemp"
              placeholder="Email or corporate name"
              @keyup.enter.native="onCustomerSearchClick"
            >
              <el-button slot="append" icon="el-icon-search" @click="onCustomerSearchClick"/>
            </el-input>
            <div style="flex: 1"/>
            <el-button type="primary" size="mini" round @click="onCustomerResetClick">Reset</el-button>
          </div>
          <el-table
            class="g-header"
            highlight-current-row
            :cell-class-name="cellClassName"
            :data="customersList"
          >
            <el-table-column align="center" header-align="center" label="User ID" prop="cust_id"></el-table-column>

            <el-table-column
              align="center"
              header-align="center"
              label="Corporate Name"
              prop="cust_name"
            ></el-table-column>

            <el-table-column align="center" header-align="center" label="Email" prop="email"></el-table-column>

            <el-table-column
              align="center"
              header-align="center"
              label="Status"
              prop="status"
              :formatter="(row, col, value) => $formatEnumType('CustomerStatusType', value)"
            ></el-table-column>

            <el-table-column align="center" header-align="center" label="Operation" fixed="right">
              <template slot-scope="scope">
                <div class="g-table-actions">
                  <div
                    v-show="
                      !(
                        scope.row.status === 'pending-first-review' ||
                        scope.row.status === 'pending-rco-review'
                      )
                    "
                    class="g-table-action"
                    @click="handleView(scope.$index, scope.row)"
                  >View</div>

                  <div
                    v-show="scope.row.status === 'pending-first-review'"
                    class="g-table-action"
                    @click="handleFirstReview(scope.$index, scope.row)"
                  >First Review</div>

                  <div
                    v-show="scope.row.status === 'pending-rco-review'"
                    class="g-table-action"
                    @click="handleRCOReview(scope.$index, scope.row)"
                  >RCO Review</div>
                </div>
              </template>
            </el-table-column>
          </el-table>

          <div class="g-pagination-area">
            <el-pagination
              background
              layout="prev, pager, next"
              :total="customersListTotal"
              :current-page.sync="customerTableCurrentPage"
            ></el-pagination>
          </div>
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
      dataLoading: false,
      currentRow: null,
      inputAddress: "",
      customerSearchStringTemp: this.$route.query.customerSearchString,
      customerSearchString: this.$route.query.customerSearchString,
      customerTableCurrentPage: Number(this.$route.query.customerTableCurrentPage) || 1,
    };
  },
  computed: {
    queryParamsOfGetCustomers() {
      return simplifyParams({
        registered: false,
        email_and_cust_name: this.customerSearchString || undefined,
        page_index: this.customerTableCurrentPage,
        page_offset: 10,
      });
    },
    customersList() {
      return this.$store.getters.selectCustomers(this.queryParamsOfGetCustomers) || [];
    },
    customersListTotal() {
      return this.$store.getters.selectCustomersTotal(this.queryParamsOfGetCustomers) || 0;
    },
  },
  watch: {
    queryParamsOfGetCustomers: {
      async handler(val) {
        this.$router.replace({
          name: this.$route.name,
          query: simplifyParams({
            ...this.$route.query,
            customerSearchString: val.email_and_cust_name,
            customerTableCurrentPage: val.page_index,
          }),
        });
        try {
          this.dataLoading = true;
          await this.$store.dispatch("getCustomers", val);
        } finally {
          this.dataLoading = false;
        }
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    handleView(index, row) {
      this.$router.push({ name: "intent-user", params: { id: row.cust_id } });
    },
    handleFirstReview(index, row) {
      this.$router.push({ name: "first-review", params: { id: row.cust_id } });
    },
    handleRCOReview(index, row) {
      this.$router.push({ name: "rco-review", params: { id: row.cust_id } });
    },
    cellClassName(o) {
      const { row, column, rowIndex, columnIndex } = o;

      if (columnIndex === 1 || columnIndex === 3) {
        return "g-table-column-bold";
      } else {
        return "g-table-column-light";
      }
    },
    onCustomerSearchClick() {
      this.customerSearchString = this.customerSearchStringTemp;
      this.customerTableCurrentPage = 1;
    },
    onCustomerResetClick() {
      this.customerSearchStringTemp = "";
      this.customerSearchString = "";
      this.customerTableCurrentPage = 1;
    },
  },
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import "../../styles/variables.scss";

.content {
  background-color: rgba(255, 255, 255, 1);
}

.customer-table {
  .search-bar {
    padding: 10px;
    display: flex;
    align-items: center;

    .el-input {
      width: 450px;
    }
  }
}
</style>
