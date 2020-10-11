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
  <div class="no-fixed-width-container" :loading="loading">
    <div class="cust__table-title-manage">ANNOUNCEMENTS</div>

    <div class="cust__table-top-add">
      <el-button @click="handleNew" class="cust__primary-btn">New</el-button>
    </div>

    <div class="content">
      <div class="address-table">
        <el-table
          :data="announcementTableData"
          header-cell-class-name="header-cell"
          cell-class-name="body-cell normal"
        >
          <el-table-column label="Title" prop="title" align="left"/>
          <el-table-column
            label="Publish Time"
            prop="message_publish_time"
            :formatter="(row, col, value) => $formatDatetime(value)"
            align="center"
          />
          <el-table-column
            label="Status"
            prop="status"
            align="center"
            :formatter="(row, col, value) => $formatEnumType('AnnouncementStatusType', value)"
          />
          <el-table-column align="center" header-align="center" label="Operation">
            <template slot-scope="scope">
              <div v-if="scope.row.status !== 'sent'">
                <div class="g-table-actions">
                  <div class="g-table-action" @click="handleView(scope.$index, scope.row)">View</div>
                  <div class="g-table-separate"></div>
                  <div class="g-table-action" @click="handleModify(scope.$index, scope.row)">Modify</div>
                  <div class="g-table-separate"></div>
                  <div class="g-table-action" @click="handleDelete(scope.$index, scope.row)">Delete</div>
                </div>
              </div>
              <div v-else>
                <div class="g-table-actions">
                  <div class="g-table-action" @click="handleView(scope.$index, scope.row)">View</div>
                </div>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination-row">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="announcementTableDataTotal"
            :current-page.sync="currentPage"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      status: "",
      currentPage: 1,
    };
  },
  watch: {
    queryParams: {
      async handler(val) {
        try {
          this.loading = true;
          await this.$store.dispatch("getAnnouncements", val);
        } finally {
          this.loading = false;
        }
      },
      deep: true,
      immediate: true,
    },
  },
  computed: {
    queryParams() {
      return {
        page_index: this.currentPage,
        page_offset: 10,
      };
    },
    announcementTableData() {
      return this.$store.getters.selectAnnouncements(this.queryParams) || [];
    },
    announcementTableDataTotal() {
      return this.$store.getters.selectAnnouncementsTotal(this.queryParams) || 0;
    },
  },
  methods: {
    handleNew() {
      this.$router.push({ name: "add-announcement" });
    },
    handleView(index, row) {
      this.$router.push({ name: "view-announcement", params: { id: row.id } });
    },
    handleModify(index, row) {
      this.$router.push({ name: "modify-announcement", params: { id: row.id } });
    },
    async handleDelete(index, row) {
      try {
        this.loading = true;
        await this.$store.dispatch("removeAnnouncement", row.id);
        await this.$store.dispatch("getAnnouncements", this.queryParams);
        this.$message.success("Success");
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../styles/variables.scss";

.cust__table-top-add {
  padding: 22px 24px;
  background-color: white;
  font-size: 38px;
  font-family: OpenSans-Light, "PingFang SC", "微软雅黑", sans-serif;
  font-weight: 300;
  color: rgba(0, 51, 106, 1);
  line-height: 52px;
  border-bottom: solid 1px #b7c8ce;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.no-fixed-width-container {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.content {
  background-color: rgba(255, 255, 255, 1);
}

.filter-row {
  height: 64px;
  display: flex;
  align-items: center;

  .el-date-editor {
    margin-left: 24px;
  }

  .el-input {
    width: 320px;
    margin-left: 24px;
  }

  .el-button {
    width: 88px;
    margin-left: 24px;
  }

  .filter-left,
  .filter-right {
    display: flex;
    flex: 1;
    align-items: center;
  }
  .filter-left {
    display: flex;
    flex-basis: 20%;
  }
  .filter-right {
    display: flex;
    flex-basis: 80%;
  }
}

.address-table {
  /deep/ .header-cell {
    height: 48px;
    background-color: rgba(105, 135, 167, 1);

    .cell {
      font-size: 14px;
      font-family: OpenSans-Semibold;
      font-weight: 600;
      color: rgba(255, 255, 255, 1);
      line-height: 19px;

      i {
        color: rgba(255, 255, 255, 1);
      }
    }
  }

  /deep/ .body-cell {
    height: 48px;

    &.normal {
      .cell {
        color: rgba(95, 106, 118, 1);
      }
    }

    &.bold {
      .cell {
        color: rgba(0, 0, 0, 1);
      }
    }

    .cell {
      font-size: 14px;
      font-family: OpenSans;
      line-height: 19px;
    }
  }

  .pagination-row {
    height: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
