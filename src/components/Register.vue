<template>
  <div id="paper">
    <el-form
      v-loading="loading"
      class="login-container"
      label-position="left"
      label-width="0px">
      <h3 class="login_title">用户注册</h3>
      <el-form-item>
        <el-input
          v-model="loginForm.username"
          type="text"
          auto-complete="off"
          placeholder="账号"/>
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="loginForm.password"
          type="password"
          auto-complete="off"
          placeholder="密码"/>
      </el-form-item>
      <el-form-item style="width: 100%">
        <el-button
          type="primary"
          style="width: 40%;background: #505458;
      border: none"
          @click="register">注册
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checked: true,
      loginForm: {
        username: '',
        password: ''
      },
      loading: false
    }
  },
  methods: {
    register() {
      const _this = this
      this.$axios.post('/register', {
        username: this.loginForm.username,
        password: this.loginForm.password
      }).then(resp => {
        if (resp.data.code === 200) {
          this.$alert('注册成功', '提示', {
            confirmButtonText: '确定'
          })
          _this.$router.replace('/login')
        } else {
          this.$alert(resp.data.message, '提示', {
            confirmButtonText: '确定'
          })
        }
        // eslint-disable-next-line no-unused-vars
      }).catch(failResponse => {
      })
    }
  }
}
</script>

<style scoped>
#paper {
  background: url("../assets/bg.jpg") no-repeat center;
  height: 100%;
  width: 100%;
  background-size: cover;
  position: fixed;
}

body {
  margin: -5px 0;
}

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
</style>
