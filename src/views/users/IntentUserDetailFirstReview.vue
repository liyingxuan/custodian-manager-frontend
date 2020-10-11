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
  <div>
    <div class="kyc-area">
      <div class="left">
        <div class="block">
          <div class="info">
            <div class="info-title">Applicant Basic Information (User Upload)</div>
            <div class="inline">
              <div class="title">Business Legal Name</div>
              <div class="value">{{ infos.customer_legal_name }}</div>
            </div>
            <div class="inline">
              <div class="title">Business Registration Number</div>
              <div class="value">{{ infos.business_registration_number }}</div>
            </div>
            <div class="inline">
              <div class="title">Country of Registration</div>
              <div class="value">
                <span v-for="item in countryOption" :key="item.locale">
                  <span v-if="infos.country_of_origin === item.locale">{{ item.en }}</span>
                </span>
              </div>
            </div>
            <div class="inline">
              <div class="title">Business Registration Date</div>
              <div class="value">{{ $formatDatetime(infos.business_registration_date) }}</div>
            </div>
            <div class="inline">
              <div class="title">How many years since establishment</div>
              <div class="value">{{ infos.year_of_establishment }}</div>
            </div>
            <div class="info-line"></div>

            <div class="inline">
              <div class="title">Contact Person Name</div>
              <div class="value">{{ infos.contact_person_name }}</div>
            </div>
            <div class="inline">
              <div class="title">Contact Person Position</div>
              <div class="value">{{ infos.holding_position }}</div>
            </div>
            <div class="inline">
              <div class="title">Contact Phone Number</div>
              <div class="value">{{ infos.mobile }}</div>
            </div>
            <div class="inline">
              <div class="title">Contact Email</div>
              <div class="value">{{ infos.contact_email }}</div>
            </div>
            <div class="info-line"></div>

            <div class="inline">
              <div class="title">Street Address</div>
              <div class="value">{{ infos.registered_address_line_1 }}</div>
            </div>
            <div class="inline">
              <div class="title">City</div>
              <div class="value">{{ infos.registered_address_line_2 }}</div>
            </div>
            <div class="inline">
              <div class="title">Province</div>
              <div class="value">{{ infos.registered_address_line_3 }}</div>
            </div>
            <div class="inline">
              <div class="title">Postal Code</div>
              <div class="value">{{ infos.postal_code }}</div>
            </div>
            <div class="inline">
              <div class="title">Country</div>
              <div class="value">
                <span v-for="item in countryOption" :key="item.locale">
                  <span v-if="infos.country === item.locale">{{ item.en }}</span>
                </span>
              </div>
            </div>
            <div class="info-line"></div>

            <div class="inline">
              <div class="title">Income Tax Number</div>
              <div class="value">{{ infos.income_tax_number }}</div>
            </div>
            <div class="inline">
              <div class="title">Business Industry</div>
              <div class="value">{{ infos.business_industry }}</div>
            </div>
            <div class="inline">
              <div class="title">Number of Share Holders</div>
              <div class="value">{{ infos.number_of_share_holders }}</div>
            </div>

            <div class="inline">
              <div class="title">Number of Directors</div>
              <div class="value">{{ infos.number_of_directors }}</div>
            </div>
            <div class="info-line"></div>

            <div class="inline">
              <div class="title">Referral Code</div>
              <div class="value">{{ infos.referral_code }}</div>
            </div>
            <div class="inline">
              <div class="title">Channel</div>
              <div class="value">{{ infos.channel }}</div>
            </div>
          </div>
        </div>

        <div class="block">
          <div class="info-form">
            <div class="info-title">Call Verification Check (Operator Reviewed)</div>

            <el-form
              label-position="top"
              autocomplete="on"
              :rules="callFormRules"
              ref="callForm"
              :model="callForm"
              class="call-form"
            >
              <el-form-item label="Call Date Time" prop="callTime" class="form-title">
                <el-date-picker v-model="callForm.callTime" type="datetime" placeholder="Datetime"></el-date-picker>
              </el-form-item>

              <el-form-item label="Called Person Name" prop="call_by" class="form-title">
                <el-input v-model="callForm.call_by"></el-input>
              </el-form-item>

              <el-form-item label="Called Number" prop="contact_number" class="form-title">
                <el-input v-model="callForm.contact_number"></el-input>
              </el-form-item>

              <el-form-item label="Comment" prop="comment" class="form-title">
                <el-input type="textarea" v-model="callForm.comment"></el-input>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>

      <div class="right">
        <div class="title">Files Uploaded</div>
        <div v-for="item in kycFiles" :key="item.key">
          <div class="download">
            <!--用户已经上传文件-->
            <div v-if="item.fileKey">
              <div
                :class="callForm.files_reviewed[item.key] ? 'reviewed-title' : 'file-title'"
              >{{ item.title }}</div>

              <div class="row">
                <download-file :custEmail="custEmail" :fileName="item.key"></download-file>

                <el-button
                  v-if="!callForm.files_reviewed[item.key]"
                  @click="handleMark(item.key)"
                  type="text"
                  class="review"
                >Mark as reviewed</el-button>
                <el-button
                  v-else
                  @click="handleUndo(item.key)"
                  type="text"
                  class="undo"
                >Undo Marking</el-button>
              </div>
            </div>
            <!--用户未上传文件-->
            <div v-else>
              <div class="file-title-none">{{ item.title + " (None)" }}</div>
              <div class="row">
                <upload-file :actionData="{ name: item.key, cust_email: customer.email }"></upload-file>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="btn-area">
      <el-button
        type="normal"
        class="btn"
        @click.native.prevent="dialogFormVisible = true"
        round
      >Reject</el-button>

      <el-dialog
        title="REJECT"
        :center="true"
        :visible.sync="dialogFormVisible"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :show-close="false"
      >
        <el-form
          label-position="top"
          autocomplete="on"
          :rules="callFormRules"
          ref="callForm"
          :model="callForm"
          class="call-form"
        >
          <p>Are you sure to reject this application ?</p>
          <el-form-item prop="note">
            <el-input
              type="textarea"
              placeholder="Please input the reason of this rejection (less than 200 characters)"
              v-model="callForm.note"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button class="btn" @click="dialogFormVisible = false" round>
            {{
            $t("common.cancel")
            }}
          </el-button>

          <el-button
            type="primary"
            :loading="loading"
            class="btn"
            @click.native.prevent="submitForm('callForm', false)"
            round
          >{{ $t("common.confirm") }}</el-button>
        </div>
      </el-dialog>

      <el-button
        type="primary"
        :loading="loading"
        class="btn"
        @click.native.prevent="submitForm('callForm', true)"
        round
      >Approve</el-button>
    </div>
  </div>
