<template>
  <el-button class="download-button" @click="handleDownload" type="text" :loading="loading">Download</el-button>
</template>

<script>
export default {
  props: {
    fileName: {
      type: String,
      default: "",
    },
    custEmail: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    async handleDownload() {
      try {
        this.loading = true;
        const result = await this.$store.dispatch("getCustomerKycFile", {
          file_name: this.fileName,
          cust_email: this.custEmail,
        });
        this.saveFile(result, result.__fileName);
      } finally {
        this.loading = false;
      }
    },
    saveFile(data, fileName) {
      const a = document.createElement("a");
      const url = window.URL.createObjectURL(data);
      a.href = url;
      a.download = fileName;
      a.click();
      window.URL.revokeObjectURL(url);
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "../../../styles/variables.scss";

.download-button {
  font-size: 16px;
  font-family: OpenSans-Semibold, "PingFang SC", "微软雅黑", sans-serif;
  font-weight: 600;
  color: $custodian_blue;
  line-height: 22px;
  padding: 0;
}

.download-icon {
  margin-right: 15px;
}
</style>
