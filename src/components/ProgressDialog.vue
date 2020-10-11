<template>
  <el-dialog
    custom-class="progress-dialog"
    :title="title"
    :visible.sync="loading"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
  >
    <div class="divider-line"/>
    <div class="content">
      <svg-icon v-if="iconClass" class="svg-icon" :iconClass="iconClass"/>
      <div v-if="message" class="message">{{ message }}</div>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "Input Dialog",
    },
    iconClass: {
      type: String,
      default: "",
    },
    message: {
      type: String,
      default: "Please Wait for completion...",
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      visible: false,
      pendingPromises: [],
    };
  },
};
</script>

<style rel="stylesheet/scss" lang="scss">
@import "../styles/variables.scss";

.progress-dialog {
  width: 400px;

  /deep/ .el-dialog__body {
    padding: 0;
  }

  .divider-line {
    border: 1px solid rgba(183, 200, 206, 0.5);
    transform: scaleY(0.5);
    transform-origin: 0 100%;
  }

  .content {
    padding: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;

    > *:not(:first-child) {
      margin-top: 13px;
    }

    .svg-icon {
      width: 60px;
      height: 60px;
    }

    .message {
      font-size: 14px;
      font-family: OpenSans, "PingFang SC", "微软雅黑", sans-serif;
      color: rgba(0, 0, 0, 1);
      line-height: 19px;
    }
  }
}
</style>
