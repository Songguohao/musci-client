<template>
  <div class="search">
    <nav class="searchList-nav" ref="change">
      <span :class="{isActive: toggle === 'Songs'}" @click="handleChangeView('Songs')">歌曲</span>
      <span :class="{isActive: toggle === 'SongLists'}" @click="handleChangeView('SongLists')">歌单</span>
    </nav>
    <component :is="currentView">
    </component>
  </div>
</template>

<script>
import SearchSongs from '../components/search/SearchSongs'
import SearchSongLists from '../components/search/SearchSongLists'
export default {
  name: 'Search',
  data () {
    return {
      toggle: 'Songs',
      currentView: 'SearchSongs'
    }
  },
  components: {
    SearchSongs,
    SearchSongLists
  },
  // 生命周期 - 创建完成（访问当前this实例）
  created () {},
  // 生命周期 - 挂载完成（访问DOM元素）
  mounted () {},
  methods: {
    handleChangeView (toggle) {
      this.toggle = toggle
      this.currentView = 'Search' + toggle
    }
  }
}
</script>
<style lang='scss' scoped>
/* @import url(); 引入css类 */
@import '../assets/css/search.scss'
</style>
