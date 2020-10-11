<template>
  <el-form autocomplete="on" label-position="left" label-width="0px" class="authenticator-div">
    <h3 class="wait-review-title">{{ $t("login.title3").toUpperCase() }}</h3>

    <el-form-item class="ga-login-btn">
      <div class="review-txt">
        Your information is submitted successfully. Our team will review your information and
        contact you about the progress.
      </div>
      <div class="Grid Grid-cell Grid--justifyCenter">
        <el-button class="to-login-btn" type="primary" @click.native.prevent="handleLogout">Log out</el-button>
      </div>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  methods: {
    async handleLogout() {
      await this.$store.dispatch("logout");
      this.$router.push({ name: "login" });
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss">
@import "../../styles/mixin.scss";
@import "../../styles/variables.scss";
.wait-review-title {
  font-size: 38px;
  color: $custodian_blue;
  font-family: OpenSans-Light, "PingFang SC", "微软雅黑", sans-serif;
  text-align: center;
  font-weight: 300;
  white-space: nowrap;
  margin: 0 auto 10px -50px;
}
.review-txt {
  font-size: 14px;
  font-family: OpenSans, "PingFang SC", "微软雅黑", sans-serif;
  color: rgba(0, 51, 106, 1);
  line-height: 24px;
  margin: 70px 0;
}
</style>
