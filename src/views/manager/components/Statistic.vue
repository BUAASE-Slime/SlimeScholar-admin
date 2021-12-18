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
              &nbsp;&nbsp;<el-tooltip class="item" effect="light" content="近一百次请求的平均响应时间" placement="top">
                  <span>平均响应时间</span>
                </el-tooltip>
            </span>
          </div>
          <div id="time-chart" style="width: 400px; height: 400px;"></div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="div-active">
          <div class="div-time">
            <div class="left">
              <span class="title">
                <i class="el-icon-data-line"></i>
                &nbsp;&nbsp;<el-tooltip class="item" effect="light" content="每天的请求（响应）次数" placement="top">
                    <span>平台活跃指数</span>
                  </el-tooltip>
              </span>
            </div>
            <div id="active-chart" style="width: 400px; height: 370px;"></div>
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
        memberCount: 345,

        responseTime: 310,
        activeIndex: [
          ['2021-10-10', 200],
          ['2021-10-11', 560],
          ['2021-10-12', 750],
          ['2021-10-13', 580],
          ['2021-10-14', 250],
          ['2021-10-15', 300],
          ['2021-10-16', 450],
          ['2021-10-17', 300],
          ['2021-10-18', 100],
          ['2021-10-19', 200],
          ['2021-10-20', 560],
          ['2021-10-21', 750],
          ['2021-10-22', 580],
          ['2021-10-23', 250],
          ['2021-10-24', 300],
          ['2021-10-25', 450],
          ['2021-10-26', 300],
          ['2021-10-27', 100],
        ]
      },
    }
  },
  created() {
    this.$axios({
      method: 'post',
      url: '/submit/count'
    })
    .then(res => {
      switch (res.data.status) {
        case 200:
          this.info = res.data.data;
          this.info.userCount = this.info.userCount.toLocaleString();
          this.info.literCount = this.info.literCount.toLocaleString();
          this.info.authorCount = this.info.authorCount.toLocaleString();
          this.info.memberCount = this.info.memberCount.toLocaleString();

          //页面加载完成后,才执行
          setTimeout(() => {
            this.showTimeChart();
            this.showActiveChart();
          }, 1000);

          break;
        default:
          this.$message.error("获取信息失败！");
          break;
      }
    })
    .catch(err => {
      console.log(err);
    })
  },
  methods: {
    gotoMem() {
      this.$emit('handleSelect', '3');
    },
    showTimeChart() {
      let timeChart = this.$echarts.init(document.getElementById('time-chart'));
      timeChart.setOption({
        series: [
          {
            min: 0,
            max: 500,
            type: 'gauge',
            progress: {
              show: true,
              width: 15
            },
            axisLine: {
              lineStyle: {
                width: 15
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              length: 10,
              lineStyle: {
                width: 2,
                color: '#999'
              }
            },
            axisLabel: {
              distance: 25,
              color: '#999',
              fontSize: 12
            },
            anchor: {
              show: true,
              showAbove: true,
              size: 15,
              itemStyle: {
                borderWidth: 5
              }
            },
            title: {
              show: false
            },
            detail: {
              valueAnimation: true,
              fontSize: 25,
              offsetCenter: [0, '70%'],
              formatter: function (value) {
                return value + 'ms';
              }
            },
            data: [
              {
                value: this.info.responseTime
              }
            ]
          }
        ]
      });
    },
    showActiveChart() {
      let activeChart = this.$echarts.init(document.getElementById('active-chart'));
      activeChart.setOption({
        tooltip: {
          trigger: 'axis',
          // position: function (pt) {
          //   return [pt[0], '10%'];
          // }
        },
        // toolbox: {
        //   feature: {
        //     dataZoom: {
        //       yAxisIndex: 'none'
        //     },
        //     restore: {},
        //     saveAsImage: {}
        //   }
        // },
        xAxis: {
          type: 'category',
          boundaryGap: false
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, '100%']
        },
        dataZoom: [
          {
            type: 'inside',
            start: 60,
            end: 100
          },
          {
            start: 0,
            end: 100
          }
        ],
        series: [
          {
            name: '活跃指数',
            type: 'line',
            smooth: true,
            symbol: 'none',
            areaStyle: {},
            data: this.info.activeIndex,
          }
        ]
      });
    }
  },
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