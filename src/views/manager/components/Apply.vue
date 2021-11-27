<template>
  <div class="apply">
    <div class="top-button">
      <el-row>
        <el-col span="12">
          <el-button-group>
            <el-tooltip class="item" effect="light" content="一键通过所选入驻申请" placement="top-start">
              <el-button plain icon="el-icon-circle-check" @click="acceptAll">一键通过</el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="light" content="一键拒绝所选入驻申请" placement="top-start">
              <el-button plain icon="el-icon-circle-close" @click="acceptAll">一键拒绝</el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="light" content="筛选通过文献作者与申请人姓名相同的申请" placement="top-start">
              <el-button plain icon="el-icon-view" @click="acceptCheck">筛选通过</el-button>
            </el-tooltip>
          </el-button-group>
        </el-col>
        <el-col span="12" style="text-align: right; padding-bottom: 12px; padding-top: 12px">
          <span style="color: #2d94d4">点击姓名项可查看申请的详细信息！</span>
        </el-col>
      </el-row>
    </div>
    <div class="apply-table">
      <el-table
          v-loading="loading"
          :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
          stripe
          :header-cell-style="{'text-align':'center'}"
          :cell-style='cellStyle'
          ref="multipleTable"
          @cell-click="goClick"
          @selection-change="handleSelectionChange">
        <el-table-column
            type="selection"
            width="50">
        </el-table-column>
        <el-table-column
            prop="author_name"
            label="姓名"
            min-width="150">
        </el-table-column>
        <el-table-column
            prop="email"
            label="邮箱"
            min-width="200">
        </el-table-column>
        <el-table-column
            prop="affiliation"
            label="所在机构"
            min-width="180">
        </el-table-column>
        <el-table-column
            prop="apply_time"
            label="申请时间"
            min-width="150"
        >
        </el-table-column>
        <el-table-column
            label="通过"
        >
          <i class="el-icon-caret-right"></i>
          <template slot-scope="scope">
            <el-button
                size="mini"
                @click="accept(scope.$index)">通过</el-button>
          </template>
        </el-table-column>
        <el-table-column
            label="拒绝"
        >
          <template slot-scope="scope">
            <el-button
                size="mini"
                type="danger"
                @click="refuse(scope.$index)">拒绝</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "Apply",
  data() {
    return {
      // Table settings
      loading: false,
      currentPage: 1,
      pageSize: 10,
      pageSizes: [7,10,15],
      tableData: [
        {
          apply_id: 1,
          author_name: 'Zehuan Huang',
          email: 'huangzehuan@buaa.edu.cn',
          affiliation: 'Beihang University',
          apply_time: '2021/11/28 10:03'
        },
        {
          apply_id: 2,
          author_name: 'Yu Li',
          email: 'liyu@buaa.edu.cn',
          affiliation: 'Beihang University',
          apply_time: '2021/11/28 20:03'
        },
        {
          apply_id: 3,
          author_name: 'Qin Zhou',
          email: 'zhouqin@buaa.edu.cn',
          affiliation: 'Beihang University',
          apply_time: '2021/11/29 20:03'
        },
        {
          apply_id: 4,
          author_name: 'Qin Zhou',
          email: 'zhouqin@buaa.edu.cn',
          affiliation: 'Beihang University',
          apply_time: '2021/11/29 20:03'
        }
      ],
      multipleSelection: [],
    }
  },
  methods: {
    accept(index) {
      console.log("accept " + this.tableData[index].author_name);
    },
    refuse(index) {
      console.log("refuse " + this.tableData[index].author_name);
    },
    acceptAll() {

    },
    acceptCheck() {

    },
    // link
    checkDetail(apply_id) {
      console.log(apply_id);
    },
    // table
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    goClick(row) {
      this.checkDetail(row.apply_id);
    },
    cellStyle(row) {
      if (row.column.label === '姓名')
        return 'text-align: center; cursor: pointer';
      else
        return 'text-align: center;';
    }
  }
}
</script>

<style scoped>

.apply .top-button {
  text-align: left;
}

.apply .apply-table {
  margin-top: 20px;
}

</style>