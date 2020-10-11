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
    <div class="cust__table-title-manage">WORKFLOW</div>

    <div class="content" v-loading="workflowTableDataLoading">
      <div class="workflow-table">
        <el-table
          :data="workflowTableData"
          header-cell-class-name="header-cell"
          :cell-class-name="cellClassName"
        >
          <el-table-column label="Transaction ID" prop="tx_id" align="center"/>
          <el-table-column
            label="Activity"
            prop="activity"
            align="center"
            :formatter="(row, col, value) => $formatEnumType('ActivityType', value)"
          />
          <el-table-column
            label="Status"
            prop="status"
            align="center"
            :formatter="(row, col, value) => $formatEnumType('WorkflowStatusType', value)"
          />
          <el-table-column label="Initiator" prop="initiator" align="center"/>
          <el-table-column
            label="Create Time"
            prop="create_time"
            align="center"
            :formatter="(row, col, value) => $formatDatetime(value)"
          />
          <el-table-column
            label="Update Time"
            prop="update_time"
            align="center"
            :formatter="(row, col, value) => $formatDatetime(value)"
          />
          <el-table-column label="Operation" align="center">
            <template slot-scope="scope">
              <el-button
                v-if="scope.row.has_permission"
                type="text"
                size="medium"
                @click="onActionClick(scope.$index, scope.row)"
              >Action</el-button>
              <el-button
                type="text"
                size="medium"
                @click="onDetailClick(scope.$index, scope.row)"
              >Detail</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination-row">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="workflowTableDataTotal"
            :current-page.sync="workflowTableCurrentPage"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      workflowTableDataLoading: false,
      workflowTableCurrentPage: 1,
    };
  },
  computed: {
    queryParamsOfGetWorkflows() {
      return {
        page_index: this.workflowTableCurrentPage,
        page_offset: 10,
      };
    },
    workflowTableData() {
      return this.$store.getters.selectWorkflows(this.queryParamsOfGetWorkflows) || [];
    },
    workflowTableDataTotal() {
      return this.$store.getters.selectWorkflowsTotal(this.queryParamsOfGetWorkflows) || 0;
    },
  },
  watch: {
    queryParamsOfGetWorkflows: {
      async handler(val) {
        try {
          this.workflowTableDataLoading = true;
          await this.$store.dispatch("getWorkflows", val);
        } finally {
          this.workflowTableDataLoading = false;
        }
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    cellClassName(o) {
      const { row, column, rowIndex, columnIndex } = o;
      let theClass = "body-cell normal";
      if (row.has_permission) {
        theClass = "body-cell bold";
      }
      return theClass;
    },
    onActionClick(index, row) {
      switch (row.activity) {
        case "account-review":
          this.$router.push({ name: "account-review-action", params: { tx_id: row.tx_id } });
          break;
        case "create-address":
          this.$router.push({ name: "create-address-action", params: { tx_id: row.tx_id } });
          break;
        case "withdraw-review":
          this.$router.push({ name: "withdraw-review-action", params: { tx_id: row.tx_id } });
          break;
        case "withdraw-operate":
          this.$router.push({ name: "withdraw-operation-action", params: { tx_id: row.tx_id } });
          break;
      }
    },
    onDetailClick(index, row) {
      switch (row.activity) {
        case "account-review":
          this.$router.push({ name: "account-review-detail", params: { tx_id: row.tx_id } });
          break;
        case "create-address":
          this.$router.push({ name: "create-address-detail", params: { tx_id: row.tx_id } });
          break;
        case "withdraw-review":
          this.$router.push({ name: "withdraw-review-detail", params: { tx_id: row.tx_id } });
          break;
        case "withdraw-operate":
          this.$router.push({ name: "withdraw-operation-detail", params: { tx_id: row.tx_id } });
          break;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.no-fixed-width-container {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.content {
  background-color: rgba(255, 255, 255, 1);
}

.workflow-table {
  /deep/ .header-cell {
    height: 48px;
    background-color: rgba(105, 135, 167, 1);

    .cell {
      font-size: 14px;
      font-family: OpenSans-Semibold, "PingFang SC", "微软雅黑", sans-serif;
      font-weight: 600;
      color: rgba(255, 255, 255, 1);
      line-height: 19px;
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
      font-family: OpenSans, "PingFang SC", "微软雅黑", sans-serif;
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
