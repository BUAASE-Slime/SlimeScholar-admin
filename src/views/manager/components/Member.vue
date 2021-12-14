<template>
  <div class="member">
    <div class="top-info">
      <span>
        当前已有
        <span style="color: #2d94d4; font-size: 24px">{{ memCount }}</span>
        位学者入驻平台
      </span>
    </div>
    <div class="member-table">
      <el-table
          v-loading="loading"
          :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
          stripe
          :header-cell-style="{'text-align':'center'}"
          :cell-style='cellStyle'>
<!--          @cell-click="goClick">-->
        <el-table-column
            prop="real_name"
            label="姓名"
            min-width="150">
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
            min-width="180">
        </el-table-column>
        <el-table-column
            prop="accept_time"
            label="入驻时间"
            min-width="150">
          <template scope="scope">
            <div>{{ timeFormatter(scope.row.accept_time) }}</div>
          </template>
        </el-table-column>
        <el-table-column
            prop="paper_count"
            label="发表文献数"
            min-width="100">
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
  </div>
</template>

<script>
import commonApi from "@/utils/common";

export default {
  name: "Member",
  mixins: [ commonApi ],
  data() {
    return {
      memCount: 123,

      // Table settings
      loading: false,
      currentPage: 1,
      pageSize: 10,
      pageSizes: [7,10,15],

      tableData: [
        {
          author_id: 1,
          real_name: 'Zehuan Huang',
          work_email: 'huangzehuan@buaa.edu.cn',
          affiliation_name: 'Beihang University',
          accept_time: '2021/11/28 10:03',
          paper_count: 200,
        },
        {
          author_id: 2,
          real_name: 'Yu Li',
          work_email: 'liyu@buaa.edu.cn',
          affiliation_name: 'Beihang University',
          accept_time: '2021/11/28 20:03',
          paper_count: 200,
        },
        {
          author_id: 3,
          real_name: 'Qin Zhou',
          work_email: 'zhouqin@buaa.edu.cn',
          affiliation_name: 'Beihang University',
          accept_time: '2021/11/29 20:03',
          paper_count: 200,
        },
        {
          author_id: 4,
          real_name: 'Qin Zhou',
          work_email: 'zhouqin@buaa.edu.cn',
          affiliation_name: 'Beihang University',
          accept_time: '2021/11/29 20:03',
          paper_count: 200,
        }
      ],
    }
  },
  methods: {
    // link
    checkDetail(author_id) {
      window.open(this.GLOBAL.searchUrl + "/schPortal?v=" + author_id);
    },
    // table
    goClick(row) {
      this.checkDetail(row.author_id);
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
    const _form = new FormData();
    _form.append("type", 1);
    this.loading = true;
    this.$axios({
      data: _form,
      method: 'post',
      url: '/submit/list'
    })
    .then(res => {
      this.loading = false;
      if (res.data.success) {
        this.tableData = res.data.submits;
        this.memCount = this.tableData.length.toLocaleString();
      } else {
        this.$message.error("信息获取失败");
      }
    })
    .catch(err => {
      console.log(err);
    })
  }
}
</script>

<style scoped>

.member .top-info {
  text-align: left;
}

.member .member-table {
  margin-top: 20px;
}

</style>