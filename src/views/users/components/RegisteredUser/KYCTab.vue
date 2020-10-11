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
        <div class="info">
          <div class="info-title">EKYC and DD (RCO Reviewed)</div>
          <div class="inline">
            <div class="title">Data Review</div>
            <div class="value">{{ rcoReviewInfos.dataReview }}</div>
          </div>
          <div class="inline">
            <div class="title">Document Complete</div>
            <div class="value">{{ rcoReviewInfos.documentReview }}</div>
          </div>
          <div class="inline">
            <div class="title">Due Diligence Review Complete</div>
            <div class="value">{{ rcoReviewInfos.dueDilligenceReview }}</div>
          </div>
          <div class="inline">
            <div class="title">Call Verification</div>
            <div class="value">{{ rcoReviewInfos.callVerification }}</div>
          </div>
          <div class="inline">
            <div class="title">Shareholder and Directors data file contained and verified</div>
            <div class="value">{{ rcoReviewInfos.shareholderDirectorVerified }}</div>
          </div>
          <div class="inline">
            <div class="title">Approval from C-level sought</div>
            <div class="value">{{ rcoReviewInfos.clevelApproval }}</div>
          </div>
          <div class="info-line"></div>

          <div class="inline" v-if="cLevelFile.fileKey">
            <div class="title">KYC assessment and email response from C-level</div>
            <div class="value">
              <download-file :custEmail="custEmail" fileName="Email_Response_C_Level"></download-file>
            </div>
          </div>
          <div class="inline">
            <div class="title">Risk Rating</div>
            <div class="value">{{ rcoReviewInfos.riskRating }}</div>
          </div>
          <div class="inline">
            <div class="title">Comment</div>
            <div class="value">{{ rcoReviewInfos.comment }}</div>
          </div>
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
</template>

<script>
import DownloadFile from "@/views/users/components/DownloadFile";
import { COUNTRIES, UPLOAD_MANDATORY_FILES, UPLOAD_OPTIONAL_FILES } from "@/utils/const";

export default {
  components: { DownloadFile },
  data() {
    return {
      countryOption: COUNTRIES,
      uploadFiles: [...UPLOAD_MANDATORY_FILES, ...UPLOAD_OPTIONAL_FILES],
    };
  },
  computed: {
    customer() {
      return this.$store.getters.selectCustomerKycInfo(this.$route.params.id) || {};
    },
    userId() {
      return this.$route.params.id;
    },
    infos() {
      return this.customer.basic_info || {};
    },
    custEmail() {
      return this.customer.email;
    },
    firstReviewInfos() {
      return this.customer.first_review_comment || {};
    },
    rcoReviewInfos() {
      return this.customer.rco_review_comment || {};
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
    cLevelFile() {
      const kyc_info = this.customer.kyc_info || {};
      const key = "Email_Response_C_Level";
      return {
        key: key,
        fileKey: kyc_info[key] && kyc_info[key].key,
      };
    },
  },
  created() {
    this.loadCustomerDetail();
  },
  methods: {
    loadCustomerDetail() {
      this.$store.dispatch("getCustomerKycInfo", this.$route.params.id);
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "../../../../styles/variables.scss";

.kyc-area {
  display: flex;
  flex-direction: row;
  padding: 17px;

  .left {
    flex-basis: 61.8%;

    .block {
      margin-bottom: 32px;

      .info {
        background-color: rgba(243, 250, 255, 1);
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0 32px;

        %info-title {
          padding-bottom: 32px;
          font-size: 16px;
          font-family: OpenSans-Semibold;
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
            font-family: OpenSans-Semibold;
            font-weight: 600;
            color: rgba(0, 0, 0, 1);
            line-height: 22px;
            margin-right: 17px;
          }

          .value {
            width: 420px;
            font-size: 16px;
            font-family: OpenSans;
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
  font-family: OpenSans-Semibold;
  font-weight: 600;
  color: rgba(0, 120, 250, 1);
  line-height: 22px;

  &:hover {
    text-decoration: underline;
  }
}
</style>
