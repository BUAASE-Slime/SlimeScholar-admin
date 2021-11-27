<template>
  <div class="statistic">
    <div class="div-info">
      <div class="left title">
        <span>
          <i class="el-icon-coin"></i>
          &nbsp;&nbsp;信息概况
        </span>
      </div>
      <div class="info-detail left">
        <p>注册用户数：&emsp;{{ info.userCount }}</p>
        <p>文献总数：&emsp;&emsp;{{ info.literCount }}</p>
        <p>作者总数：&emsp;&emsp;{{ info.authorCount }}</p>
        <p>入驻学者数：&emsp;{{ info.memberCount }}
          &emsp;&emsp;
          <span style="color: #2d94d4; cursor: pointer; " @click="gotoMem">查看详情</span>
        </p>
      </div>
    </div>
    <el-divider></el-divider>
    <el-row :gutter="20">
      <el-col :span="12">
        <div class="div-time">
          <div class="left">
            <span class="title">
              <i class="el-icon-odometer"></i>
              &nbsp;&nbsp;检索响应时间
            </span>
          </div>
          <div id="time-chart"></div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="div-active">
          <div class="div-time">
            <div class="left">
              <span class="title">
                <i class="el-icon-data-line"></i>
                &nbsp;&nbsp;平台活跃指数
              </span>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Statistic",
  props: ['tagPage'],
  data() {
    return {
      info: {
        userCount: 350,
        literCount: 100000,
        authorCount: 5000,
        memberCount: 345
      }
    }
  },
  methods: {
    gotoMem() {
      this.$emit('handleSelect', '3');
    },
    showTimeChart() {
      let timeChart = this.$echarts.init(document.getElementById('time-chart'));
    }
  },
  created() {
    this.info.userCount = this.info.userCount.toLocaleString();
    this.info.literCount = this.info.literCount.toLocaleString();
    this.info.authorCount = this.info.authorCount.toLocaleString();
    this.info.memberCount = this.info.memberCount.toLocaleString();
  }
}
</script>

<style scoped>

.statistic .title {
  font-size: 23px;
  font-weight: bold;
  margin-bottom: 40px;
}

.statistic .left {
  text-align: left;
}

.statistic .info-detail {
  margin-left: 40px;
  margin-bottom: 40px;
}

</style>