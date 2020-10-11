<template>
  <el-upload
    class="upload-demo"
    :action="actionUrl"
    :headers="headers"
    :before-upload="handleUpload"
    :on-success="handleSuccess"
    :on-error="handleError"
    :limit="1"
    :on-exceed="handleExceed"
    :file-list="fileList"
    :data="actionData"
  >
    <el-button class="upload-button" type="text" :loading="loading">Upload</el-button>
  </el-upload>
</template>

<script>
import { getToken } from "../../../utils/auth";
import { UPLOAD_FILE_TYPES } from "@/utils/const"

export default {
  props: {
    actionData: {
      Object,
      default: function() {
        return {
          name: "",
          cust_email: "",
        };
      },
    },
  },
  data() {
    return {
      fileList: [],
      loading: false,
      actionUrl: window.serverConfig.BASE_URL + "customers/file/upload",
      headers: { Authorization: getToken() },
    };
  },
  methods: {
    handleUpload(file) {
      const extension = file.name.substring(file.name.lastIndexOf(".") + 1);
      const size = file.size / 1024 / 1024;
      if (!UPLOAD_FILE_TYPES.includes(extension)) {
        const supportedFileTypes = UPLOAD_FILE_TYPES.map(item => "*." + item).join(", ");
        this.$message.error(
          "The file extension is not in supported list: " + supportedFileTypes + ".",
        );
        return false;
      }
      if (size > 20) {
        this.$message.error("The file exceed the limit size: 20M.");
        return false;
      }
      this.loading = true;
      return true;
    },
    handleSuccess(res, file) {
      this.loading = false;
      this.fileList[0] = [{ name: file.name }];
      this.$store.dispatch("getCustomerKycInfo", this.$route.params.id);
    },
    async handleError(err, file, fileList) {
      this.loading = false;
      try {
        const error = JSON.parse(err.message);
        error.__apiError = true;
        error.__showMessage = true;
        throw error;
      } catch (error) {
        if (error && error.__apiError) {
          throw error;
        } else {
          this.$message.error("Upload failed, please try again later.");
        }
      }
    },
    handleExceed(files, fileList) {
      this.$message.warning(`The limit is 1.`);
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "../../../styles/variables.scss";

.upload-button {
  font-size: 16px;
  font-family: OpenSans-Semibold, "PingFang SC", "微软雅黑", sans-serif;
  font-weight: 600;
  color: $custodian_blue;
  line-height: 22px;
  padding: 0;
}
</style>
