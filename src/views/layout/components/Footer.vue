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
  <div class="custody-foot">
    <div class="row">
      <div class="company">
        <router-link :to="{ name: 'dashboard' }">{{ $t("footer.company") }}</router-link>
      </div>

      <div class="sep"></div>
      <div class="terms">
        <custodian-dialog
          :btnName="$t('footer.terms')"
          :btnColor="'blue'"
          :title="$t('footer.termsTit')"
          :content="$t('footer.termsTxt')"
        ></custodian-dialog>
      </div>

      <div class="sep"></div>
      <div class="policy">
        <custodian-dialog
          :btnName="$t('footer.policy')"
          :btnColor="'blue'"
          :title="$t('footer.policyTit')"
          :content="$t('footer.policyTxt')"
        ></custodian-dialog>
      </div>

      <div class="sep"></div>
      <div class="agreement">
        <custodian-dialog
          :btnName="$t('footer.agreement')"
          :btnColor="'blue'"
          :title="$t('footer.agreementTit')"
          :content="$t('footer.agreementTxt')"
        ></custodian-dialog>
      </div>
    </div>
    <div class="row2">{{ $t("footer.copyright") }}</div>
  </div>
</template>

<script></script>

<style rel="stylesheet/scss" lang="scss" scoped>
.custody-foot {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 33px;
  margin-bottom: 33px;

  .row {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    %row-one {
      font-size: 14px;
      font-family: OpenSans, "PingFang SC", "微软雅黑", sans-serif;
      font-weight: 400;
      color: rgba(0, 120, 250, 1);
      line-height: 19px;
      padding: 15px;
    }

    .sep {
      width: 1px;
      height: 20px;
      border: 1px solid rgba(0, 120, 250, 1);
    }

    .company,
    .terms,
    .policy,
    .agreement {
      @extend %row-one;
    }
  }
  .row2 {
    height: 19px;
    font-size: 14px;
    color: rgba(105, 135, 167, 1);
    line-height: 19px;
  }
}
</style>
