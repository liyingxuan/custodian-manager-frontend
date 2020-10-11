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
  <div class="fixed-width-container" v-loading="managementOverviewLoading">
    <div class="dashboard">
      <div class="bg-title">OVERVIEW</div>

      <div class="under-title">
        <div class="left">
          <div class="row">
            <div class="block">
              <div class="title">Registered User</div>
              <div class="value">{{ managementOverview.total_registered_customer }}</div>
            </div>

            <div class="block">
              <div class="title">Intent User</div>
              <div class="value">{{ managementOverview.total_intent_customer }}</div>
            </div>
          </div>
        </div>
        <div class="right">
          <div class="col-block">
            <div class="block">
              <div class="title">Number of Addresses</div>
              <div class="value">{{ managementOverview.total_address }}</div>
            </div>

            <div class="block">
              <div class="sub-row">
                <div class="sub-title">Co-Managed</div>
                <div class="sub-value">{{ managementOverview.total_co_managed_address }}</div>
              </div>
              <div class="sub-row">
                <div class="sub-title">Escrow</div>
                <div class="sub-value">{{ managementOverview.total_escrow_address }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="bottom-pane">
      <div class="asset-area">
        <div class="asset-title">Total Asset Estimate</div>
        <div class="asset-total-btc">{{ assetsDetail.total_btc }} BTC</div>
        <div class="asset-total-usd">≈ {{ assetsDetail.total_usd }} USD</div>
      </div>

      <div class="assets-row">
        <div :key="item.coin_type" class="inner-row" v-for="item in assetsDetail.asset_list || []">
          <div class="pane">
            <div class="coin-type">{{ item.name }}</div>
            <div class="amount">{{ item.amount }}</div>
            <div class="usd">≈ {{ item.value_by_usd }} USD</div>
          </div>
          <div class="sep"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      managementOverviewLoading: false,
    };
  },
  computed: {
    managementOverview() {
      return this.$store.getters.managementOverview || {};
    },
    assetsDetail() {
      return this.managementOverview.assets_detail || {};
    },
  },
  async created() {
    try {
      this.managementOverviewLoading = true;
      await this.$store.dispatch("getManagementOverview");
    } finally {
      this.managementOverviewLoading = false;
    }
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

.assets-row {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 64px;

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

      .amount {
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

.bottom-pane {
  margin-top: 32px;
  background-color: $white;
  height: 367px;
  display: flex;
  flex-direction: row;

  .asset-area {
    flex-basis: 30%;
    padding-top: 64px;
    padding-left: 32px;

    .asset-title {
      font-size: 14px;
      font-family: OpenSans-Semibold;
      font-weight: 600;
      color: rgba(0, 51, 106, 1);
      line-height: 19px;
    }

    .asset-total-btc {
      font-size: 24px;
      font-family: OpenSans-Semibold;
      font-weight: 600;
      color: rgba(0, 51, 106, 1);
      line-height: 33px;
      margin: 8px 0px;
    }

    .asset-total-usd {
      font-size: 16px;
      font-family: OpenSans-Semibold;
      font-weight: 600;
      color: rgba(105, 135, 167, 1);
      line-height: 22px;
    }
  }
}

.dashboard {
  background-color: $white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-left: solid 4px rgba(0, 51, 106, 1);
  height: 310px;
  %block {
    .block {
      margin-top: 32px;
      margin-right: 92px;
      width: 176px;

      .title {
        font-size: 14px;
        font-family: OpenSans-Semibold;
        font-weight: 600;
        color: rgba(0, 51, 106, 1);
        line-height: 19px;
      }

      .value {
        font-size: 24px;
        font-family: OpenSans-Semibold;
        font-weight: 600;
        color: rgba(0, 51, 106, 1);
        line-height: 33px;
        margin-top: 8px;
      }

      .sub-row {
        display: flex;
        flex-direction: row;

        .sub-title {
          width: 50%;
          font-size: 14px;
          font-family: OpenSans-Semibold;
          font-weight: 600;
          color: rgba(105, 135, 167, 1);
          line-height: 19px;
          margin-bottom: 16px;
        }

        .sub-value {
          width: 50%;
          font-size: 14px;
          font-family: OpenSans;
          color: rgba(0, 51, 106, 1);
          line-height: 19px;
        }
      }
    }
  }

  padding: 32px 0px 0px 24px;

  .bg-title {
    font-size: 38px;
    font-family: OpenSans-Light;
    font-weight: 300;
    color: rgba(0, 51, 106, 1);
    line-height: 52px;
    flex-basis: 52px;
  }

  .under-title {
    flex-basis: 234px;

    display: flex;
    flex-direction: row;
    .left {
      display: flex;
      flex-direction: column;
      flex-basis: 50%;

      .row {
        display: flex;
        flex-direction: row;

        @extend %block;
      }
    }

    .right {
      display: flex;
      flex-basis: 50%;

      .col-block {
        display: flex;
        flex-direction: column;
        width: 100%;

        @extend %block;
        .block {
          width: 50%;
        }
      }
    }
  }
}
</style>
