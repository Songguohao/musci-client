<template>
  <div class="content">
    <h1 class="title">
      <slot name="title"></slot>
    </h1>
    <ul style="text-align: center;">
      <li style="list-style-type:none;">
        <div class="song-item">
          <span class="item-index"></span>
          <span class="item-title">歌曲名</span>
          <span class="item-name">歌手</span>
          <span class="item-intro">专辑</span>
        </div>
      </li>
      <li v-for="(item, index) in songList" :key="index">
        <div class="song-item" @click="toplay(item.id, item.url, item.img, index, item.name, item.singerName, item.lyric)">
          <span class="item-index">
            {{index+1}}
          </span>
          <span class="item-title">{{item.name}}</span>
          <span class="item-name">{{item.singerName}}</span>
          <span class="item-intro">{{item.introduction}}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { mixin } from '../mixins'
export default {
  name: 'AlbumContent',
  mixins: [mixin],
  data () {
    return {}
  },
  props: [
    'songList'
  ],
  computed: {
    ...mapGetters([
      'listOfSongs'
    ])
  },
  // 生命周期 - 创建完成（访问当前this实例）
  created () {},
  // 生命周期 - 挂载完成（访问DOM元素）
  mounted () {}
}
</script>
<style lang='scss' scoped>
/* @import url(); 引入css类 */
@import '../assets/css/album-content.scss'
</style>
