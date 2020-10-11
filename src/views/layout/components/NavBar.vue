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
  <div class="navBar">
    <svg-icon class="band" iconClass="band-logo-light"/>
    <div class="title">ONC Operation Management Center</div>
    <div class="right">
      <div class="middle">
        <div class="last-login-time">{{ $formatDatetimeNav(myInfo.last_login_time) }}</div>
      </div>
      <div class="bottom">
        <div class="notify" @click="gotoWorkflow">
          <el-badge :value="workflowsTodoTotal" :hidden="workflowsTodoTotal === 0">
            <i class="far fa-list-ul icon"></i>
            <span class="navBarInfo">New To-dos</span>
          </el-badge>
        </div>

        <div class="notify" @click="gotoNotifications">
          <el-badge :value="notificationsUnreadTotal" :hidden="notificationsUnreadTotal === 0">
            <i class="far fa-bell icon"></i>
            <span class="navBarInfo">New Notifications</span>
          </el-badge>
        </div>

        <div class="notify">
          <span class="navBarInfo">
            <custodian-dialog
              :btnName="$t('navbar.help')"
              :btnColor="'white'"
              :title="$t('help.tit')"
              :content="$t('help.txt')"
            ></custodian-dialog>
          </span>
        </div>

        <div class="notify">
          <span class="email">{{ myInfo.email }}</span>
        </div>

        <div class="out" @click="logout">
          <div class="info">Sign Out</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      help: "Need help?",
    };
  },
  async created() {
    await this.$store.dispatch("getNotifications", this.queryParams);
    await this.$store.dispatch("getWorkflows", this.queryParams);
  },
  computed: {
    myInfo() {
      return this.$store.getters.myInfo || {};
    },
    notificationsUnreadTotal() {
      return this.$store.getters.notificationsUnreadTotal || 0;
    },
    workflowsTodoTotal() {
      return this.$store.getters.workflowsTodoTotal || 0;
    },
    queryParams() {
      return {
        page_index: 1,
        page_offset: 1,
      };
    },
  },
  methods: {
    gotoWorkflow() {
      this.$router.push({ name: "workflow" });
    },
    gotoNotifications() {
      this.$router.push({ name: "notifications" });
    },
    async logout() {
      await this.$store.dispatch("logout");
      this.$router.push({ name: "login" });
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "../../../styles/variables.scss";

.navBar {
  display: flex;
  flex-direction: row;
  min-width: 1240px;
  height: 96px;
  border-radius: 0px !important;
  background-color: #161a1d;

  .title {
    width: 281px;
    height: 22px;
    font-size: 16px;
    font-family: OpenSans-Semibold;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.8);
    line-height: 22px;
    align-self: center;
    margin-left: 32px;
  }
}

.band {
  height: 96px;
  width: 200px;
  background-color: #758392;
}

.right {
  display: flex;
  flex-grow: 1;
  justify-content: flex-end;
  flex-direction: row;

  .middle {
    position: absolute;
    padding: 24px 24px 0px 0px;
    min-width: 180px;
    min-height: 17px;
    float: right;
    .last-login-time {
      font-size: 12px;
      font-family: OpenSans;
      color: rgba(105, 135, 167, 1);
      line-height: 17px;
      text-align: right;
    }
  }
  .bottom {
    margin-top: 56px;
    display: flex;
    justify-content: flex-end;
    flex-direction: row;
  }

  .notify {
    cursor: pointer;

    height: 26px;
    color: #00c4fa;
    font-size: 14px;
    border-right: solid 1px rgba(255, 255, 255, 0.3);
    padding-right: 23px;
    padding-left: 23px;

    display: flex;
    flex-direction: row;
    align-items: center;

    .el-badge {
      display: flex;
      flex-direction: row;
      align-items: center;

      /deep/ .el-badge__content {
        transform: translate(30px, -15px);
      }
    }

    .icon {
      width: 21px;
      height: 21px;
      font-size: 21px;
      font-family: FontAwesome5ProRegular;
      color: rgba(0, 196, 250, 1);
      line-height: 21px;
    }
    .navBarInfo {
      padding-left: 8px;
      height: 19px;
      font-size: 14px;
      font-family: OpenSans;
      color: rgba(255, 255, 255, 1);
      line-height: 19px;
    }
    .email {
      color: $white;
      vertical-align: middle;
      color: #6987a7;
      font-weight: bold;
    }
  }

  .out {
    width: 88px;
    height: 26px;
    background: rgba(0, 77, 161, 1);
    border-radius: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    margin: 0px 24px 0px 16px;

    .info {
      font-size: 12px;
      font-weight: 600;
      color: $contentAreaColor;
    }
  }
}
</style>
