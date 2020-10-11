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
  <div class="no-fixed-width-container">
    <div class="title">CO-SIGNER AND APPROVER SETTING</div>
    <div class="divider-line"/>

    <el-form
      autocomplete="on"
      :model="coSignerForm"
      :rules="coSignerRules"
      ref="coSignerForm"
      label-position="left"
      label-width="0px"
    >
      <div class="label-row first">
        <div class="label">2/3 Multi-sig (Co-managed)</div>
      </div>
      <div class="select-row">
        <el-form-item prop="coSigner1">
          <el-select
            v-model="coSignerForm.coSigner1"
            size="medium"
            placeholder="Please select a co-signer"
            :loading="coSignerOptionLoading"
          >
            <el-option
              v-for="signer in coSignerCandidates"
              :key="signer"
              :label="signer"
              :value="signer"
            ></el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="select-row">
        <el-form-item prop="coSigner2">
          <el-select
            v-model="coSignerForm.coSigner2"
            size="medium"
            placeholder="Please select a co-signer"
          >
            <el-option
              v-for="signer in coSignerCandidates"
              :key="signer"
              :label="signer"
              :value="signer"
            ></el-option>
          </el-select>
        </el-form-item>
      </div>

      <div class="label-row">
        <div class="label">2/3 Multi-sig (Full-managed) or 4/5 Multi-sig (Co-managed)</div>
      </div>
      <div class="select-row">
        <el-form-item prop="coSigner3">
          <el-select
            v-model="coSignerForm.coSigner3"
            size="medium"
            placeholder="Please select a co-signer"
          >
            <el-option
              v-for="signer in coSignerCandidates"
              :key="signer"
              :label="signer"
              :value="signer"
            ></el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="select-row">
        <el-form-item prop="coSigner4">
          <el-select
            v-model="coSignerForm.coSigner4"
            size="medium"
            placeholder="Please select a co-signer"
          >
            <el-option
              v-for="signer in coSignerCandidates"
              :key="signer"
              :label="signer"
              :value="signer"
            ></el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="select-row last">
        <el-form-item prop="coSigner5">
          <el-select
            v-model="coSignerForm.coSigner5"
            size="medium"
            placeholder="Please select a co-signer"
          >
            <el-option
              v-for="signer in coSignerCandidates"
              :key="signer"
              :label="signer"
              :value="signer"
            ></el-option>
          </el-select>
        </el-form-item>
      </div>

      <div class="divider-line"/>

      <div class="label-row">
        <div class="label">Approver</div>
      </div>
      <div class="select-row last">
        <el-form-item prop="approver">
          <el-select
            v-model="coSignerForm.approver"
            size="medium"
            placeholder="Please select a approver"
            :loading="approverOptionLoading"
          >
            <el-option
              v-for="approver in approveCandidates"
              :key="approver"
              :label="approver"
              :value="approver"
            ></el-option>
          </el-select>
        </el-form-item>
      </div>

      <div class="divider-line"/>

      <el-form-item class="el-login-btn button-row">
        <el-button
          type="primary"
          :loading="loading"
          round
          @click.native.prevent="handleApprove"
        >Approve</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  async created() {
    try {
      this.coSignerOptionLoading = true;
      this.coSignerCandidates = await this.$store.dispatch("getPlatformCo_signerCandidates");
      const coSigners = await this.$store.dispatch("getPlatformCo_signers");
      this.coSignerForm.coSigner1 = coSigners["co_signer_list1"][0];
      this.coSignerForm.coSigner2 = coSigners["co_signer_list1"][1];
      this.coSignerForm.coSigner3 = coSigners["co_signer_list2"][0];
      this.coSignerForm.coSigner4 = coSigners["co_signer_list2"][1];
      this.coSignerForm.coSigner5 = coSigners["co_signer_list2"][2];
    } finally {
      this.coSignerOptionLoading = false;
    }

    try {
      this.approverOptionLoading = true;
      this.approveCandidates = await this.$store.dispatch("getPlatformApproverCandidates");
      this.coSignerForm.approver = (await this.$store.dispatch("getPlatformApprovers"))[0];
    } finally {
      this.approverOptionLoading = false;
    }
  },
  data() {
    return {
      coSignerCandidates: [],
      approveCandidates: [],
      coSignerForm: {
        coSigner1: "",
        coSigner2: "",
        coSigner3: "",
        coSigner4: "",
        coSigner5: "",
        approver: "",
      },
      coSignerRules: {
        coSigner1: [{ required: true, message: "Please set co-signer", trigger: "change" }],
        coSigner2: [{ required: true, message: "Please set co-signer", trigger: "change" }],
        coSigner3: [{ required: true, message: "Please set co-signer", trigger: "change" }],
        coSigner4: [{ required: true, message: "Please set co-signer", trigger: "change" }],
        coSigner5: [{ required: true, message: "Please set co-signer", trigger: "change" }],
        approver: [{ required: true, message: "Please set approver", trigger: "change" }],
      },
      loading: false,
      coSignerOptionLoading: false,
      approverOptionLoading: false,
    };
  },
  methods: {
    async handleApprove() {
      await this.$refs.coSignerForm.validate();
      let signerForm = {
        co_signer_list1: [this.coSignerForm.coSigner1, this.coSignerForm.coSigner2],
        co_signer_list2: [
          this.coSignerForm.coSigner3,
          this.coSignerForm.coSigner4,
          this.coSignerForm.coSigner5,
        ],
      };
      let approverForm = {
        approver_list: [this.coSignerForm.approver],
      };
      try {
        this.loading = true;
        await this.$store.dispatch("setPlatformCo_signers", signerForm);
        await this.$store.dispatch("setPlatformApprovers", approverForm);
        this.$message.success("Success");
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.no-fixed-width-container {
  flex: 1;
  padding-bottom: 64px;
  background-color: rgba(255, 255, 255, 1);
}

.title {
  margin: 24px 32px;
  font-size: 38px;
  font-family: OpenSans-Light, "PingFang SC", "微软雅黑", sans-serif;
  font-weight: 300;
  color: rgba(0, 51, 106, 1);
  line-height: 52px;
}

.divider-line {
  border: 1px solid rgba(183, 200, 206, 0.5);
  transform: scaleY(0.5);
  transform-origin: 0 100%;
}

.el-form {
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
      font-family: OpenSans-Semibold, "PingFang SC", "微软雅黑", sans-serif;
      font-weight: 600;
      color: rgba(105, 135, 167, 1);
      line-height: 19px;
    }
  }

  .select-row {
    margin-top: 24px;
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
  }
}
</style>
