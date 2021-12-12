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
              <el-button plain icon="el-icon-circle-close" @click="refuseAll">一键拒绝</el-button>
            </el-tooltip>
<!--            <el-tooltip class="item" effect="light" content="筛选通过文献作者与申请人姓名相同的申请" placement="top-start">-->
<!--              <el-button plain icon="el-icon-view" @click="acceptCheck">筛选通过</el-button>-->
<!--            </el-tooltip>-->
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
          @selection-change="handleSelectionChange">
<!--          @cell-click="goClick">-->

        <el-table-column
            type="selection"
            width="50">
        </el-table-column>
        <el-table-column
            prop="real_name"
            label="姓名"
            min-width="120">
          <template scope="scope">
            <div @click="goClick(scope.row)">{{ scope.row.real_name }}</div>
          </template>
        </el-table-column>
        <el-table-column
            prop="work_email"
            label="邮箱"
            min-width="200">
        </el-table-column>
        <el-table-column
            prop="affiliation_name"
            label="所在机构"
            min-width="200">
        </el-table-column>
        <el-table-column
            prop="created_time"
            label="申请时间"
            min-width="150"
        >
          <template scope="scope">
            <div>{{ timeFormatter(scope.row.created_time) }}</div>
          </template>
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
      <el-pagination layout="sizes, prev, pager, next, jumper"
                     background
                     :current-page="currentPage"
                     :page-size="pageSize"
                     :page-sizes="pageSizes"
                     :total="tableData.length"
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     style="margin-top: 20px"
                     v-if="!loading">
      </el-pagination>
    </div>

    <el-dialog title="确认信息" :visible.sync="dialogFormVisible" width="40%">
      <el-form ref="confirmForm" :model="confirmForm" label-width="90px">
        <el-form-item :label="formTitle">
          <el-input type="textarea"
                    placeholder="请输入操作原因或说明"
                    maxlength="300"
                    show-word-limit
                    rows="3"
                    v-model="confirmForm.content"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="checkEvent">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import commonApi from "@/utils/common";
import qs from "qs";
export default {
  name: "Apply",
  mixins: [ commonApi ],
  data() {
    return {
      dialogFormVisible: false,
      confirmForm: {
        content: ''
      },
      formTitle: '',
      // Table settings
      loading: false,
      currentPage: 1,
      pageSize: 10,
      pageSizes: [7,10,15],
      tableData: [
        {
          submit_id: 1,
          user_id: 2,
          real_name: 'Zehuan Huang',
          work_email: 'huangzehuan@buaa.edu.cn',
          affiliation_name: 'Beihang University',
          created_time: '2021/11/28 10:03'
        },
        {
          submit_id: 2,
          user_id: 2,
          real_name: 'Yu Li',
          work_email: 'liyu@buaa.edu.cn',
          affiliation_name: 'Beihang University',
          created_time: '2021/11/28 20:03'
        },
        {
          submit_id: 3,
          user_id: 2,
          real_name: 'Qin Zhou',
          work_email: 'zhouqin@buaa.edu.cn',
          affiliation_name: 'Beihang University',
          created_time: '2021/11/29 20:03'
        },
        {
          submit_id: 4,
          user_id: 2,
          real_name: 'Qin Zhou',
          work_email: 'zhouqin@buaa.edu.cn',
          affiliation_name: 'Beihang University',
          created_time: '2021/11/29 20:03'
        }
      ],
      multipleSelection: [],
      checkIndex: 0,
      checkIds: '',
      success: true,
      isAll: false,
    }
  },
  methods: {
    getInfo() {
      this.loading = true;
      this.$axios({
        method: 'post',
        url: '/submit/list',
        data: qs.stringify({
          type: 0
        })
      })
      .then(res => {
        this.loading = false;
        if (res.data.success) {
          this.tableData = res.data.submits;
        } else {
          this.$message.error("信息获取失败");
        }
      })
      .catch(err => {
        console.log(err);
      })
    },
    getTitle(success) {
      return success === true? '通过说明' : '拒绝原因';
    },
    checkEvent() {
      if (this.isAll) this.checkAll();
      else this.check();
    },
    check() {
      this.$axios({
        method: 'post',
        url: '/submit/check',
        data: qs.stringify({
          submit_id: this.tableData[this.checkIndex].submit_id,
          user_id: this.tableData[this.checkIndex].user_id,
          success: this.success,
          content: this.confirmForm.content
        })
      })
      .then(res => {
        if (res.data.success) {
          this.$message.success("操作成功");
          this.dialogFormVisible = false;
          this.tableData.splice(this.checkIndex, 1);
        } else {
          this.$message.error("操作失败");
        }
      })
      .catch(err => {
        console.log(err);
      })
    },
    accept(index) {
      this.checkIndex = index;
      this.isAll = false;
      this.formTitle = this.getTitle(true);
      this.dialogFormVisible = true;
      this.success = true;
    },
    refuse(index) {
      this.checkIndex = index;
      this.isAll = false;
      this.formTitle = this.getTitle(false);
      this.dialogFormVisible = true;
      this.success = false;
    },
    checkAll() {
      this.$axios({
        method: 'post',
        url: '/submit/check/more',
        data: qs.stringify({
          submit_ids: this.checkIds,
          success: this.success,
          content: this.confirmForm.content
        })
      })
      .then(res => {
        switch (res.data.status) {
          case 200:
            this.$message.success("操作成功");
            this.dialogFormVisible = false;
            this.getInfo();
            break;
          case 406:
            this.$message.warning("没有需要审批的申请");
            break;
          default:
            this.$message.error("操作失败！");
            break;
        }
      })
    },
    acceptAll() {
      if (this.multipleSelection.length === 0) {
        this.$message.warning("请至少选择下列表格中的一项");
        return;
      }
      this.checkIds = '';
      for (let i = 0; i < this.multipleSelection.length; i++)
        this.checkIds += this.multipleSelection[i].submit_id + ",";
      this.isAll = true;
      this.formTitle = this.getTitle(true);
      this.dialogFormVisible = true;
      this.success = true;
    },
    refuseAll() {
      if (this.multipleSelection.length === 0) {
        this.$message.warning("请至少选择下列表格中的一项");
        return;
      }
      this.checkIds = '';
      for (let i = 0; i < this.multipleSelection.length; i++)
        this.checkIds += this.multipleSelection[i].submit_id + ",";
      this.isAll = true;
      this.formTitle = this.getTitle(false);
      this.dialogFormVisible = true;
      this.success = false;
    },
    // link
    checkDetail(submit_id) {
      let routeUrl = this.$router.resolve({
        path: '/apply_detail',
        query: { v: submit_id }
      });
      window.open(routeUrl .href, '_blank');
    },
    // table
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    goClick(row) {
      this.checkDetail(row.submit_id);
    },
    cellStyle(row) {
      if (row.column.label === '姓名')
        return 'text-align: center; cursor: pointer';
      else
        return 'text-align: center;';
    },
    // pagination
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.currentPage = 1;
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
    },

    timeFormatter(value) {
      if (!value) return "";
      return this.dateFormat(value, 'yyyy/MM/dd HH:mm');
    }
  },
  created() {
    this.getInfo();
  },
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