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
  <div class="no-fixed-width-container add-hardware-container">
    <el-form :model="this" :rules="rules" ref="hardwareForm">
      <div class="select-row">
        <div class="label-col Grid-cell Grid-left-66">Hardware Number:</div>
        <el-form-item class="Grid-cell Grid-left-33" prop="number">
          <el-input
            size="medium"
            placeholder="Please input hardware number"
            v-model="number"
            :disabled="!inAdd"
          />
        </el-form-item>
      </div>

      <div class="select-row">
        <div class="label-col Grid-cell Grid-left-66">Hardware Name:</div>
        <el-form-item class="Grid-cell Grid-left-33" prop="name">
          <el-input size="medium" placeholder="Please make sure it’s a unique one" v-model="name"/>
        </el-form-item>
      </div>

      <div class="select-row">
        <div class="label-col Grid-cell Grid-left-66">Asset Type Supported:</div>
        <el-form-item class="Grid-cell Grid-left-33" prop="hardware_coin_types">
          <el-checkbox v-model="coinTypesCheckAll" :indeterminate="coinTypesIndeterminate">Check all</el-checkbox>
          <el-checkbox-group v-model="hardware_coin_types">
            <el-checkbox
              v-for="coinType in allCoinTypes"
              :label="coinType"
              :key="coinType"
            >{{ coinType }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </div>

      <div class="select-row">
        <div class="label-col Grid-cell Grid-left-66">Hardware Manager:</div>
        <el-form-item class="Grid-cell Grid-left-33" prop="manager">
          <el-select size="medium" placeholder="Select" v-model="manager">
            <el-option
              v-for="account in platformCo_signerCandidates"
              :value="account"
              :key="account"
            />
          </el-select>
        </el-form-item>
      </div>

      <div class="button-row">
        <el-button @click="onBackClick" class="back-btn" type="primary" size="medium" round>Back</el-button>
        <el-button @click="onConfirmClick" type="primary" size="medium" round>Confirm</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hardwareEdited: {},
      rules: {
        number: [
          { required: true, trigger: "blur", message: "Please input hardware number" },
          { pattern: /^\d+$/, trigger: "blur", message: "Hardware number must be an integer" },
          { max: 10, trigger: "blur" },
        ],
        name: [{ required: true, trigger: "blur", message: "Please input hardware name" }],
        hardware_coin_types: [
          { required: true, trigger: "change", message: "Please select asset type supported" },
        ],
        manager: [{ required: true, trigger: "change", message: "Please select hardware manager" }],
      },
    };
  },
  computed: {
    inAdd() {
      return this.$route.name.includes("add");
    },
    numberInParams() {
      return this.$route.params.number;
    },
    hardwareEmpty() {
      return {
        number: "",
        name: "",
        hardware_coin_types: [],
        manager: "",
      };
    },
    hardwareDetail() {
      if (this.inAdd) {
        return this.hardwareEmpty;
      }
      return this.$store.getters.selectHardwareDetail(this.numberInParams) || this.hardwareEmpty;
    },
    hardwareMerged() {
      return {
        ...this.hardwareDetail,
        ...this.hardwareEdited,
      };
    },
    number: {
      get() {
        return this.hardwareMerged.number;
      },
      set(value) {
        this.$set(this.hardwareEdited, "number", value);
      },
    },
    name: {
      get() {
        return this.hardwareMerged.name;
      },
      set(value) {
        this.$set(this.hardwareEdited, "name", value);
      },
    },
    hardware_coin_types: {
      get() {
        return this.hardwareMerged.hardware_coin_types;
      },
      set(value) {
        this.$set(this.hardwareEdited, "hardware_coin_types", value);
      },
    },
    manager: {
      get() {
        return this.hardwareMerged.manager;
      },
      set(value) {
        this.$set(this.hardwareEdited, "manager", value);
      },
    },
    allCoinTypes() {
      return ["BTC", "LTC", "ETH"];
    },
    coinTypesCheckAll: {
      get() {
        return this.hardwareMerged.hardware_coin_types.length === this.allCoinTypes.length;
      },
      set(value) {
        this.$set(this.hardwareEdited, "hardware_coin_types", value ? this.allCoinTypes : []);
      },
    },
    coinTypesIndeterminate() {
      return (
        this.hardwareMerged.hardware_coin_types.length > 0 &&
        this.hardwareMerged.hardware_coin_types.length < this.allCoinTypes.length
      );
    },
    platformCo_signerCandidates() {
      return this.$store.getters.platformCo_signerCandidates || [];
    },
  },
  created() {
    this.$store.dispatch("getPlatformCo_signerCandidates");
    if (!this.inAdd) {
      this.$store.dispatch("getHardwareDetail", this.numberInParams);
    }
  },
  methods: {
    onBackClick() {
      this.$router.back();
    },
    async onConfirmClick() {
      await this.$refs.hardwareForm.validate();
      if (this.inAdd) {
        await this.$store.dispatch("addHardware", this.hardwareMerged);
      } else {
        await this.$store.dispatch("modifyHardware", this.hardwareMerged);
      }
      this.$message.success("Success");
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

.add-hardware-container {
  padding: 40px;
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
  margin: 24px 32px;
  font-size: 38px;
  font-family: OpenSans-Light;
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
      font-family: OpenSans-Semibold;
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

    .el-select,
    .el-input {
      width: 352px;
      margin-left: 15px;
    }
    .el-checkbox {
      margin-left: 15px;
      width: 80px;
      line-height: 36px;
    }
    .el-checkbox-group {
      width: 400px;
    }
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
