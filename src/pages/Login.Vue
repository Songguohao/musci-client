<!-- 登陆 -->
<template>
  <div class="signUp-page">
    <LoginLogo/>
    <div class="signUp">
      <div class="signUp-head">
        <span>账号登陆</span>
      </div>
      <el-form :model="loginForm" ref="registerForm" label-width="70px" class="demo-ruleForm" :rules="rules">
        <el-form-item prop="username" label="用户名">
          <el-input v-model="loginForm.username" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input type="password" v-model="loginForm.password" placeholder="密码"></el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button @click="goSignUp">注册</el-button>
          <el-button type="primary" @click="handleLoginIn" :loading="loading">登陆</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { loginIn } from '../api'
import LoginLogo from '../components/LoginLogo'
import { mixin } from '../mixins'

export default {
  name: 'Login',
  mixins: [mixin],
  data () {
    return {
      loading: false,
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [{required: true, trigger: 'blur', message: '请输入用户名'}],
        password: [{required: true, trigger: 'blur', message: '请输入密码'}]
      }
    }
  },
  components: {
    LoginLogo
  },
  // 生命周期 - 创建完成（访问当前this实例）
  created () {

  },
  // 生命周期 - 挂载完成（访问DOM元素）
  mounted () {
    this.changeIndex('登陆')
  },
  methods: {
    handleLoginIn () {
      let that = this
      let params = {
        username: this.loginForm.username,
        password: this.loginForm.password
      }
      that.loading = true
      loginIn(params).then(res => {
        if (res.code === 1) {
          that.$Message.success('登陆成功!2秒后自动跳转首页...')
          that.$store.commit('setLoginIn', true)
          that.$store.commit('setUserId', res.data.id)
          that.$store.commit('setUsername', res.data.username)
          that.$store.commit('setAvatar', res.data.avatar)
          this.changeIndex('首页')
          setTimeout(function () {
            that.loading = false
            that.$router.push({path: '/'})
          }, 2000)
        } else {
          that.$Message.error('用户名或密码错误')
        }
      }).catch(err => {
        console.log(err)
        that.$Message.error('登陆失败')
      })
    },
    goSignUp () {
      this.changeIndex('注册')
      this.$router.push({path: '/signUp'})
    },
    changeIndex (value) {
      this.$store.commit('setActiveName', value)
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../assets/css/sign-up.scss'

</style>
