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
          <div class="info">
            <div class="info-title">Call Verification Check (Operator Reviewed)</div>
            <div class="inline">
              <div class="title">Call Date & Time</div>
              <div class="value">{{ $formatDatetime(firstReviewInfos.callTime) }}</div>
            </div>
            <div class="inline">
              <div class="title">Call To Person Name</div>
              <div class="value">{{ firstReviewInfos.callBy }}</div>
            </div>
            <div class="inline">
              <div class="title">Contact Number</div>
              <div class="value">{{ firstReviewInfos.contactNumber }}</div>
            </div>
            <div class="inline">
              <div class="title">Comment</div>
              <div class="value">{{ firstReviewInfos.comment }}</div>
            </div>
            <div class="inline">
              <div class="title">Note</div>
              <div class="value">{{ firstReviewInfos.note }}</div>
            </div>
          </div>
        </div>

        <div class="block">
          <div class="info-form">
            <div class="info-title">EKYC and DD (RCO Review)</div>

            <el-form
              label-position="top"
              autocomplete="on"
              :rules="rcoFormRules"
              ref="rcoForm"
              :model="rcoForm"
              class="rco-form"
            >
              <el-form-item label="Check List" prop="checkList" class="form-title">
                <el-checkbox-group class="checkbox-group" v-model="rcoForm.checkList">
                  <el-checkbox class="checkbox" label="Data Review"></el-checkbox>
                  <el-checkbox class="checkbox" label="Document Complete"></el-checkbox>
                  <el-checkbox class="checkbox" label="Due Diligence Review Complete"></el-checkbox>
                  <el-checkbox class="checkbox" label="Call Verification"></el-checkbox>
                  <el-checkbox
                    class="checkbox"
                    label="Shareholder and Directors data file contained and verified"
                  ></el-checkbox>
                  <el-checkbox class="checkbox" label="Approval from C-level sought"></el-checkbox>
                </el-checkbox-group>
              </el-form-item>

              <el-form-item
                label="Upload KYC assessment and email response from C-level (if any)"
                prop="emailFile"
                class="form-title"
              >
                <el-upload
                  class="upload-demo"
                  :action="actionUrl"
                  :headers="headers"
                  :before-upload="handleUpload"
                  :on-success="handleSuccess"
                  :on-error="handleError"
                  :limit="1"
                  :on-exceed="handleExceed"
                  :file-list="rcoForm.emailFile"
                  :data="actionData"
                >
                  <el-button size="small" type="primary">Click to upload</el-button>
                </el-upload>
              </el-form-item>

              <el-form-item label="Risk Rating" prop="risk_rating" class="form-title">
                <el-select v-model="rcoForm.risk_rating" placeholder="Risk Rating" class="risk">
                  <el-option label="Low" value="Low"></el-option>
                  <el-option label="Medium" value="Medium"></el-option>
                  <el-option label="High" value="High"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="Comment" prop="comment" class="form-title">
                <el-input type="textarea" v-model="rcoForm.comment"></el-input>
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
              <!--已经review-->
              <div v-if="item.reviewBy">
                <div class="reviewed-title">{{ item.title }}</div>
                <div class="review-name">{{ item.reviewBy }}</div>
              </div>
              <div v-else>
                <div class="file-title">{{ item.title }}</div>
              </div>

              <div class="row">
                <download-file :custEmail="custEmail" :fileName="item.key"></download-file>
              </div>
            </div>
            <!--用户未上传文件-->
            <div v-else>
              <div class="file-title-none">{{ item.title + " (None)" }}</div>
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
          :rules="rejectFormRules"
          ref="rejectForm"
          :model="rejectForm"
          class="rco-form"
        >
          <p>Are you sure to reject this application ?</p>
          <el-form-item prop="comment">
            <el-input
              type="textarea"
              placeholder="Please input the reason of this rejection (less than 200 characters)"
              v-model="rejectForm.comment"
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
            @click.native.prevent="submitForm('rejectForm', false)"
            round
          >{{ $t("common.confirm") }}</el-button>
        </div>
      </el-dialog>

      <el-button
        type="primary"
        :loading="loading"
        class="btn"
        @click.native.prevent="submitForm('rcoForm', true)"
        round
      >Approve</el-button>
    </div>
  </div>
</template>

