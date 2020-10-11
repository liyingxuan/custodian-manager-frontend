<template>
  <el-form
    autocomplete="on"
    :model="gaForm"
    ref="gaForm"
    label-position="left"
    label-width="0px"
    class="authenticator-div"
  >
    <h3 class="title">{{ $t("login.title2") }}</h3>

    <div class="input-tit">Google Authenticator Code</div>
    <div class="Grid Grid-cell Grid--justifyCenter ga-div">
      <div class="security-code-row">
        <security-code v-model="gaForm.gaCode" value blur-on-complete/>
      </div>
    </div>

    <el-form-item class="ga-login-btn">
      <div class="Grid Grid-cell Grid--justifyCenter">
        <el-button class="go-back-btn" :loading="loading" @click.native.prevent="goBack">Back</el-button>
        <el-button
          class="to-login-btn"
          type="primary"
          :disabled="qrBtnDisabled"
          :loading="loading"
          @click.native.prevent="handleVerify"
        >Next</el-button>
      </div>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      gaForm: {
        gaCode: "",
      },
      qrBtnDisabled: true,
      loading: false,
    };
  },
  watch: {
    "gaForm.gaCode": function(newV, oldV) {
      this.qrBtnDisabled = newV.length !== 6;
      if (newV.length === 6) {
        this.handleVerify();
      }
    },
  },
  methods: {
    async goBack() {
      await this.$store.dispatch("logout");
      this.$router.back();
    },
    async handleVerify() {
      try {
        this.loading = true;
        await this.$store.dispatch("gaLogin", this.gaForm.gaCode);
        this.$message.success("Success");
        if (this.$route.query.redirect) {
          this.$router.push({ path: this.$route.query.redirect });
        } else {
          this.$router.push({ name: "dashboard" });
        }
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss">
@import "../../styles/mixin.scss";
@import "../../styles/variables.scss";

.security-code-row {
  margin-top: 60px;
  margin-bottom: 48px;
  display: flex;
  justify-content: center;

  /deep/ .form-control {
    font-size: 18px !important;
    font-family: OpenSans-Semibold, "PingFang SC", "微软雅黑", sans-serif;
    font-weight: 600;
    color: transparent;
    text-shadow: 0 0 0 rgba(105, 135, 167, 1);
    outline: none;
    border: 1px solid rgba(183, 200, 206, 0.5);

    &:focus {
      background-color: rgba(243, 250, 255, 1);
    }
  }
}
</style>
