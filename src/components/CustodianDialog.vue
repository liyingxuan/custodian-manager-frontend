<template>
  <div class="custodian-dialog">
    <el-button type="text" :class="btnColor" @click="dialogVisible = true">{{ btnName }}</el-button>

    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="60%"
      :show-close="false"
      :center="true"
    >
      <span v-html="content"></span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">{{ $t("common.ok") }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    btnName: {
      type: String,
      default: "",
    },
    btnColor: {
      type: String,
      default: "blue",
    },
    title: {
      type: String,
      default: "",
    },
    content: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      dialogVisible: false,
    };
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.custodian-dialog {
  .blue {
    color: rgba(0, 120, 250, 1);
  }

  .white {
    color: white;
  }

  /*外层点击按钮的样式*/
  .el-button {
    font-size: 14px;
    font-family: OpenSans, "PingFang SC", "微软雅黑", sans-serif;
    font-weight: 400;
    line-height: 19px;
    padding: 0;
  }

  /deep/ .el-dialog__title {
    font-size: 24px;
    font-family: OpenSans, "PingFang SC", "微软雅黑", sans-serif;
    color: rgba(0, 51, 106, 1);
    line-height: 33px;
  }

  /deep/ .el-dialog {
    padding-top: 64px;

    .el-dialog__header {
      margin: 0 100px;
      padding-bottom: 24px;
      background: rgba(243, 250, 255, 1);
    }

    .el-dialog__body {
      margin: 0 100px;
      padding: 0 48px 24px;
      background: rgba(243, 250, 255, 1);
      font-size: 14px;
      font-family: OpenSans, "PingFang SC", "微软雅黑", sans-serif;
      color: rgba(105, 135, 167, 1);
      line-height: 19px;
    }

    .el-dialog__footer {
      margin-top: 48px;
      padding: 30px 0;
      border-top: 1px solid #d9e9ef;
    }
  }

  .el-dialog {
    /*弹出框按钮样式*/
    .el-button {
      width: 157px;
      height: 36px;
      border-radius: 18px;
      border: 1px solid rgba(0, 120, 250, 1);
      line-height: 6px;
    }
  }
}
</style>
