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
    <div>
      <el-table class="g-header" :data="addresses" :cell-class-name="cellClassName">
        <el-table-column
          align="center"
          header-align="center"
          label="Address Name"
          prop="address_name"
        ></el-table-column>

        <el-table-column align="center" header-align="center" label="Asset Type" prop="coin_type"></el-table-column>

        <el-table-column
          align="center"
          header-align="center"
          label="Address"
          prop="address"
          width="300px"
        ></el-table-column>
        <el-table-column
          align="center"
          header-align="center"
          label="Type"
          prop="custodian_type"
          :formatter="(row, col, value) => $formatEnumType('CustodianType', value)"
        ></el-table-column>

        <el-table-column
          align="right"
          header-align="center"
          label="Current Balance"
          prop="current_balance"
        ></el-table-column>

        <el-table-column
          align="center"
          header-align="center"
          label="Create Time"
          prop="create_time"
          :formatter="(row, col, value) => $formatDatetime(value)"
        ></el-table-column>
        <el-table-column align="center" header-align="center" label="Operation">
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
          @current-change="loadData"
          layout="prev, pager, next"
          :total="addressesTotal"
          :current-page.sync="addressParams.page_index"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  props: ["userId"],
  data() {
    return {
      inputAddress: "",
      addressParams: {
        page_index: 1,
        page_offset: 10,
      },
    };
  },
  computed: {
    addresses() {
      return (
        this.$store.getters.selectCustomerAddresses({
          customerId: this.userId,
          queryParams: this.addressParams,
        }) || []
      );
    },
    addressesTotal() {
      return (
        this.$store.getters.selectCustomerAddressesTotal({
          customerId: this.userId,
          queryParams: this.addressParams,
        }) || 0
      );
    },
  },
  created() {
    this.loadData();
  },
  methods: {
    loadData() {
      this.$store.dispatch("getCustomerAddresses", {
        customerId: this.userId,
        queryParams: this.addressParams,
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
    handleSeeDetail(index, row) {
      this.$router.push({
        name: "address-information",
        params: { address: row.address, coin_type: row.coin_type },
      });
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped></style>
