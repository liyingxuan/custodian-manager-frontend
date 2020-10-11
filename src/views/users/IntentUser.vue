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
    <div class="top-pane">
      <div class="title">INTENT USER DETAIL</div>

      <div class="info">
        <div class="inline-row">
          <div class="inline-title">User ID:</div>
          <div class="inline-value">{{ customer.cust_id }}</div>
        </div>

        <div class="inline-row">
          <div class="inline-title">Email:</div>
          <div class="inline-value">{{ customer.email }}</div>
        </div>
        <div class="inline-row">
          <div class="inline-title">Corporate Name:</div>
          <div class="inline-value">{{ customer.cust_name }}</div>
        </div>
      </div>
    </div>

    <router-view class="bottom-pane"></router-view>
  </div>
</template>

<script>
export default {
  computed: {
    customer() {
      return this.$store.getters.selectCustomerKycInfo(this.$route.params.id) || {};
    },
  },
  created() {
    this.loadCustomerDetail();
  },
  methods: {
    loadCustomerDetail() {
      this.$store.dispatch("getCustomerKycInfo", this.$route.params.id);
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "../../styles/variables.scss";
.bottom-pane {
  background-color: $white;
  margin-top: 24px;
}
.top-pane {
  background-color: $white;
  border-left: solid 4px rgba(0, 51, 106, 1);
  padding: 24px 0px 24px 32px;

  .title {
    font-size: 38px;
    font-family: OpenSans-Light;
    font-weight: 300;
    color: rgba(0, 51, 106, 1);
    line-height: 52px;
  }
  .info {
    flex-basis: 50%;
    margin-top: 32px;

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
</style>
