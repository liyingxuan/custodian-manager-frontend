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
    <el-form ref="form" :model="this" :rules="formRules">
      <div class="select-row">
        <div class="label-col Grid-cell Grid-left-66">Hardware Number:</div>
        <el-form-item class="Grid-cell Grid-left-33" prop="selectedHardwareNumber">
          <el-select v-model="selectedHardwareNumber" size="medium" placeholder="Select">
            <el-option v-for="number in hardwareNumbers" :value="number" :key="number"/>
          </el-select>
        </el-form-item>
      </div>

      <div v-if="selectedHardwareNumber" class="select-row">
        <div class="label-col Grid-cell Grid-left-66">Hardware Name:</div>
        <div class="Grid-cell Grid-left-33">
          <div class="txt-col">{{ selectedHardware.name }}</div>
        </div>
      </div>

      <div v-if="selectedHardwareNumber" class="select-row">
        <div class="label-col Grid-cell Grid-left-66">Hardware Manager:</div>
        <div class="Grid-cell Grid-left-33">
          <div class="txt-col">{{ selectedHardware.manager }}</div>
        </div>
      </div>

      <div class="select-row">
        <div class="label-col Grid-cell Grid-left-66">Asset Type:</div>
        <el-form-item class="Grid-cell Grid-left-33" prop="selectedCoinType">
          <el-radio-group v-model="selectedCoinType">
            <el-radio
              v-for="coinType in selectedHardware.hardware_coin_types || allCoinTypes"
              :key="coinType"
              :label="coinType"
            >{{ coinType }}</el-radio>
          </el-radio-group>
        </el-form-item>
      </div>

      <div class="select-row">
        <div class="label-col Grid-cell Grid-left-66">Import Quantity:</div>
        <el-form-item class="Grid-cell Grid-left-33" prop="importCount">
          <el-input v-model="importCount" size="medium" placeholder="No more than 50"/>
        </el-form-item>
      </div>

      <div class="button-row">
        <el-button @click="onBackClick" class="back-btn" type="primary" size="medium" round>Back</el-button>
        <el-button type="primary" size="medium" round @click="onImportClick">Import</el-button>
      </div>
    </el-form>

    <confirm-dialog
      ref="confirmDialog"
      title="CONFIRM"
      message="Please make sure your Ledger is plugged in."
      :okOnly="true"
    />
    <progress-dialog
      title="CONNECTING"
      iconClass="ledger-connecting"
      message="Connecting to your Ledger..."
      :loading="ledgerConnecting"
    />
  </div>
</template>

<script>
import LedgerSDK from "@/ledgers/ledgerSDK";

export default {
  data() {
    return {
      ledgerConnecting: false,
      selectedHardwareNumber: "",
      selectedCoinType: "",
      importCount: "",
    };
  },
  computed: {
    formRules() {
      return {
        selectedHardwareNumber: [
          { required: true, trigger: "change", message: "Please select a hardware" },
        ],
        selectedCoinType: [
          { required: true, trigger: "change", message: "Please select an asset type" },
        ],
        importCount: [
          { required: true, trigger: "blur", message: "Please input import quantity " },
          {
            trigger: "blur",
            validator: (rule, value, callback) => {
              const number = Number(value);
              if (!Number.isInteger(number)) {
                return callback(new Error("Import quantiy must be an integer"));
              }
              if (!(number > 0 && number <= 50)) {
                return callback(
                  new Error("Import quantiy must be greater than 0 and less than or equal to 50"),
                );
              }
              return callback();
            },
          },
        ],
      };
    },
    hardwares() {
      return this.$store.getters.myHardwares || [];
    },
    hardwareNumbers() {
      return this.hardwares.map(item => item.number);
    },
    selectedHardware() {
      return this.hardwares.find(item => item.number === this.selectedHardwareNumber) || {};
    },
    allCoinTypes() {
      return ["BTC", "LTC", "ETH"];
    },
  },
  watch: {
    selectedHardwareNumber() {
      this.selectedCoinType = "";
      this.importCount = "";
    },
  },
  created() {
    this.$store.dispatch("getMyHardwares");
  },
  methods: {
    onBackClick() {
      this.$router.back();
    },
    async onImportClick() {
      await this.$refs.form.validate();
      await this.$refs.confirmDialog.show();
      const paths = await this.$store.dispatch("getPublicKeyPaths", {
        coin_type: this.selectedCoinType,
        quantity: Number(this.importCount),
      });
      const records = [];
      try {
        this.ledgerConnecting = true;
        const sdk = await LedgerSDK.create(this.selectedCoinType);
        for (const path of paths) {
          const result = await sdk.getAddressAndPublicKey(path);
          records.push({
            path,
            public_key: result.publicKey,
            hardware_address: result.address,
          });
        }
      } finally {
        this.ledgerConnecting = false;
      }
      await this.$store.dispatch("addPublicKeys", {
        hardware_number: this.selectedHardwareNumber,
        coin_type: this.selectedCoinType,
        records: records,
      });
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
    .el-radio {
      margin-left: 15px;
      width: 80px;
      line-height: 36px;
    }
    .el-button {
      margin-left: 15px;
    }
    .el-radio-group {
      width: 400px;
    }

    .txt-col {
      margin-left: 15px;
      line-height: 36px;
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
