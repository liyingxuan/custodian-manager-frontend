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
    <div class="title-area">NOTIFICATION</div>

    <div class="content-bg" v-loading="loading">
      <div class="content-area">
        <div class="row">
          <div class="nav" @click="handleBack">
            <i class="far fa-chevron-left"></i> Back
          </div>
          <div class="time">{{ $formatDatetime(notificationDetail.update_time) }}</div>
        </div>
        <div class="title">{{ notificationDetail.title }}</div>
        <el-input
          type="textarea"
          :autosize="{minRows: 6}"
          :value="notificationDetail.content"
          resize="none"
          readonly="readonly"
        ></el-input>
        <div class="row"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
    };
  },
  async created() {
    try {
      this.loading = true;
      await this.$store.dispatch("getNotificationDetail", this.$route.params.id);
      await this.$store.dispatch("setNotificationRead", this.$route.params.id);
    } finally {
      this.loading = false;
    }
  },
  computed: {
    notificationDetail() {
      return (
        this.$store.getters.selectNotificationDetail(this.$route.params.id) || {
          update_time: 0,
          title: "",
          content: "",
        }
      );
    },
  },
  methods: {
    handleBack() {
      this.$router.back();
    },
  },
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import "../../styles/variables.scss";
.title-area {
  background-color: $white;
  display: flex;
  align-items: center;
  height: 98px;
  font-size: 38px;
  font-family: OpenSans-Light, "PingFang SC", "微软雅黑", sans-serif;
  font-weight: 300;
  color: rgba(74, 144, 226, 1);
  line-height: 52px;
  border-bottom: solid 1px rgba(183, 200, 206, 1);
  padding-left: 32px;
}

.content-bg {
  background-color: $white;
  display: flex;
  flex-direction: row;
  justify-content: center;

  .content-area {
    margin: 42px 0px;
    width: 784px;
    display: flex;
    flex-direction: column;

    .row {
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      margin: 32px 0px;
      .nav {
        color: rgba(0, 120, 250, 1);
        cursor: pointer;
      }
      .time {
        font-size: 16px;
        font-family: OpenSans, "PingFang SC", "微软雅黑", sans-serif;
        color: rgba(183, 200, 206, 1);
        line-height: 22px;
      }
    }

    .title {
      max-width: 663px;
      align-self: center;
      margin: 0px 32px 32px 32px;

      font-size: 16px;
      font-family: OpenSans-Semibold, "PingFang SC", "微软雅黑", sans-serif;
      font-weight: 600;
      color: rgba(0, 0, 0, 1);
      line-height: 22px;
    }

    .content {
      font-size: 16px;
      font-family: OpenSans, "PingFang SC", "微软雅黑", sans-serif;
      color: rgba(105, 135, 167, 1);
      line-height: 22px;
    }
  }
}
</style>
