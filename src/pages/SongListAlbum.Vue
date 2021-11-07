<!-- 歌曲歌单 -->
<template>
  <div class="song-list-album">
    <div class="album-slide">
      <div class="album-img">
        <img :src="attachImageUrl(tempList.img)">
      </div>
      <div class="album-info">
        <h2>简介</h2>
        <span>
          {{ tempList.introduction }}
        </span>
      </div>
    </div>
    <div class="album-content">
      <div class="album-title">
        <p>{{ tempList.title }}</p>
      </div>
      <div class="songs-body">
      <AlbumContent :songList="listOfSongs">
        <template slot="title">歌单歌曲</template>
      </AlbumContent>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { mixin } from '../mixins'
import { getSongListDetail } from '../api/index'
import AlbumContent from '@/components/AlbumContent'

export default {
  name: 'SongListAlbum',
  mixins: [mixin],
  data () {
    return {
      songLists: [], // 当前页面需要展示的歌曲列表
      songListId: '' // 前面传来的歌单id
    }
  },
  components: {
    AlbumContent
  },
  computed: {
    ...mapGetters([
      'listOfSongs',
      'tempList'
    ])
  },
  // 生命周期 - 创建完成（访问当前this实例）
  created () {
    this.songListId = this.$route.params.id
    this.getSongs()
  },
  // 生命周期 - 挂载完成（访问DOM元素）
  mounted () {

  },
  methods: {
    getSongs () {
      getSongListDetail(this.songListId).then(res => {
        if (res.code === 1) {
          this.songLists = res.data
          this.$store.commit('setListOfSongs', this.songLists)
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
/* @import url(); 引入css类 */
@import '../assets/css/song-list-album.scss'
</style>
