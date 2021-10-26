<template>
  <div class="home">
    <Swiper></Swiper>
    <div class="section" v-for="(item, index) in songsList" :key="index">
      <div class="section-title">{{item.name}}</div>
      <ContentList :content-list='item.list'></ContentList>
    </div>
  </div>
</template>

<script>
import Swiper from '@/components/Swiper'
import ContentList from '../components/ContentList'
import { getAllSinger, getAllSongList } from '../api/index'
export default {
  name: 'Home',
  components: {
    Swiper,
    ContentList
  },
  data () {
    return {
      songsList: [
        { name: '歌单', list: [] },
        { name: '歌手', list: [] }
      ]
    }
  },
  created () {
    this.getSongList()
    this.getSinger()
  },
  methods: {
    // 获取前十条歌单
    getSongList () {
      getAllSongList()
        .then(res => {
          this.songsList[0].list = res.data.slice(0, 10)
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 获取前十名歌手
    getSinger () {
      getAllSinger()
        .then(res => {
          this.songsList[1].list = res.data.slice(0, 10)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
@import '../assets/css/home.scss'
</style>
