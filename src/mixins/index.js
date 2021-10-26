import { songLikeSingerName } from '../api/index'
export const mixin = {
  methods: {
    // 获取图片地址
    attachImageUrl (srcUrl) {
      return srcUrl ? this.$store.state.HOST + srcUrl : '../assets/img/user.jpg'
    },
    // 根军歌手名字模糊查询歌曲
    getSong () {
      if (!this.$route.query.keywords) {
        this.$store.commit('setListOfSongs', [])
        this.$Message.error('您输入的内容为空')
      } else {
        songLikeSingerName(this.$route.query.keywords).then(res => {
          if (!res.data.length) {
            this.$store.commit('setListOfSongs', [])
            this.$Message.warning('系统暂无符合条件的歌曲')
          } else {
            this.$store.commit('setListOfSongs', res.data)
          }
        }).catch(err => {
          console.log(err)
        })
      }
    },
    // 播放歌曲
    toplay: function (id, url, pic, index, name, artist, lyric) {
      this.$store.commit('setId', id)
      this.$store.commit('setUrl', this.$store.state.HOST + url)
      this.$store.commit('setPicUrl', pic)
      this.$store.commit('setListIndex', index)
      this.$store.commit('setTitle', name)
      this.$store.commit('setArtist', artist)
      this.$store.commit('setLyric', lyric)
    },
    // 解析歌词
    parseLyric (text) {
      let lines = text.split('\n')
      let pattern = /\[\d{2}:\d{2}.(\d{3}|\d{2})]/g
      let result = []
      // 对于歌词格式不对的直接返回
      if (!(/\[.+\]/.test(text))) {
        return [[0, text]]
      }
      // 去掉格式不正确的行
      while (!pattern.test[lines[0]]) {
        lines = lines.slice(1)
      }
      // 遍历每一行，形成一个带着两元素的数组，第一个元素是时间，第二个是歌词
      for (let item of lines) {
        let time = item.match(pattern) // 存前面的时间段
        let value = item.replace(pattern, '') // 存后面的歌词
        for (let item1 of time) {
          let t = item1.slice(1, -1).split(':') // 取出时间
          if (value !== '') {
            result.push(parseInt(t[0], 10) * 60 + parseFloat(t[1], value))
          }
        }
      }
      // 按照第一个元素的时间进行排序
      result.sort(function (a, b) {
        return a[0] - b[0]
      })
      return result
    }
  }
}
