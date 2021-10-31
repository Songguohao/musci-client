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
  </div>
</template>

<script>
import { loginMsg, navMsg } from '../assets/data/header.js'
import { mapGetters } from 'vuex'
export default {
  name: 'TheHeader',
  data () {
    return {
      navMsg: [],
      keywords: '',
      loginMsg: []
    }
  },
  created () {
    this.navMsg = navMsg
    this.loginMsg = loginMsg
  },
  mounted () {
  },
  computed: {
    ...mapGetters([
      'activeName',
      'loginIn'
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
    }
  }
}
</script>
<style lang='scss' scoped>
@import '../assets/css/the-header.scss'
</style>
import { neximport { nextTick } from 'vue/types/umd'
tTick } from 'vue/types/umd'
