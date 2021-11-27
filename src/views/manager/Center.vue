<template>
  <div class="center">
    <el-container>
      <el-aside width="350px">
        <div class="aside">
          <el-menu
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
        </div>
      </el-aside>
      <el-main>
        <div class="main-body">
          <Statistic v-if="tagPage==='1'" v-bind:tagPage="tagPage" v-on:handleSelect="handleSelect(key)"></Statistic>
          <Apply v-else-if="tagPage==='2'"></Apply>
          <Member v-else></Member>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Statistic from "@/views/manager/components/Statistic";
import Member from "@/views/manager/components/Member";
import Apply from "@/views/manager/components/Apply";

export default {
  name: "Center",
  components: {
    Statistic,
    Apply,
    Member
  },
  data() {
    return {
      tagPage: '1',
    }
  },
  methods: {
    handleSelect(key) {
      this.tagPage = key;
      console.log(key);
    }
  }
}
</script>

<style scoped>

a {
  text-decoration: none;
}

.center .aside {
  margin-left: 100px;
  margin-top: 50px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .08), 0 0 6px rgba(0, 0, 0, .04);
}

.center .main-body {
  box-shadow: 0 2px 4px rgba(0, 0, 0, .08), 0 0 6px rgba(0, 0, 0, .04);
  background-color: white;
  width: 900px;
  margin-left: 60px;
  margin-top: 30px;
  padding: 30px 50px;
}

</style>