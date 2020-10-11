<template>
  <div class="no-fixed-width-container">
    <div class="cust__table-title-manage">{{ pageTit.toUpperCase() }}</div>

    <div class="reconciliation-container">
      <el-form
        autocomplete="on"
        :model="downloadForm"
        :rules="downloadRules"
        ref="downloadForm"
        label-position="left"
        label-width="0px"
      >
        <div>
          <div class="form-item-tit">{{ tit.tx }}</div>
          <div class="filter-row">
            <div class="filter-left">
              <el-form-item prop="txDate">
                <el-date-picker
                  v-model="downloadForm.txDate"
                  type="datetimerange"
                  range-separator="-"
                  start-placeholder="Start date"
                  end-placeholder="End date"
                ></el-date-picker>
              </el-form-item>
            </div>
            <div class="filter-right">
              <el-form-item>
                <el-button
                  class="download-button"
                  @click="handleDownload('tx')"
                  type="primary"
                  :loading="loading"
                  round
                >
                  <i class="fal fa-download download-icon"></i> Download
                </el-button>
              </el-form-item>
            </div>
          </div>
          <div class="form-item-desc">{{ desc.tx }}</div>
        </div>

        <div>
          <div class="form-item-tit">{{ tit.address }}</div>
          <div class="filter-row">
            <div class="filter-left">
              <el-form-item prop="addressDate">
                <el-date-picker
                  v-model="downloadForm.addressDate"
                  type="datetimerange"
                  range-separator="-"
                  start-placeholder="Start date"
                  end-placeholder="End date"
                ></el-date-picker>
              </el-form-item>
            </div>
            <div class="filter-right">
              <el-form-item>
                <el-button
                  class="download-button"
                  @click="handleDownload('address')"
                  type="primary"
                  :loading="loading"
                  round
                >
                  <i class="fal fa-download download-icon"></i> Download
                </el-button>
              </el-form-item>
            </div>
          </div>
          <div class="form-item-desc">{{ desc.address }}</div>
        </div>

        <div>
          <div class="form-item-tit">{{ tit.balance }}</div>
          <div class="filter-row">
            <div class="filter-left">
              <el-form-item prop="balanceDate">
                <el-date-picker
                  v-model="downloadForm.balanceDate"
                  type="datetimerange"
                  range-separator="-"
                  start-placeholder="Start date"
                  end-placeholder="End date"
                ></el-date-picker>
              </el-form-item>
            </div>
            <div class="filter-right">
              <el-form-item>
                <el-button
                  class="download-button"
                  @click="handleDownload('balance')"
                  type="primary"
                  :loading="loading"
                  round
                >
                  <i class="fal fa-download download-icon"></i> Download
                </el-button>
              </el-form-item>
            </div>
          </div>
          <div class="form-item-desc">{{ desc.balance }}</div>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      pageTit: "Download Forms",
      tit: {
        tx: "Reconciliation by Transaction",
        address: "Reconciliation by Address",
        balance: "User Balance Data",
      },
      desc: {
        tx:
          "The generated csv file includes: transaction number, transaction hash, deposit or withdraw address, quantity, transaction type, transaction status, transaction fee, and time.",
        address: "The generated csv file includes: asset type, address, balance, and time created.",
        balance: "The generated csv file includes balance information of each user on each date.",
      },
      downloadForm: {
        txDate: [new Date(new Date().setMonth(new Date().getMonth() - 1)), new Date()],
        addressDate: [new Date(new Date().setMonth(new Date().getMonth() - 1)), new Date()],
        balanceDate: [new Date(new Date().setMonth(new Date().getMonth() - 1)), new Date()],
      },
      downloadRules: {},
      loading: false,
    };
  },
  methods: {
    async handleDownload($type) {
      let start_date = "";
      let end_date = "";
      let reconciliation_type = "";

      switch ($type) {
        case "tx":
          start_date = this.downloadForm.txDate[0];
          end_date = this.downloadForm.txDate[1];
          reconciliation_type = "transaction";
          break;
        case "address":
          start_date = this.downloadForm.addressDate[0];
          end_date = this.downloadForm.addressDate[1];
          reconciliation_type = "address";
          break;
        case "balance":
          start_date = this.downloadForm.balanceDate[0];
          end_date = this.downloadForm.balanceDate[1];
          reconciliation_type = "customer";
          break;
        default:
          break;
      }

      let downloadForm = {
        start_date: new Date(start_date).getTime(),
        end_date: new Date(end_date).getTime(),
        reconciliation_type: reconciliation_type,
      };

      try {
        this.loading = true;
        const result = await this.$store.dispatch("getReconciliationFile", downloadForm);
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
@import "../../styles/variables.scss";

.no-fixed-width-container {
  flex: 1;
  padding-bottom: 64px;
  background-color: rgba(255, 255, 255, 1);
}

.reconciliation-container {
  padding: 16px 32px 48px;
}

.form-item-tit {
  font-size: 14px;
  font-family: OpenSans-Semibold, "PingFang SC", "微软雅黑", sans-serif;
  font-weight: 600;
  color: rgba(105, 135, 167, 1);
  line-height: 19px;
  margin: 32px 0 8px;
}

.filter-row {
  display: flex;

  .filter-left,
  .filter-right {
    display: flex;
    flex: 1;
    align-items: center;
  }

  .download-button {
    background-color: $custodian_blue;
    padding: 7px 20px;
  }
}

.download-icon {
  margin-right: 10px;
}

.form-item-desc {
  width: 784px;
  padding: 24px 40px;
  background: rgba(243, 250, 255, 1);
  font-size: 16px;
  font-family: OpenSans, "PingFang SC", "微软雅黑", sans-serif;
  color: rgba(105, 135, 167, 1);
  line-height: 22px;
}
</style>
