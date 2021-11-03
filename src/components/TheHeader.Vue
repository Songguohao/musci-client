<template>
  <div class="the-header">
    <div class="header-logo" @click="goHome">
      <Icon type="ios-headset" class="icon"></Icon>
      <span>music</span>
    </div>
    <Menu mode="horizontal" ref="title" :active-name="activeName" class="navbar">
      <MenuItem v-for="item in navMsg" :key="item.path" :name="item.name" @click.native="goPage(item.path, item.name)">
        {{ item.name }}
      </MenuItem>
      <div class="header-search">
        <input type="text" placeholder="搜索歌手或歌单" @keyup.enter="goSearch()" v-model="keywords"></input>
        <Button type="primary" class="search-btn" @click="goSearch()">
          <Icon type="ios-search" style="font-size:20px"></Icon>
        </Button>
      </div>
    </Menu>
    <!-- 登陆注册 -->
    <Menu v-show="!loginIn" mode="horizontal" class="header-right">
      <MenuItem v-for="item in loginMsg" :key="item.path" :name="item.name" @click.native="goPage(item.path, item.name)">
        {{ item.name }}
      </MenuItem>
    </Menu>
    <!-- 用户信息 -->
    <div class="header-right" v-show="loginIn">
      <div id="user">
        <img :src="attachImageUrl(avatar)" />
      </div>
      <ul class="menu">
        <li v-for="(item, index) in menuList" :key="index" @click="goMenuList(item.path)">
          {{item.name}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { loginMsg, navMsg, menuList } from '../assets/data/header.js'
import { mapGetters } from 'vuex'
export default {
  name: 'TheHeader',
  data () {
    return {
      navMsg: [],
      keywords: '',
      loginMsg: [],
      menuList: [] // 用户下拉菜单
    }
  },
  created () {
    this.navMsg = navMsg
    this.loginMsg = loginMsg
    this.menuList = menuList
  },
  mounted () {
    document.querySelector('#user').addEventListener('click', function (e) {
      document.querySelector('.menu').classList.add('show')
      e.stopPropagation()
    }, false)
    document.querySelector('.menu').addEventListener('click', function (e) {
      e.stopPropagation()
    }, false)
    document.addEventListener('click', function () {
      document.querySelector('.menu').classList.remove('show')
    })
  },
  computed: {
    ...mapGetters([
      'activeName',
      'loginIn',
      'avatar'
    ])
  },
  methods: {
    goHome () {
      this.$store.commit('setActiveName', '首页')
      this.$refs.title.currentActiveName = '首页'
      this.$router.push({path: '/'})
    },
    goPage (path, name) {
      this.$store.commit('setActiveName', name)
      this.$router.push({path: path})
    },
    goSearch () {
      if (this.keywords) {
        this.$router.push({path: '/search', query: { keywords: this.keywords }})
      } else {
        this.$Message.error('您输入的内容为空')
      }
    },
    // 获取图片地址
    attachImageUrl (srcUrl) {
      return srcUrl ? this.$store.state.HOST + srcUrl : '../assets/img/user.jpg'
    },
    goMenuList (path) {
      if (path === 0) {
        this.$store.commit('setLoginIn', false)
        this.$router.go(0) // 刷新页面
      } else {
        this.$router.push({path: path})
      }
    }
  }
}
</script>
<style lang='scss' scoped>
@import '../assets/css/the-header.scss'
</style>
import { neximport { nextTick } from 'vue/types/umd'
tTick } from 'vue/types/umd'
