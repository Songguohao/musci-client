<!--  -->
<template>
  <div class="song-audio">
    <audio ref="player"
    :src= url
    controls = "controls"
    preload="true"
    @canplay="startPlay"
    @ended="ended"
    @timeupdate="timeupdate"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'SongAudio',
  data () {
    return {
    }
  },
  created () {},
  // 生命周期 - 挂载完成（访问DOM元素）
  mounted () {},
  computed: {
    ...mapGetters([
      'id',
      'url',
      'isPlay',
      'duration',
      'curTime',
      'changeTime',
      'autoNext',
      'volume'
    ])
  },
  watch: {
    // 监听播放还是暂停状态
    isPlay () {
      this.togglePlay()
    },
    // 跳转到播放时刻
    changeTime () {
      this.$refs.player.currentTime = this.changeTime
    },
    // 改变音量
    volume (val) {
      this.$refs.player.volume = val
    }
  },
  methods: {
    // 获取链接后进行播放
    startPlay () {
      let player = this.$refs.player
      this.$store.commit('setDuration', player.duration)
      player.play()
      this.$store.commit('setIsPlay', true)
    },
    ended () {
      this.$store.commit('setIsPlay', false)
      this.$store.commit('setCurTime', 0)
      this.$store.commit('setAutoNext', !this.autoNext)
    },
    // 开始、暂停
    togglePlay () {
      let player = this.$refs.player
      if (this.isPlay) {
        player.play()
      } else {
        player.pause()
      }
    },
    // 记录音乐播放位置
    timeupdate () {
      this.$store.commit('setCurTime', this.$refs.player.currentTime)
    }
  }
}
</script>
<style scoped>
/* @import url(); 引入css类 */
.song-audio {
  display: inline;
}
</style>
