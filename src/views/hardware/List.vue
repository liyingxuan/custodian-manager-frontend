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
      <div class="cust__table-title-manage">HARDWARE MANAGEMENT</div>

      <div class="cust__table-top-add">
        <el-button @click="onAddClick" class="cust__primary-btn">Add Hardware</el-button>
      </div>

      <div class="address-table" v-loading="hardwareTableDataLoading">
        <el-table class="g-header" :cell-class-name="cellClassName" :data="hardwareTableData">
          <el-table-column align="left" header-align="left" label="Hardware Number" prop="number"></el-table-column>
          <el-table-column align="left" header-align="left" label="Hardware Name" prop="name"></el-table-column>
          <el-table-column align="left" header-align="left" label="Hardware Manager" prop="manager"></el-table-column>
          <el-table-column
            align="left"
            header-align="left"
            label="Asset Type Supported"
            prop="hardware_coin_types"
            :formatter="(row, col, value) => value && value.join('/')"
          ></el-table-column>
          <el-table-column align="center" header-align="center" label="Operation">
            <template slot-scope="scope">
              <div class="g-table-actions">
                <div class="g-table-action" @click="onDetailClick(scope.$index, scope.row)">Modify</div>
                <div class="g-table-separate"></div>
                <div class="g-table-action" @click="onDeleteClick(scope.$index, scope.row)">Delete</div>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div class="g-pagination-area">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="hardwareTableDataTotal"
            :current-page.sync="hardwareTableCurrentPage"
          ></el-pagination>
        </div>
      </div>
    </div>

    <confirm-dialog
      ref="confirmDialog"
      title="CONFIRM"
      message="Are you sure to delete this hardware?"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      hardwareTableDataLoading: false,
      hardwareTableCurrentPage: 1,
      currentRowNumber: 0,
    };
  },
  computed: {
    queryParamsOfGetHardwares() {
      return {
        page_index: this.hardwareTableCurrentPage,
        page_offset: 10,
      };
    },
    hardwareTableData() {
      return this.$store.getters.selectHardwares(this.queryParamsOfGetHardwares) || [];
    },
    hardwareTableDataTotal() {
      return this.$store.getters.selectHardwaresTotal(this.queryParamsOfGetHardwares) || 0;
    },
  },
  watch: {
    queryParamsOfGetHardwares: {
      async handler(val) {
        try {
          this.hardwareTableDataLoading = true;
          await this.$store.dispatch("getHardwares", val);
        } finally {
          this.hardwareTableDataLoading = false;
        }
      },
      deep: true,
      immediate: true,
    },
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
      this.$router.push({ name: "add-hardware" });
    },
    onDetailClick(index, row) {
      this.$router.push({ name: "hardware-detail", params: { number: row.number } });
    },
    async onDeleteClick(index, row) {
      await this.$refs.confirmDialog.show();
      await this.$store.dispatch("removeHardware", { number: row.number });
      await this.$store.dispatch("getHardwares", this.queryParamsOfGetHardwares);
      this.$message.success("Success");
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.cust__table-top-add {
  padding: 22px 24px;
  background-color: white;
  font-size: 38px;
  font-family: OpenSans-Light, "PingFang SC", "微软雅黑", sans-serif;
  font-weight: 300;
  color: rgba(0, 51, 106, 1);
  line-height: 52px;
  border-bottom: solid 1px #b7c8ce;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>
