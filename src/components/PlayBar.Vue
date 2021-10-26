<template>
  <div class="play-bar">
    <div class="kongjian">
      <!-- 上一首歌 -->
      <div class="item">
        <Icon type="ios-rewind-outline" style="font-size:30px;margin-top:-10px;"></Icon>
      </div>
      <!-- 播放 -->
      <div class="item" @click="togglePlay">
        <Icon type="ios-pause" v-if="isPlay" style="font-size:30px;margin-top:-10px;"></Icon>
        <Icon type="ios-play" v-else style="font-size:30px;margin-top:-10px;"></Icon>
      </div>
      <!-- 下一首歌 -->
      <div class="item">
        <Icon type="ios-fastforward-outline" style="font-size:30px;margin-top:-10px;"></Icon>
      </div>
      <!-- 歌曲图片 -->
      <div class="item-img" >
        <img :src="attachImageUrl (picUrl)"/>
      </div>
      <!-- 播放进度 -->
      <div class="playing-speed">
        <!-- 播放开始时间 -->
        <div class="current-time">{{nowTime}}</div>
        <div class="progress-box">
          <div class="item-song-title">
            <div>{{this.title}}</div>
            <div>{{this.artist}}</div>
          </div>
          <div ref="progress" class="progress" @mousemove="mousemove">
            <!-- 进度条 -->
            <div ref="bg" class="bg" @click="updatemove">
              <div ref="curProgress" class="cur-progress" :style="{width:curLength+'%'}"></div>
            </div>
            <!-- 拖动点 -->
            <div ref="idot" class="idot" :style="{left:curLength+'%'}" @mousedown="mousedown" @mouseup="mouseup"></div>
          </div>
        </div>
        <!-- 播放结束时间 -->
        <div class="current-time">{{songTime}}</div>
      </div>
      <!-- 音量 -->
      <div class="item item-volume">
        <Icon v-if="volume == 0" type="ios-volume-off" style="font-size:35px;margin-top:-10px;"></Icon>
        <Icon v-else type="ios-volume-up" style="font-size:35px;margin-top:-10px;"></Icon>
        <el-slider class="volume" v-model="volume" :vertical="true"></el-slider>
      </div>
      <!-- 收藏 -->
      <div class="item">
        <Icon type="ios-heart-outline" style="font-size:30px;margin-top:-10px;"></Icon>
      </div>
      <!-- 下载 -->
      <div class="item">
        <Icon type="ios-download" style="font-size:30px;margin-top:-10px;"></Icon>
      </div>
      <!-- 播放列表 -->
      <div class="item">
        <Icon type="ios-list" @click="changeAside" style="font-size:30px;margin-top:-10px;"></Icon>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'PlayBar',
  data () {
    return {
      nowTime: '00:00', // 当前播放进度的时间
      songTime: '00:00', // 当前歌曲总时间
      curLength: 0, // 进度条的位置
      progressLength: 0, // 进度条总长度
      mouseStartX: 0, // 鼠标拖拽开始位置
      tag: false, // 拖拽开始结束的标志，当开始拖拽它的值才变为true
      volume: 50
    }
  },
  // 生命周期 - 创建完成（访问当前this实例）
  created () {},
  // 生命周期 - 挂载完成（访问DOM元素）
  mounted () {
    this.progressLength = this.$refs.progress.getBoundingClientRect().width
    // 点击音量出现滑动框
    document.querySelector('.item-volume').addEventListener('click', function (e) {
      document.querySelector('.volume').classList.add('show-volume')
      e.stopPropagation()
    }, false)
    document.querySelector('.volume').addEventListener('click', function (e) {
      e.stopPropagation()
    }, false)
    document.addEventListener('click', function () {
      document.querySelector('.volume').classList.remove('show-volume')
    })
  },
  computed: {
    ...mapGetters([
      'id',
      'url',
      'isPlay',
      'duration',
      'curTime',
      'autoNext',
      'artist',
      'title',
      'picUrl'
    ])
  },
  watch: {
    curTime () {
      this.nowTime = this.formatSeconds(this.curTime)
      this.songTime = this.formatSeconds(this.duration)
      this.curLength = (this.curTime / this.duration) * 100
    },
    // 音量变化
    volume () {
      this.$store.commit('setVolume', this.volume / 100)
    }

  },
  methods: {
    // 控制音乐播放暂停
    togglePlay () {
      if (this.isPlay) {
        this.$store.commit('setIsPlay', false)
      } else {
        this.$store.commit('setIsPlay', true)
      }
    },
    attachImageUrl (srcUrl) {
      return srcUrl ? this.$store.state.HOST + srcUrl : '../assets/img/user.jpg'
    },
    // 解析时间
    formatSeconds (value) {
      let theTime = parseInt(value)
      let result = ''
      let hour = parseInt(theTime / 3600) // 小时
      let minute = parseInt((theTime / 60) % 60) // 分钟
      let second = parseInt(theTime % 60)
      if (hour > 0) {
        if (hour < 10) {
          result = '0' + hour + ':'
        } else {
          result = hour + ':'
        }
      }
      if (minute > 0) {
        if (minute < 10) {
          result += '0' + minute + ':'
        } else {
          result += minute + ':'
        }
      } else {
        result += '00:'
      }
      if (second > 0) {
        if (second < 10) {
          result += '0' + second
        } else {
          result += second
        }
      } else {
        result += '00'
      }
      return result
    },
    // 拖拽开始
    mousedown (e) {
      this.mouseStartX = e.clientX
      this.tag = true
    },
    // 拖拽结束
    mouseup () {
      this.tag = false
    },
    // 拖拽中
    mousemove (e) {
      if (!this.duration) {
        return false
      }
      if (this.tag) {
        let movementX = e.clientX - this.mouseStartX // 移动的距离
        let curLength = this.$refs.curProgress.getBoundingClientRect().width
        let newPercent = (movementX + curLength) / this.progressLength * 100
        if (newPercent > 100) {
          newPercent = 100
        }
        this.curLength = newPercent
        this.mouseStartX = e.clientX
        this.changeTime(newPercent)
      }
    },
    // 更改歌曲进度
    changeTime (percent) {
      let newCurTime = (percent * 0.01) * this.duration
      this.$store.commit('setChangeTime', newCurTime)
    },
    // 点击播放条切换播放进度
    updatemove (e) {
      if (!this.tag) {
        // 进度条的左侧坐标
        let curLength = this.$refs.bg.offsetLeft
        let newPercent = (e.clientX - curLength) / this.progressLength * 100
        if (newPercent > 100) {
          newPercent = 100
        } else if (newPercent < 0) {
          newPercent = 0
        }
        this.curLength = newPercent
        this.changeTime(newPercent)
      }
    },
    // 显示播放中的歌曲列表
    changeAside () {
      this.$store.commit('setShowAside', true)
    }
  }
}
</script>
<style lang="scss" scoped>
/* @import url(); 引入css类 */
@import '../assets/css/play-bar.scss'
</style>
