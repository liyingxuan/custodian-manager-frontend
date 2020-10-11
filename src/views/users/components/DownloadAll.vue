<template>
  <div class="download-all">
    <el-button
      class="download-button"
      @click="handleDownload"
      type="primary"
      :loading="loading"
      round
    >
      <i class="fal fa-cloud-download download-icon"></i> Download
    </el-button>
  </div>
</template>

<script>
export default {
  props: ["userId"],
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    async handleDownload() {
      try {
        this.loading = true;
        const result = await this.$store.dispatch("getCustomerAllKycFiles", this.userId);
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

.download-all {
  text-align: center;
}

.download-button {
  background-color: $custodian_blue;
  padding: 7px 20px;
}

.download-icon {
  margin-right: 10px;
}
</style>
