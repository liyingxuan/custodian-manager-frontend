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
      <div class="cust__table-title-manage">RISK CONTROL SETTING</div>

      <div class="public-key-table">
        <el-table
          class="g-header"
          highlight-current-row
          :cell-class-name="cellClassName"
          :data="publicKeyList"
        >
          <el-table-column align="center" header-align="center" label="Asset Type" prop="coin_type"></el-table-column>

          <el-table-column align="center" header-align="center" label="Deposit">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.deposit_status"
                active-value="normal"
                active-text="On"
                inactive-value="abnormal"
                inactive-text="Off"
                @change="handleCurrentChange"
              ></el-switch>
            </template>
          </el-table-column>

          <el-table-column align="center" header-align="center" label="Withdraw">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.withdraw_status"
                active-value="normal"
                active-text="On"
                inactive-value="abnormal"
                inactive-text="Off"
                @change="handleCurrentChange"
              ></el-switch>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      publicKeyList: [],
    };
  },
  created() {
    this.getSettingData();
  },
  methods: {
    async getSettingData() {
      this.publicKeyList = await this.$store.dispatch("getRiskControls");
    },
    async handleCurrentChange() {
      await this.$store.dispatch("setRiskControls", this.publicKeyList);
      this.$message.success("Success");
    },
    cellClassName(o) {
      const { row, column, rowIndex, columnIndex } = o;

      if (columnIndex === 0) {
        return "g-table-column-bold";
      } else {
        return "g-table-column-light";
      }
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped></style>
