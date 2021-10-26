<template>
  <transition name="slide-fade">
    <div class="the-aside" v-if="showAside">
      <h2 class="title">播放列表</h2>
      <ul class="menus">
        <li v-for="(item, index) in listOfSongs" :key="index" :class="{'is-play': id===item.id}"
        @click="toplay(item.id, item.url, item.img, index, item.name, item.singerName, item.lyric)">
          {{ item.name }}
        </li>
      </ul>
    </div>
  </transition>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: 'TheAside',
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'showAside', // 是否显示播放中的歌曲列表
      'listOfSongs', // 当前歌曲列表
      'id' // 播放中的音乐id
    ])
  },
  mounted () {
    let that = this
    document.addEventListener('click', function () {
      that.$store.commit('setShowAside', false)
    }, true)
  },
  components: {

  },
  methods: {
    // 播放歌曲
    toplay: function (id, url, pic, index, name, artist, lyric) {
      this.$store.commit('setId', id)
      this.$store.commit('setUrl', this.$store.state.HOST + url)
      this.$store.commit('setPicUrl', pic)
      this.$store.commit('setListIndex', index)
      this.$store.commit('setTitle', name)
      this.$store.commit('setArtist', artist)
      this.$store.commit('setLyric', lyric)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/the-aside.scss'
</style>
