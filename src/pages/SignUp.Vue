<!-- 注册 -->
<template>
  <div class="signUp-page">
    <LoginLogo/>
    <div class="signUp">
      <div class="signUp-head">
        <span>用户注册</span>
      </div>
      <el-form :model="registerForm" ref="registerForm" label-width="70px" class="demo-ruleForm" :rules="rules">
        <el-form-item prop="username" label="用户名">
          <el-input v-model="registerForm.username" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input type="password" v-model="registerForm.password" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio-group v-model="registerForm.sex">
            <el-radio label="0">女</el-radio>
            <el-radio label="1">男</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="phoneNum" label="手机">
          <el-input v-model="registerForm.phoneNum" placeholder="手机"></el-input>
        </el-form-item>
        <el-form-item prop="email" label="邮箱">
          <el-input v-model="registerForm.email" placeholder="邮箱"></el-input>
        </el-form-item>
        <el-form-item prop="birth" label="生日">
          <el-date-picker v-model="registerForm.birth" placeholder="选择日期" style="width:100%;"></el-date-picker>
        </el-form-item>
        <el-form-item prop="introduction" label="签名">
          <el-input type="textarea" v-model="registerForm.introduction" placeholder="签名"></el-input>
        </el-form-item>
        <el-form-item prop="location" label="地区">
          <el-select v-model="registerForm.location" placeholder="地区" style="width:100%;">
            <el-option v-for="item in cities" :key="item.vale" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <div class="login-btn">
          <el-button @click="goback(-1)">取消</el-button>
          <el-button type="primary" @click="signUp" :loading="loading">确定</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import LoginLogo from '../components/LoginLogo'
import { cities, rules } from '../assets/data/form'
import { mixin } from '../mixins'
import { signUp } from '../api/index'
export default {
  name: 'SignUp',
  mixins: [mixin],
  data () {
    return {
      loading: false,
      registerForm: {
        username: '',
        password: '',
        sex: '',
        phoneNum: '',
        email: '',
        birth: '',
        introduction: '',
        location: ''
      },
      cities: [], // 所有地区
      rules: {

      }
    }
  },
  components: {
    LoginLogo
  },
  // 生命周期 - 创建完成（访问当前this实例）
  created () {
    this.rules = rules
    this.cities = cities
  },
  // 生命周期 - 挂载完成（访问DOM元素）
  mounted () {

  },
  methods: {
    signUp () {
      let _this = this
      let d = this.registerForm.birth
      let datetime = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
      let params = {
        'username': this.registerForm.username,
        'password': this.registerForm.password,
        'sex': this.registerForm.sex,
        'phoneNum': this.registerForm.phoneNum,
        'email': this.registerForm.email,
        'birth': datetime,
        'introduction': this.registerForm.introduction,
        'location': this.registerForm.location,
        'avatar': '/img/avatar/Favorites.png'
      }
      _this.loading = true
      signUp(params).then(res => {
        if (res.code === 1) {
          this.$Message.success('注册成功!2秒后自动跳转首页...')
          _this.changeIndex('首页')
          setTimeout(function () {
            _this.loading = false
            _this.$router.push({path: '/'})
          }, 2000)
        } else {
          this.$Message.error(res.msg)
        }
      }).catch(err => {
        console.log(err)
        this.$Message.error('注册失败')
      })
    },
    goback (index) {
      this.$router.go(index)
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
