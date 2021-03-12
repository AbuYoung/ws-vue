<template>
  <div id="poster">
    <el-form
      class="login-container"
      label-position="left"
      label-width="0px">
      <h3 class="login_title">系统登陆</h3>
      <el-form-item>
        <el-input
          v-model="loginForm.username"
          type="text"
          auto-complete="on"
          placeholder="账号"/>
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="loginForm.password"
          type="password"
          auto-complete="on"
          placeholder="密码"/>
      </el-form-item>
      <el-form-item style="width: 100%">
        <el-button
          type="primary"
          style="width: 40%; background: #505458; border: none"
          @click="login">登录
        </el-button>
        <router-link to="register">
          <el-button
            type="primary"
            style="width: 40%;background: #505458;border: none">注册</el-button>
        </router-link>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

import { loginApply } from '../api/login'

export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      responseResult: []
    }
  },
  methods: {
    login() {
      const _this = this
      loginApply(this.loginForm.username, this.loginForm.password).then(res => {
        if (res.data.code === 200) {
          _this.$store.commit('login', _this.loginForm)
          const path = this.$route.query.redirect
          this.$router.replace({ path: path === '/' || path === undefined ? '/index' : path })
        }
      })
    }
  }
}
</script>

<style>
.login-container {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 90px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}

.login_title {
  margin: 0 auto 40px auto;
  text-align: center;
  color: #505458;
}

#poster {
  background: url("../assets/bg.jpg") no-repeat center;
  height: 100%;
  width: 100%;
  background-size: cover;
  position: fixed;
}

body {
  margin: 0;
}

</style>
