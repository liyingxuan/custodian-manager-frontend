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
  <div class="no-fixed-width-container add-hardware-container">
    <div class="title">CONFIRM YOUR MESSAGE</div>

    <el-form>
      <div class="select-row content-time">{{ $formatDatetime(announcement.update_time) }}</div>
      <div class="select-row content-tit">{{ announcement.title }}</div>

      <el-input
        class="select-row content-txt"
        type="textarea"
        autosize
        v-model="announcement.content"
        readonly="readonly"
      ></el-input>
    </el-form>

    <div class="content-line"></div>

    <el-form>
      <div class="button-row">
        <el-button @click="handleBack" class="back-btn" type="primary" size="medium" round>Back</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  async created() {
    try {
      this.loading = true;
      await this.$store.dispatch("getAnnouncementDetail", this.$route.params.id);
    } finally {
      this.loading = false;
    }
  },
  computed: {
    announcement() {
      return this.$store.getters.selectAnnouncementDetail(this.$route.params.id) || {};
    },
  },
  methods: {
    handleBack() {
      this.$router.back();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../styles/variables.scss";

.no-fixed-width-container {
  flex: 1;
  padding-bottom: 64px;
  background-color: rgba(255, 255, 255, 1);
}

.Grid {
  display: flex;
}
.Grid-cell {
  flex: 1;
}
.Grid-left-33 {
  flex-basis: 33%;
}
.Grid-right-66 {
  flex-basis: 66%;
}
.Grid--justifyCenter {
  justify-content: center;
}
.Grid--justifyEnd {
  justify-content: flex-end;
}

.title {
  padding: 24px 0 0 32px;
  height: 98px;
  background-color: $white;
  font-size: 38px;
  font-family: OpenSans-Light;
  font-weight: 300;
  color: rgba(0, 51, 106, 1);
  line-height: 52px;
  border-bottom: solid 1px #b7c8ce;
}

.divider-line {
  border: 1px solid rgba(183, 200, 206, 0.5);
  transform: scaleY(0.5);
  transform-origin: 0 100%;
}

.el-form {
  padding: 0 32px;

  .el-form-item {
    margin: 0;
  }

  .label-row {
    margin-top: 48px;
    display: flex;
    justify-content: center;

    &.first {
      margin-top: 32px;
    }

    .label {
      width: 352px;
      font-size: 14px;
      font-family: OpenSans-Semibold;
      font-weight: 600;
      color: rgba(105, 135, 167, 1);
      line-height: 19px;
    }
  }

  .select-row {
    margin-top: 24px;
    padding: 0 180px;
    display: flex;
    justify-content: center;

    &.last {
      margin-bottom: 52px;
    }

    .el-select {
      width: 352px;
    }
  }

  .button-row {
    margin-top: 48px;
    display: flex;
    justify-content: center;

    .el-button {
      width: 141px;
    }

    .back-btn {
      color: $custodian_manager_blue;
      background-color: transparent;
    }
  }

  .content-time {
    font-size: 16px;
    font-family: OpenSans;
    color: rgba(183, 200, 206, 1);
    line-height: 22px;
    justify-content: flex-end;
  }
  .content-tit {
    font-size: 16px;
    font-family: OpenSans-Semibold;
    font-weight: 600;
    color: rgba(0, 0, 0, 1);
    line-height: 22px;
  }
  .content-txt {
    border: none;
    width: 100%;
    font-size: 16px;
    font-family: OpenSans;
    color: rgba(105, 135, 167, 1);
    line-height: 22px;
    justify-content: flex-start;
  }
}

.content-line {
  margin-top: 64px;
  border-bottom: solid 1px #b7c8ce;
}
</style>
