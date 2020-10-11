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
  <div>
    <el-table class="g-header" :data="accounts" :cell-class-name="cellClassName">
      <el-table-column align="center" header-align="center" label="Name" prop="acct_name"></el-table-column>

      <el-table-column align="center" header-align="center" label="Position" prop="position"></el-table-column>

      <el-table-column align="center" header-align="center" label="Email" prop="email"></el-table-column>
      <el-table-column align="center" header-align="center" label="User Type" prop="role_type"></el-table-column>

      <el-table-column
        align="center"
        header-align="center"
        label="Status"
        prop="status"
        :formatter="(row, col, value) => $formatEnumType('AccountStatusType', value)"
      ></el-table-column>

    </el-table>
    <div class="g-pagination-area">
      <el-pagination
        background
        @current-change="loadSubAccountsData"
        layout="prev, pager, next"
        :total="accountsTotal"
        :current-page.sync="accountParams.page_index"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  props: ["userId"],
  data() {
    return {
      accountParams: {
        page_index: 1,
        page_offset: 10,
      },
    };
  },
  computed: {
    accounts() {
      return (
        this.$store.getters.selectCustomerAccounts({
          customerId: this.userId,
          queryParams: this.accountParams,
        }) || []
      );
    },
    accountsTotal() {
      return (
        this.$store.getters.selectCustomerAccountsTotal({
          customerId: this.userId,
          queryParams: this.accountParams,
        }) || 0
      );
    },
  },
  created() {
    this.loadSubAccountsData();
  },
  methods: {
    loadSubAccountsData() {
      this.$store.dispatch("getCustomerAccounts", {
        customerId: this.$route.params.id,
        queryParams: this.accountParams,
      });
    },
    cellClassName(o) {
      const { row, column, rowIndex, columnIndex } = o;

      if (columnIndex === 1 || columnIndex === 4) {
        return "g-table-column-bold";
      } else {
        return "g-table-column-light";
      }
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped></style>
