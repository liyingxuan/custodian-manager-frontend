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
    <div class="cust__table-title-manage">ADDRESS MANAGEMENT</div>
    <div class="content" v-loading="addressTableDataLoading">
      <div class="address-table">
        <div class="search-bar">
          <el-input
            v-model="addressSearchStringTemp"
            placeholder="Address name, address or corporate name"
            @keyup.enter.native="onAddressSearchClick"
          >
            <el-button slot="append" icon="el-icon-search" @click="onAddressSearchClick"/>
          </el-input>
          <div style="flex: 1"/>
          <el-button type="primary" size="mini" round @click="onAddressResetClick">Reset</el-button>
        </div>
        <el-table
          class="g-header"
          ref="addressTable"
          :data="addressTableData"
          header-cell-class-name="header-cell"
          cell-class-name="body-cell normal"
          @filter-change="onAddressFilterChange"
        >
          <el-table-column
            label="Asset Type"
            prop="coin_type"
            align="center"
            :filters="allCoinTypeFilters"
            :filter-multiple="false"
            :filtered-value="addressCoinType ? [addressCoinType] : []"
            column-key="coin_type"
          />
          <el-table-column label="Address" prop="address" align="center"/>
          <el-table-column label="Address Name" prop="address_name" align="center"/>
          <el-table-column
            label="Account Type"
            prop="custodian_type"
            align="center"
            :formatter="(row, col, value) => $formatEnumType('CustodianType', value)"
          />
          <el-table-column label="Corporate Name" prop="cust_name" align="center"/>
          <el-table-column label="Current Balance" prop="current_balance" align="center"/>
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
            :total="addressTableDataTotal"
            :current-page.sync="addressTableCurrentPage"
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
      addressTableDataLoading: false,
      addressSearchStringTemp: this.$route.query.addressSearchString,
      addressSearchString: this.$route.query.addressSearchString,
      addressCoinType: this.$route.query.addressCoinType,
      addressTableCurrentPage: Number(this.$route.query.addressTableCurrentPage) || 1,
    };
  },
  computed: {
    queryParamsOfGetAddresses() {
      return simplifyParams({
        addr_and_addr_name_and_cust_name: this.addressSearchString || undefined,
        coin_type: this.addressCoinType || undefined,
        page_index: this.addressTableCurrentPage,
        page_offset: 10,
      });
    },
    addressTableData() {
      return this.$store.getters.selectAddresses(this.queryParamsOfGetAddresses) || [];
    },
    addressTableDataTotal() {
      return this.$store.getters.selectAddressesTotal(this.queryParamsOfGetAddresses) || 0;
    },
    allCoinTypes() {
      return ["BTC", "LTC", "ETH"];
    },
    allCoinTypeFilters() {
      return this.allCoinTypes.map(item => ({ text: item, value: item }));
    },
  },
  watch: {
    queryParamsOfGetAddresses: {
      async handler(val) {
        this.$router.replace({
          name: this.$route.name,
          query: simplifyParams({
            ...this.$route.query,
            addressSearchString: val.addr_and_addr_name_and_cust_name,
            addressCoinType: val.coin_type,
            addressTableCurrentPage: val.page_index,
          }),
        });
        try {
          this.addressTableDataLoading = true;
          await this.$store.dispatch("getAddresses", val);
        } finally {
          this.addressTableDataLoading = false;
        }
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    onDetailClick(index, row) {
      this.$router.push({
        name: "address-detail",
        params: { address: row.address, coin_type: row.coin_type },
      });
    },
    onAddressFilterChange(filters) {
      if (filters.coin_type) {
        this.addressCoinType = filters.coin_type[0];
      }
      this.addressTableCurrentPage = 1;
    },
    onAddressSearchClick() {
      this.addressSearchString = this.addressSearchStringTemp;
      this.addressTableCurrentPage = 1;
    },
    onAddressResetClick() {
      this.addressSearchStringTemp = "";
      this.addressSearchString = "";
      this.addressCoinType = "";
      this.addressTableCurrentPage = 1;
      this.$refs.addressTable.clearFilter();
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

.address-table {
  .search-bar {
    padding: 10px;
    display: flex;
    align-items: center;

    .el-input {
      width: 450px;
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
