<template>
  <el-dialog
    custom-class="confirm-dialog"
    :title="title"
    :visible.sync="visible"
    :before-close="onDialogBeforeClose"
  >
    <div class="divider-line"/>
    <div class="content">
      <svg-icon v-if="iconClass" class="svg-icon" :iconClass="iconClass"/>
      <div v-if="message" class="message">{{ message }}</div>
    </div>
    <div class="divider-line"/>
    <div v-if="okOnly" class="buttons">
      <el-button type="primary" size="medium" round @click="onConfirmClick">OK</el-button>
    </div>
    <div v-else class="buttons">
      <el-button class="cancel-button" size="medium" round @click="onCancelClick">Cancel</el-button>
      <el-button type="primary" size="medium" round @click="onConfirmClick">Confirm</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "Confirm Dialog",
    },
    iconClass: {
      type: String,
      default: "",
    },
    message: {
      type: String,
      default: "Are you sure to confirm this action?",
    },
    okOnly: {
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
  methods: {
    show() {
      this.visible = true;
      const promise = new Promise((resolve, reject) => {
        this.pendingPromises.push({ resolve, reject });
      });
      return promise;
    },
    onDialogBeforeClose(done) {
      this.onCancelClick();
      done();
    },
    async onConfirmClick() {
      this.visible = false;
      for (const promise of this.pendingPromises) {
        promise.resolve(true);
      }
      this.pendingPromises.splice(0, this.pendingPromises.length);
    },
    onCancelClick() {
      this.visible = false;
      for (const promise of this.pendingPromises) {
        promise.reject(false);
      }
      this.pendingPromises.splice(0, this.pendingPromises.length);
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss">
@import "../styles/variables.scss";

.confirm-dialog {
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

  .buttons {
    padding: 24px;
    display: flex;
    justify-content: center;
    align-items: center;

    > *:not(:first-child) {
      margin-left: 48px;
    }

    .el-button {
      width: 128px;
      font-size: 14px;
      font-family: OpenSans-Semibold, "PingFang SC", "微软雅黑", sans-serif;
      font-weight: 600;
      background: $custodian_blue;
      border: 1px solid $custodian_blue;
    }

    .cancel-button {
      color: $custodian_blue;
      background: transparent;
    }
  }
}
</style>
