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
  <div class="no-fixed-width-container add-hardware-container" v-loading="loading">
    <div class="title">NEW ANNOUNCEMENT</div>

    <el-form :model="this" :rules="rules" ref="notiForm" label-position="top" inline-message>
      <div class="select-row">
        <el-form-item label="Title" prop="title">
          <el-input
            size="medium"
            placeholder="Please input a title less than 80 characters"
            v-model="title"
          />
        </el-form-item>
      </div>

      <el-form-item label prop="content">
        <el-input
          type="textarea"
          class="text-area"
          :rows="10"
          v-model="content"
        ></el-input>
      </el-form-item>

      <el-form-item label="Send at:" prop="message_publish_time">
        <el-date-picker
          v-model="message_publish_time"
          type="datetime"
          value-format="timestamp"
          placeholder="Select time"
          :picker-options="pickerOptions"
        ></el-date-picker>
      </el-form-item>

      <div class="button-row">
        <el-button @click="handleBack" class="back-btn" type="primary" size="medium" round>Back</el-button>
        <el-button @click="handleSend" type="primary" size="medium" round>Send</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      announcementEdited: {},
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now();
        },
      },
      rules: {
        title: [
          { required: true, message: "Please input title", trigger: "blur" },
          { min: 3, max: 80, message: "Length between 3 and 80", trigger: "blur" },
        ],
        content: [
          { required: true, message: "Please input content", trigger: "blur" },
          { min: 10, max: 10000, message: "Length between 10 and 10000", trigger: "blur" },
        ],
        message_publish_time: [
          { type: "date", required: true, message: "Please select date", trigger: "change" },
        ],
      },
    };
  },
  computed: {
    inAdd() {
      return this.$route.name.includes("add");
    },
    announcementEmpty() {
      return {
        title: "",
        content: "",
      };
    },
    announcementDetail() {
      if (this.inAdd) {
        return this.announcementEmpty;
      }
      return {
        ...this.$store.getters.selectAnnouncementDetail(this.$route.params.id),
      };
    },
    announcementMerged() {
      return {
        ...this.announcementDetail,
        ...this.announcementEdited,
      };
    },
    title: {
      get() {
        return this.announcementMerged.title;
      },
      set(value) {
        this.$set(this.announcementEdited, "title", value);
      },
    },
    content: {
      get() {
        return this.announcementMerged.content;
      },
      set(value) {
        this.$set(this.announcementEdited, "content", value);
      },
    },
    message_publish_time: {
      get() {
        return this.announcementMerged.message_publish_time;
      },
      set(value) {
        this.$set(this.announcementEdited, "message_publish_time", value);
      },
    },
  },
  created() {
    if (!this.inAdd) {
      this.$store.dispatch("getAnnouncementDetail", this.$route.params.id);
    }
  },
  methods: {
    async handleSend() {
      await this.$refs.notiForm.validate();
      try {
        this.loading = true;
        if (this.inAdd) {
          await this.$store.dispatch("addAnnouncement", this.announcementMerged);
        } else {
          await this.$store.dispatch("modifyAnnouncement", this.announcementMerged);
        }
        this.$message.success("Success");
        this.$router.back();
      } finally {
        this.loading = false;
      }
    },
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
    justify-content: flex-start;

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
    margin-top: 48px;
  }

  .select-row,
  .radio-row {
    margin-bottom: 24px;
    display: flex;
    justify-content: flex-start;

    &.last {
      margin-bottom: 52px;
    }

    .el-select,
    .el-input {
      width: 752px;
    }
  }

  .radio-row {
    line-height: 32px;
  }
  .radio-item {
    display: block;
    margin-right: 15px;
  }

  .label-col {
    text-align: right;
    line-height: 36px;
    font-size: 14px;
    font-family: OpenSans;
    color: rgba(95, 106, 118, 1);
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
}
</style>
