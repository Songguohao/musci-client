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
    }
  }
}
