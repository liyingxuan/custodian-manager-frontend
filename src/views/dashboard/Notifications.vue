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
    <div class="title-area">
      <div class="title">NOTIFICATIONS</div>
    </div>

    <div class="notify-area" v-loading="loading">
      <div class="inner-area">
        <el-table
          class
          id="n-table"
          :data="notificationTableData"
          :cell-class-name="cellClassName"
          @row-click="handleRowClick"
        >
          <el-table-column fixed="left" label width="24">
            <template slot-scope="scope">
              <div v-if="!scope.readed" class="dot"></div>
            </template>
          </el-table-column>

          <el-table-column width="530px" label prop="title"></el-table-column>
          <el-table-column
            label
            prop="update_time"
            :formatter="(row, col, value) => $formatDatetime(value)"
          ></el-table-column>
        </el-table>
        <div class="g-pagination-area pagination-area">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="notificationTableDataTotal"
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
      currentPage: 1,
    };
  },
  watch: {
    queryParams: {
      async handler(val) {
        try {
          this.loading = true;
          await this.$store.dispatch("getNotifications", val);
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
    notificationTableData() {
      return this.$store.getters.selectNotifications(this.queryParams) || [];
    },
    notificationTableDataTotal() {
      return this.$store.getters.selectNotificationsTotal(this.queryParams) || 0;
    },
  },
  created() {},
  methods: {
    handleRowClick(row, event, column) {
      this.$router.push({
        name: "notification-detail",
        params: { id: row.id },
      });
    },
    cellClassName(o) {
      const { row, column, rowIndex, columnIndex } = o;

      if (columnIndex === 0 && !this.notificationTableData[rowIndex].readed) {
        return "unread";
      } else if (columnIndex === 1) {
        return "g-notification-cell-title";
      } else if (columnIndex === 2) {
        return "g-notification-cell-time";
      }
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "../../styles/variables.scss";

.title-area {
  background-color: $white;
  height: 98px;
  border-bottom: solid 1px rgba(183, 200, 206, 1);

  .title {
    font-family: OpenSans-Light, "PingFang SC", "微软雅黑", sans-serif;
    font-weight: 300;
    color: rgba(74, 144, 226, 1);
    line-height: 52px;
    font-size: 38px;
    padding: 24px 0px 0px 32px;
  }
}

.notify-area {
  background-color: $white;
  padding-top: 32px;

  display: flex;
  flex-direction: column;
  align-items: center;

  .unread {
    .dot {
      width: 5px;
      height: 5px;
      background: rgba(0, 120, 250, 1);
    }
  }

  .inner-area {
    width: 800px;
  }

  .pagination-area {
    margin: 48px 0px 64px 0px;
  }
}
</style>
