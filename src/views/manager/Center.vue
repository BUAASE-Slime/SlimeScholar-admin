<template>
  <div class="center">
    <div class="box">
      <sidebar></sidebar>
      <router-view/>
    </div>
  </div>
</template>

<script>
import sidebar from '../manager/SideBar'

export default {
  name: "Center",
  components: {
    sidebar
  }
}
</script>

<style scoped>
.home {
  position: relative;
  width: 100%;
  height: 100%;
}

/*.box {*/
/*  display: flex;*/
/*  margin-top: 20px;*/
/*}*/
</style>