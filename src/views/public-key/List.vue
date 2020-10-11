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
    <div class="public-key">
      <div class="cust__table-title-manage">PUBLIC KEY MANAGEMENT</div>

      <div class="cust__table-top-add">
        <table class="unused-stat">
          <tr>
            <td>Total Available Keys:</td>
            <td>BTC: {{publicKeysUnusedStat.BTC && publicKeysUnusedStat.BTC.total_unused}}</td>
            <td>ETH: {{publicKeysUnusedStat.ETH && publicKeysUnusedStat.ETH.total_unused}}</td>
            <td>LTC: {{publicKeysUnusedStat.LTC && publicKeysUnusedStat.LTC.total_unused}}</td>
          </tr>
          <tr>
            <td>My Available Keys:</td>
            <td>BTC: {{publicKeysUnusedStat.BTC && publicKeysUnusedStat.BTC.mine_unused}}</td>
            <td>ETH: {{publicKeysUnusedStat.ETH && publicKeysUnusedStat.ETH.mine_unused}}</td>
            <td>LTC: {{publicKeysUnusedStat.LTC && publicKeysUnusedStat.LTC.mine_unused}}</td>
          </tr>
        </table>
        <el-button @click="onAddClick" class="cust__primary-btn">Add Public Key</el-button>
      </div>

      <div class="public-key-table">
        <el-table class="g-header" :cell-class-name="cellClassName" :data="publicKeyTableData">
          <el-table-column
            align="left"
            header-align="left"
            label="Hardware Number"
            prop="hardware_number"
          ></el-table-column>
          <el-table-column align="left" header-align="left" label="Asset Type" prop="coin_type"></el-table-column>
          <el-table-column align="left" header-align="left" label="Public Key" prop="public_key"></el-table-column>
          <el-table-column
            align="left"
            header-align="left"
            label="Address Name"
            prop="address_name"
          ></el-table-column>
          <el-table-column align="left" header-align="left" label="Address" prop="address"></el-table-column>
          <el-table-column
            align="left"
            header-align="left"
            label="Status"
            prop="status"
            :formatter="(row, col, value) => $formatEnumType('PublicKeyStatusType', value)"
          ></el-table-column>
          <el-table-column align="left" header-align="left" label="Hardware Manager" prop="manager"></el-table-column>
        </el-table>
        <div class="g-pagination-area">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="publicKeyTableDataTotal"
            :current-page.sync="publicKeyTableCurrentPage"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      publicKeyTableDataLoading: false,
      publicKeyTableCurrentPage: 1,
    };
  },
  computed: {
    queryParamsOfGetPublicKeys() {
      return {
        page_index: this.publicKeyTableCurrentPage,
        page_offset: 10,
      };
    },
    publicKeyTableData() {
      return this.$store.getters.selectPublicKeys(this.queryParamsOfGetPublicKeys) || [];
    },
    publicKeyTableDataTotal() {
      return this.$store.getters.selectPublicKeysTotal(this.queryParamsOfGetPublicKeys) || 0;
    },
    publicKeysUnusedStat() {
      return this.$store.getters.publicKeysUnusedStat || {};
    },
  },
  watch: {
    queryParamsOfGetPublicKeys: {
      async handler(val) {
        try {
          this.publicKeyTableDataLoading = true;
          await this.$store.dispatch("getPublicKeys", val);
        } finally {
          this.publicKeyTableDataLoading = false;
        }
      },
      deep: true,
      immediate: true,
    },
  },
  created() {
    this.$store.dispatch("getPublicKeysUnusedStat");
  },
  methods: {
    cellClassName(o) {
      const { row, column, rowIndex, columnIndex } = o;
      if (columnIndex === 1) {
        return "g-table-column-bold";
      } else {
        return "g-table-column-light";
      }
    },
    onAddClick() {
      this.$router.push({ name: "add-public-key" });
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.cust__table-top-add {
  padding: 22px 24px;
  background-color: white;
  border-bottom: solid 1px #b7c8ce;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.unused-stat {
  td {
    padding-right: 20px;
    &:first-child {
      padding-right: 40px;
    }
  }
}
</style>
