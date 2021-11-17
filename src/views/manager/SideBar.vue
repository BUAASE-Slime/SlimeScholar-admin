<template>
  <div class="side-bar">
    <el-container>
      <el-aside class="side" width="350px">
        <el-row class="tac" style="width: 250px">
          <el-col :span="12" style="width: 250px">
            <el-menu
                width="250px"
                default-active="1"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                router
            >
              <router-link :to="{name: 'Statistic'}">
                <el-menu-item>
                  <i class="el-icon-s-data"></i>
                  <span slot="title">信息统计</span>
                </el-menu-item>
              </router-link>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "SideBar",
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>