<script>
import { getToken } from "../../utils/auth";
import DownloadFile from "@/views/users/components/DownloadFile";
import {
  COUNTRIES,
  UPLOAD_FILE_TYPES,
  UPLOAD_MANDATORY_FILES,
  UPLOAD_OPTIONAL_FILES,
} from "@/utils/const";

export default {
  components: { DownloadFile },
  data() {
    return {
      loading: false,
      countryOption: COUNTRIES,
      actionUrl: window.serverConfig.BASE_URL + "customers/file/upload",
      headers: { Authorization: getToken() },
      uploadFiles: [...UPLOAD_MANDATORY_FILES, ...UPLOAD_OPTIONAL_FILES],
      rcoForm: {
        approved: true, //true：审核通过  false：审核未通过
        cust_email: "",
        checkList: [],
        emailFile: [],
        data_review: true,
        document_review: true,
        due_dilligence_review: true,
        call_verification: true,
        shareholder_director_verified: true,
        clevel_approval: true,
        note: "",
        risk_rating: "",
        comment: "",
      },
      rcoFormRules: {
        checkList: [
          {
            type: "array",
            required: true,
            message: "Please complete check list",
            trigger: "change",
            len: 6,
          },
        ],
        risk_rating: [{ required: true, message: "Please set risk rating", trigger: "change" }],
        comment: [
          { max: 500, message: "Comment more than 500", trigger: "blur" },
          { required: true, message: "Please input comment", trigger: "blur" },
        ],
      },
      rejectForm: {
        comment: "",
        risk_rating: "Low",
        cust_email: "",
      },
      rejectFormRules: {
        comment: [
          { max: 200, message: "Comment more than 500", trigger: "blur" },
          { required: true, message: "Please input comment", trigger: "blur" },
        ],
      },
      dialogFormVisible: false,
    };
  },
  computed: {
    customer() {
      return this.$store.getters.selectCustomerKycInfo(this.$route.params.id) || {};
    },
    actionData() {
      return {
        name: "Email_Response_C_Level",
        cust_email: this.customer.email || "",
      };
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
    firstReviewInfos() {
      return this.customer.first_review_comment || {};
    },
    kycFiles() {
      const kyc_info = this.customer.kyc_info || {};
      return this.uploadFiles.map(item => ({
        key: item.key,
        title: item.title,
        fileKey: kyc_info[item.key] && kyc_info[item.key].key,
        reviewBy:  kyc_info[item.key] && kyc_info[item.key].reviewBy,
      }));
    },
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
      this.rcoForm.emailFile[0] = [{ name: file.name }];
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
    async submitForm(formName, approved) {
      await this.$refs[formName].validate();
      if (approved) {
        this.rcoForm.cust_email = this.customer.email;
        this.rcoForm.approved = approved;
      } else {
        this.rejectForm.cust_email = this.customer.email;
      }
      try {
        this.loading = true;
        await this.$store.dispatch("rcoReviewCustomer", approved ? this.rcoForm : this.rejectForm);
        this.$message.success("Success");
        this.$router.back();
      } finally {
        this.loading = false;
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
        .rco-form {
          width: 500px;
          padding-top: 24px;

          .form-title {
            font-size: 14px;
            font-family: OpenSans-Semibold, "PingFang SC", "微软雅黑", sans-serif;
            font-weight: 600;
            color: rgba(105, 135, 167, 1);
            line-height: 19px;
          }
          .checkbox-group {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;

            .checkbox {
              margin-left: 0 !important;
            }
          }

          .risk {
            width: 352px;
          }

          .row {
            display: flex;
            flex-direction: row;
            align-items: center;

            .file-upload-title {
              display: flex;
              justify-content: center;
              align-items: center;
              width: 352px;
              height: 40px;
              background: rgba(255, 255, 255, 1);
              border: 1px solid rgba(183, 200, 206, 1);
              margin-right: 24px;
            }
          }
        }
      }

      .info {
        background-color: rgba(243, 250, 255, 1);
        display: flex;
        flex-direction: column;
        align-items: center;

        %info-title {
          padding-bottom: 32px;
          font-size: 16px;
          font-family: OpenSans-Semibold, "PingFang SC", "微软雅黑", sans-serif;
          font-weight: 600;
          color: rgba(0, 0, 0, 1);
          line-height: 22px;
        }

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
    margin: 0px 24px;
  }
}
</style>
