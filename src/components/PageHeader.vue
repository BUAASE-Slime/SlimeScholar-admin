<template>
  <div class="header">
    <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1" style="font-size: 26px" @click="gotoHome">
        <img src="../assets/images/slime_logo.png" alt="logo" style="height: 40px">
      </el-menu-item>
      <el-menu-item index="2" @click="SlimeSearch">搜索入口</el-menu-item>
      <el-submenu index="3" style="float: right" v-if="isLogin">
        <template slot="title">{{ userName }}</template>
        <el-menu-item index="3-1" class="big-item" @click="dialogFormVisible=true">修改密码</el-menu-item>
        <el-menu-item index="3-2" class="big-item" @click="logout">退出</el-menu-item>
      </el-submenu>
      <i v-if="isLogin" class="el-icon-user"></i>
      <i v-if="isLogin" class="el-icon-bell" @click="openNews"></i>
      <div class="login-button">
        <el-button index="3" style="float: right" v-if="!isLogin" type="primary" @click="login">登录</el-button>
      </div>
    </el-menu>

    <div>
      <el-dialog  width="515px" title="修改密码" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="旧密码" label-width="80px">
            <el-input type="password" show-password v-model="form.old" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="新密码" label-width="80px">
            <el-input type="password" show-password v-model="form.new" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" label-width="80px">
            <el-input  type="password" show-password v-model="form.newagain" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="clearPasswordForm">取 消</el-button>
          <el-button type="primary" @click="changePassword">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import user from "@/store/user";

export default {
  name: 'pageHeader',
  data() {
    return {
      userName: 'admin',
      activeIndex: '1',
      isLogin: true,

      dialogFormVisible: false,
      form: {
        old: "",
        new: "",
        newagain: "",
      },
    };
  },
  created() {
    const userInfo = user.getters.getUser(user.state());
    if (userInfo)
    {
      this.isLogin = true;
      this.userName = userInfo.user.username;
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    gotoHome: function () {
      this.$router.push('/');
    },
    SlimeSearch: function () {
      window.open(this.GLOBAL.search_url, "_blank");
    },
    login() {
      this.$router.push('/user');
    },
    openNews() {
      this.$router.push('/messages');
    },
    logout() {
      this.$axios({
        method: 'get',
        url: '/user/logout',
      })
      .then(res => {
        switch (res.data.status_code) {
          case 200:
            this.$store.dispatch('clear');
            location.reload();
            break;
          case 401:
            this.$message.error('未检测到登录信息！');
            break;
        }
      })
      .catch(err => {
        console.log(err);
      })
    },

    clearPasswordForm() {
      this.dialogFormVisible = false;
      this.form.newagain = '';
      this.form.old = '';
      this.form.new = '';
    },
    //TODO: 修改密码
    changePassword() {
      if (this.form.new !== this.form.newagain) {
        this.$message.error("两次输入的密码不同");
        this.form.newagain = '';
        this.form.old = '';
        this.form.new = '';
        return;
      }
      const reg=/^[\u4e00-\u9fa5_a-zA-Z0-9]+$/;
      if (!reg.test(this.form.new)) {
        this.$message.error("密码不符合规范，须由8-18个字符组成，且同时包含字母和数字");
        this.form.newagain = '';
        this.form.old = '';
        this.form.new = '';
        return;
      }

      const formData = new FormData();
      formData.append("old_password", this.form.old);
      formData.append("new_password_1", this.form.new);
      formData.append("new_password_2", this.form.newagain);

      this.$axios({
        method: 'post',
        url: '/user/change/password',
        data: formData,
      })
      .then(res => {
        switch (res.data.status_code) {
          case 1:
            this.$message.success("修改成功");
            this.dialogFormVisible = false;
            break;
          case 2:
            this.$message.error("两次输入的密码不同");
            break;
          case 3:
            this.$message.error("新旧密码相同");
            break;
          case 4:
            this.$message.error("输入的原密码错误");
            break;
          case 5:
            this.$message.error("输入的密码不符合规范，密码须由8-18个字符组成，且同时包含字母和数字");
            break;
          default:
            this.$message.error("操作失败");
            break;
        }
      })
      .catch(err => {
        console.log(err);
      })
  this.form.newagain = '';
  this.form.old = '';
  this.form.new = '';
}
  }
}
</script>


<style>
.header .el-menu{
  height: 70px;
  padding-left: 50px;
  padding-right: 50px;
}

.header .el-menu--horizontal>.el-menu-item {
  float: left;
  height: 70px;
  line-height: 70px;
  margin: 0;
  border-bottom: 2px solid transparent;
  color: black;
}

.header .el-icon-user {
  padding-top: 22px;
  font-size: 24px;
  float: right;
}

.header .el-icon-bell {
  padding-top: 22px;
  padding-right: 20px;
  font-size: 24px;
  float: right;
  cursor: pointer;
}

.header .el-menu--horizontal>.el-menu-item.is-active {
  border-bottom: 2px solid transparent;
  color: #409EFF !important;
}

.header .el-menu-item {
  font-size: 17px;
}

.header .el-menu--horizontal>.el-submenu .el-submenu__title {
  height: 70px;
  line-height: 70px;
  color: black;
}

.header .el-submenu__title {
  font-size: 16px;
  color: black;
}

.el-menu--horizontal>.el-submenu.is-active .el-submenu__title {
  border-bottom: none !important;
  color: black;
}

.big-item .el-menu-item li {
  line-height: 50px!important;
}

.login-button {
  padding: 15px;
}

.login-button button {
  width: 100px;
  background-color: #1687fd;
}

</style>