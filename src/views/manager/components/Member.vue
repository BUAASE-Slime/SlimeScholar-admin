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
          :cell-style='cellStyle'
          @cell-click="goClick">
        <el-table-column
            prop="member_name"
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
            prop="accept_time"
            label="入驻时间"
            min-width="150">
        </el-table-column>
        <el-table-column
            prop="article_count"
            label="发表文献数"
            min-width="100">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "Member",
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
          member_id: 1,
          member_name: 'Zehuan Huang',
          email: 'huangzehuan@buaa.edu.cn',
          affiliation: 'Beihang University',
          accept_time: '2021/11/28 10:03',
          article_count: 200,
        },
        {
          member_id: 2,
          member_name: 'Yu Li',
          email: 'liyu@buaa.edu.cn',
          affiliation: 'Beihang University',
          accept_time: '2021/11/28 20:03',
          article_count: 200,
        },
        {
          member_id: 3,
          member_name: 'Qin Zhou',
          email: 'zhouqin@buaa.edu.cn',
          affiliation: 'Beihang University',
          accept_time: '2021/11/29 20:03',
          article_count: 200,
        },
        {
          member_id: 4,
          member_name: 'Qin Zhou',
          email: 'zhouqin@buaa.edu.cn',
          affiliation: 'Beihang University',
          accept_time: '2021/11/29 20:03',
          article_count: 200,
        }
      ],
    }
  },
  methods: {
    // link
    checkDetail(member_id) {
      console.log(member_id);
    },
    // table
    goClick(row) {
      this.checkDetail(row.member_id);
    },
    cellStyle(row) {
      if (row.column.label === '姓名')
        return 'text-align: center; cursor: pointer';
      else
        return 'text-align: center;';
    }
  },
  created() {
    this.memCount = this.memCount.toLocaleString();
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