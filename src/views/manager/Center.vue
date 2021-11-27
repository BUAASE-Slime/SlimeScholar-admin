<template>
  <div class="center">
    <el-container>
      <el-aside class="side" width="350px">
        <el-row class="tac" style="width: 250px">
          <el-col :span="12" style="width: 250px">
            <el-menu
                width="250px"
                default-active="1"
                class="el-menu-vertical-demo"
                @select="handleSelect"
            >
              <el-menu-item index="1">
                <i class="el-icon-pie-chart"></i>
                <span slot="title">平台概况</span>
              </el-menu-item>
              <el-menu-item index="2">
                <i class="el-icon-connection"></i>
                <span slot="title">入驻申请</span>
              </el-menu-item>
              <el-menu-item index="3">
                <i class="el-icon-user"></i>
                <span slot="title">入驻学者</span>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
    </el-container>
    <div class="box">
      <statistic></statistic>
    </div>
  </div>
</template>

<script>
import statistic from "@/views/manager/components/Statistic";

export default {
  name: "Center",
  components: {
    statistic
  },
  methods: {
    handleSelect(key) {
      console.log(key);
    }
  }
}
</script>

<style scoped>

a {
  text-decoration: none;
}

</style>