</template>

<script>
import DownloadFile from "@/views/users/components/DownloadFile";
import UploadFile from "@/views/users/components/UploadFile";
import { COUNTRIES, UPLOAD_MANDATORY_FILES, UPLOAD_OPTIONAL_FILES } from "@/utils/const";

export default {
  components: { DownloadFile, UploadFile },
  data() {
    return {
      loading: false,
      countryOption: COUNTRIES,
      uploadFiles: [...UPLOAD_MANDATORY_FILES, ...UPLOAD_OPTIONAL_FILES],
      callForm: {
        approved: true, //true：审核通过  false：审核未通过
        cust_email: "",
        note: "",
        call_by: "",
        contact_number: "",
        callTime: "",
        comment: "",
        files_reviewed: [...UPLOAD_MANDATORY_FILES, ...UPLOAD_OPTIONAL_FILES].reduce(
          (result, item) => ({
            ...result,
            [item.key]: false,
          }),
          {},
        ),
      },
      callFormRules: {
        callTime: [
          {
            type: "date",
            required: true,
            message: "Please select date and time",
            trigger: "blur",
          },
        ],
        call_by: [
          { required: true, message: "Please input operator name", trigger: "blur" },
          { min: 1, max: 200, message: "Input between 1 to 200 characters", trigger: "blur" },
        ],
        contact_number: [
          { required: true, message: "Please input called number", trigger: "blur" },
          { min: 1, max: 200, message: "Input between 1 to 200 characters", trigger: "blur" },
        ],
        comment: [
          { max: 500, message: "Comment more than 500", trigger: "blur" },
          { required: true, message: "Please input comment", trigger: "blur" },
        ],
        note: [
          { required: true, message: "Please input comment", trigger: "blur" },
          { min: 1, max: 200, message: "Input between 1 to 200 characters", trigger: "blur" },
        ],
      },
      dialogFormVisible: false,
    };
  },
  computed: {
    myInfo() {
      return this.$store.getters.myInfo || {};
    },
    customer() {
      return this.$store.getters.selectCustomerKycInfo(this.$route.params.id) || {};
    },
    userId() {
      return this.$route.params.id.toString();
    },
    custEmail() {
      return this.customer.email;
    },
    infos() {
      return this.customer.basic_info || {};
    },
    kycFiles() {
      const kyc_info = this.customer.kyc_info || {};
      return this.uploadFiles.map(item => ({
        key: item.key,
        title: item.title,
        fileKey: kyc_info[item.key] && kyc_info[item.key].key,
        reviewBy: kyc_info[item.key] && kyc_info[item.key].reviewBy,
      }));
    },
  },
  watch: {
    customer: function(newV, oldV) {
      for (let kyc in newV.kyc_info) {
        if (typeof newV.kyc_info[kyc].reviewBy !== "undefined")
          this.callForm.files_reviewed[kyc] = true;
      }
    },
  },
  methods: {
    handleMark(key) {
      this.callForm.files_reviewed[key] = true;
    },
    handleUndo(key) {
      this.callForm.files_reviewed[key] = false;
    },
    handleUpload(key) {},
    /**
     * 验证已上传文件是否都reviewed
     * @return {boolean}
     */
    validateReviewed() {
      const kycData = this.customer.kyc_info || {};
      for (let kycI in kycData) {
        if (kycData[kycI].fileName) {
          if (!this.callForm.files_reviewed[kycI]) {
            this.$message.error("Please review all uploaded files.");
            return false;
          }
        }
      }

      return true;
    },
    async submitForm(formName, approved) {
      // Reject时，接口所需的必填信息填充
      if (approved) {
        this.callForm.note = this.callForm.comment;
      } else {
        this.callForm.callTime = new Date();
        this.callForm.call_by = this.myInfo.email;
        this.callForm.contact_number = "123";
        this.callForm.comment = this.callForm.note;
      }
      await this.$refs[formName].validate();
      if (this.validateReviewed()) {
        this.callForm.cust_email = this.customer.email;
        this.callForm.approved = approved;
        this.callForm.call_time = new Date(this.callForm.callTime).valueOf();
        try {
          this.loading = true;
          await this.$store.dispatch("firstReviewCustomer", this.callForm);
          this.$message.success("Success");
          this.$router.back();
        } finally {
          this.loading = false;
        }
      }
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "../../styles/variables.scss";

.kyc-area {
  display: flex;
  flex-direction: row;
  padding: 32px;

  .left {
    flex-basis: 61.8%;

    .block {
      margin-bottom: 32px;
      %info-title {
        padding-bottom: 32px;
        font-size: 16px;
        font-family: OpenSans-Semibold, "PingFang SC", "微软雅黑", sans-serif;
        font-weight: 600;
        color: rgba(0, 0, 0, 1);
        line-height: 22px;
      }

      .info-form {
        background-color: rgba(243, 250, 255, 1);
        display: flex;
        flex-direction: column;

        align-items: center;
        .info-title {
          padding-top: 48px;
          @extend %info-title;
          text-align: center;
        }
        .call-form {
          width: 500px;

          .form-title {
            font-size: 14px;
            font-family: OpenSans-Semibold, "PingFang SC", "微软雅黑", sans-serif;
            font-weight: 600;
            color: rgba(105, 135, 167, 1);
            line-height: 19px;
          }
        }
      }
      .info {
        background-color: rgba(243, 250, 255, 1);
        display: flex;
        flex-direction: column;
        align-items: center;

        .info-title {
          padding-top: 48px;
          @extend %info-title;
        }

        .info-line {
          width: 95%;
          height: 1px;
          background-color: #d9e9ef;
          margin-bottom: 32px;
        }

        .inline {
          display: flex;
          flex-direction: row;
          padding-bottom: 32px;

          .title {
            width: 219px;
            font-size: 16px;
            font-family: OpenSans-Semibold, "PingFang SC", "微软雅黑", sans-serif;
            font-weight: 600;
            color: rgba(0, 0, 0, 1);
            line-height: 22px;
            margin-right: 17px;
          }

          .value {
            width: 420px;
            font-size: 16px;
            font-family: OpenSans, "PingFang SC", "微软雅黑", sans-serif;
            color: rgba(0, 0, 0, 1);
            line-height: 22px;
          }
        }
      }
    }
  }

  .right {
    flex-basis: 39.2%;
    background-color: $white;
    display: flex;
    flex-direction: column;

    > a {
      align-self: center;
      margin-top: 45px;
    }

    .title {
      text-align: center;
      font-size: 18px;
      font-family: OpenSans-Semibold, "PingFang SC", "微软雅黑", sans-serif;
      font-weight: 600;
      color: rgba(105, 135, 167, 1);
      line-height: 24px;
      padding-bottom: 16px;
    }

    .download {
      padding: 15px 0;
      margin: 0 48px;
      border-bottom: 1px solid #d9e9ef;

      .review-name {
        font-size: 14px;
        font-family: OpenSans, "PingFang SC", "微软雅黑", sans-serif;
        color: rgba(0, 120, 250, 0.4);
        line-height: 19px;
      }

      .row {
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        margin: 9px 0;
        padding: 0 24px;

        .review,
        .undo,
        .upload-file {
          font-size: 16px;
          font-family: OpenSans-Semibold, "PingFang SC", "微软雅黑", sans-serif;
          font-weight: 600;
          color: rgba(0, 120, 250, 1);
          line-height: 22px;
          padding: 0;
        }
      }

      .file-title,
      .file-title-none,
      .reviewed-title {
        font-size: 14px;
        font-family: OpenSans-Semibold, "PingFang SC", "微软雅黑", sans-serif;
        font-weight: 600;
        color: rgba(0, 51, 106, 1);
        line-height: 19px;
      }
      .file-title-none {
        color: rgba(183, 200, 206, 1);
      }
      .reviewed-title {
        color: rgba(15, 221, 161, 1);
      }
    }
  }
}

.link {
  font-size: 16px;
  font-family: OpenSans-Semibold, "PingFang SC", "微软雅黑", sans-serif;
  font-weight: 600;
  color: rgba(0, 120, 250, 1);
  line-height: 22px;

  &:hover {
    text-decoration: underline;
  }
}

.no-link {
  font-size: 16px;
  font-family: OpenSans, "PingFang SC", "微软雅黑", sans-serif;
  color: rgba(183, 200, 206, 1);
  line-height: 22px;
}

.btn-area {
  height: 80px;
  width: 100%;
  background-color: $white;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #b7c8ce;
  .btn {
    width: 159px;
    margin: 0 24px;
  }
}
</style>
