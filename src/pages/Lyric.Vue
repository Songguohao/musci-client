<template>
<div class="song-lyric">
  <h1 class="lyric-title">歌词</h1>
  <!-- 有歌词 -->
  <ul class="has-lyric" v-if="lyr.length">
    <li v-for="(item, index) in lyr" :key="index">
      {{item[1]}}
    </li>
  </ul>
  <!-- 没有歌词 -->
  <div v-else class="no-lyric">
    <span>暂无歌词</span>
  </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import { mixin } from '../mixins'
export default {
  name: 'Lyric',
  mixins: [mixin],
  data () {
    return {
      lyr: [] // 当前歌曲的歌词
    }
  },
  computed: {
    ...mapGetters([
      'curTime',
      'id',
      'lyric',
      'listIndex',
      'listOfSongs'
    ])
  },
  watch: {
    id: function () {
      this.lyr = this.parseLyric(this.listOfSongs[this.listIndex].lyric)
    },
    curTime: function () {
      if (this.lyr.length > 0) {
        for (let i = 0; i < this.lyr.length; i++) {
          if (this.curTime > this.lyr[i][0]) {
            for (let j = 0; j < this.lyr.length; j++) {
              document.querySelectorAll('.has-lyric li')[j].style.color = '#000'
              document.querySelectorAll('.has-lyric li')[j].style.fontSize = '15px'
            }
            if (i >= 0) {
              document.querySelectorAll('.has-lyric li')[i].style.color = '#95d2f6'
              document.querySelectorAll('.has-lyric li')[i].style.fontSize = '25px'
            }
          }
        }
      }
    }
  },
  // 生命周期 - 创建完成（访问当前this实例）
  created () {
    this.lyr = this.lyric
  },
  // 生命周期 - 挂载完成（访问DOM元素）
  mounted () {

  }
}
</script>
<style lang="scss" scoped>
@import '../assets/css/lyric.scss';

</style>
