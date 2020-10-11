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
    <div class="summary">
      <div class="title">{{ title }}</div>

      <div class="row-info">
        <div class="left">
          <div class="asset-title">Account Asset Estimate</div>
          <div class="btc-total">{{ dashboardData.total_btc }} BTC</div>
          <div class="usd-total">≈ {{ dashboardData.total_usd }} USD</div>
        </div>
        <div class="right-info">
          <div class="inline-row">
            <div class="inline-title">User ID:</div>
            <div class="inline-value">{{ dashboardData.cust_id }}</div>
          </div>

          <div class="inline-row">
            <div class="inline-title">Email:</div>
            <div class="inline-value">{{ dashboardData.email }}</div>
          </div>
          <div class="inline-row">
            <div class="inline-title">Corporate Name:</div>
            <div class="inline-value">{{ dashboardData.cust_name }}</div>
          </div>
        </div>
      </div>
      <div class="row-assets">
        <div class="inner-row" v-for="item in dashboardData.asset_list" :key="item.name">
          <div class="pane">
            <div class="coin-type">{{ item.name }}</div>
            <div class="count">{{ item.amount }}</div>
            <div class="usd">≈ {{ item.value_by_usd }} USD</div>
          </div>
          <div class="sep"></div>
        </div>
      </div>
    </div>

    <div class="tab-area">
      <el-tabs type="border-card" v-model="activeName">
        <el-tab-pane :lazy="lazy" label="Addresses" name="Addresses">
          <keep-alive>
            <AddressesTab :userId="$route.params.id"></AddressesTab>
          </keep-alive>
        </el-tab-pane>

        <el-tab-pane :lazy="lazy" label="Transactions" name="Transactions">
          <keep-alive>
            <TransactionsTab :userId="$route.params.id"></TransactionsTab>
          </keep-alive>
        </el-tab-pane>

        <el-tab-pane :lazy="lazy" label="KYC Info" name="KYC">
          <keep-alive>
            <KYCTab :user-id="$route.params.id"></KYCTab>
          </keep-alive>
        </el-tab-pane>

        <el-tab-pane :lazy="lazy" label="Sub Accounts" name="Sub Accounts">
          <keep-alive>
            <SubAccountsTab :user-id="$route.params.id"></SubAccountsTab>
          </keep-alive>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import {
  AddressesTab,
  TransactionsTab,
  KYCTab,
  SubAccountsTab,
} from "@/views/users/components/RegisteredUser";
export default {
  components: {
    AddressesTab,
    TransactionsTab,
    KYCTab,
    SubAccountsTab,
  },
  computed: {
    dashboardData() {
      return (
        this.$store.getters.selectCustomerAssetsDetail({
          customerId: this.$route.params.id,
        }) || {}
      );
    },
    lazy() {
      return true;
    },
  },
  created() {
    this.loadDashboardData();
  },
  data() {
    return {
      title: "REGISTERED USER DETAIL",
      activeName: "Addresses",
    };
  },
  methods: {
    loadDashboardData() {
      this.$store.dispatch("getCustomerAssetsDetail", { customerId: this.$route.params.id });
    },
    handleNewAddress(e) {
      this.$router.push({ name: "co-managed-address" });
    },
    handleDeposit(index, row) {},
    handleWithdraw(index, row) {},
    handleSeeDetail(index, row) {
      const { address } = this.transactionHistoryTableData[index];
      this.$router.push({
        name: "address-detail",
        params: { address: address },
      });
    },
    cellClassName(o) {
      const { row, column, rowIndex, columnIndex } = o;
      let theClass = "g-table-column-regular";
      if (columnIndex === 0 || columnIndex === 4) {
        theClass = "g-table-column-bold";
      }
      return theClass;
    },
    transactionHistoryTableRowClassName(o) {
      const { row, rowIndex } = o;

      let rowClass = "g-table-row-regular";
      if (rowIndex === 0) {
        return "g-table-row-bold";
      }
      return rowClass;
    },
  },
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import "../../styles/variables.scss";

.inner-row:last-of-type {
  .sep {
    display: none !important;
  }
}

.tab-area {
  margin-top: 32px;
  background-color: $white;

  /deep/ .el-tabs__item {
    padding: 0 32px;
  }
}

.summary {
  min-width: 1184px;
  min-height: 337px;
  background: rgba(255, 255, 255, 1);
  border-left: solid 4px rgba(0, 51, 106, 1);

  .title {
    font-size: 38px;
    font-family: OpenSans-Light;
    font-weight: 300;
    color: #00336a;
    line-height: 52px;
    padding-top: 24px;
    padding-left: 32px;
  }

  .row-assets {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-top: 32px;

    .inner-row {
      display: flex;
      flex-direction: row;
      align-items: center;

      .pane {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 193px;
        height: 107px;

        .coin-type {
          padding-top: 16px;
          font-size: 18px;
          font-family: OpenSans-Semibold;
          font-weight: 600;
          color: rgba(105, 135, 167, 1);
          line-height: 24px;
        }
        .count {
          margin-top: 8px;
          font-size: 16px;
          font-family: OpenSans;
          color: rgba(0, 51, 106, 1);
          line-height: 22px;
        }
        .usd {
          margin-top: 4px;
          font-size: 12px;
          font-family: OpenSans;
          color: rgba(105, 135, 167, 1);
          line-height: 17px;
        }
      }

      .sep {
        width: 2px;
        height: 67px;
        background-color: rgba(217, 233, 239, 1);
      }
    }
  }

  .row-info {
    padding-left: 32px;
    margin-top: 32px;
    display: flex;
    flex-direction: row;

    .left {
      flex-basis: 50%;

      .asset-title {
        font-size: 14px;
        font-family: OpenSans-Semibold;
        font-weight: 600;
        color: rgba(0, 51, 106, 1);
        line-height: 19px;
      }

      .btc-total {
        font-size: 24px;
        font-family: OpenSans-Semibold;
        font-weight: 600;
        color: rgba(0, 51, 106, 1);
        line-height: 33px;
        margin-top: 8px;
      }

      .usd-total {
        font-size: 16px;
        font-family: OpenSans-Semibold;
        font-weight: 600;
        color: rgba(105, 135, 167, 1);
        line-height: 22px;
        margin-top: 8px;
      }
    } //left-end

    .right-info {
      flex-basis: 50%;

      .inline-row {
        display: flex;
        flex-direction: row;
        margin-bottom: 16px;

        .inline-title {
          font-size: 14px;
          font-family: OpenSans-Semibold;
          font-weight: 600;
          color: rgba(105, 135, 167, 1);
          line-height: 19px;
          width: 150px;
        }

        .inline-value {
          font-size: 14px;
          font-family: OpenSans;
          color: rgba(0, 51, 106, 1);
          line-height: 19px;
        }
      }
    }
  }
}
</style>
