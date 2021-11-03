import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    HOST: 'http://127.0.0.1:8888',
    activeName: '', // 当前选择的菜单
    showAside: false, // 是否显示歌单列表
    listOfSongs: [], // 当前歌曲列表
    isPlay: false, //  音乐是否播放
    url: '', // 歌曲地址
    id: '', // 歌曲id
    duration: 0, // 音乐时长
    curTime: 0, // 当前音乐的播放位置
    changeTime: 0, // 指定播放时刻
    title: '', // 歌名
    artist: '', // 歌手
    picUrl: '', // 歌曲图片
    autoNext: true, // 用于自动触发
    lyric: [], // 未处理的歌词
    tempList: {}, // 单个歌单信息
    listIndex: null, // 当前歌曲在歌单中的位置
    volume: 100, // 音量
    loginIn: false, // 用户是否已经登陆
    userId: '', // 用户id
    username: '', // 用户账号
    avatar: '' // 用户头像
  },
  getters: {
    isPlay: state => state.isPlay,
    url: state => state.url,
    id: state => state.id,
    activeName: state => {
      let activeName = state.activeName
      if (!activeName) {
        activeName = JSON.parse(window.sessionStorage.getItem('activeName'))
      }
      return activeName
    },
    showAside: state => {
      let showAside = state.showAside
      if (!showAside) {
        showAside = JSON.parse(window.sessionStorage.getItem('showAside'))
      }
      return showAside
    },
    listOfSongs: state => {
      let listOfSongs = state.listOfSongs
      if (!listOfSongs.length) {
        listOfSongs = JSON.parse(window.sessionStorage.getItem('listOfSongs') || null)
      }
      return listOfSongs
    },
    duration: state => {
      let duration = state.duration
      if (!duration) {
        duration = JSON.parse(window.sessionStorage.getItem('duration'))
      }
      return duration
    },
    curTime: state => {
      let curTime = state.curTime
      if (!curTime) {
        curTime = JSON.parse(window.sessionStorage.getItem('curTime'))
      }
      return curTime
    },
    changeTime: state => {
      let changeTime = state.changeTime
      if (!changeTime) {
        changeTime = JSON.parse(window.sessionStorage.getItem('changeTime'))
      }
      return changeTime
    },
    title: state => {
      let title = state.title
      if (!title) {
        title = JSON.parse(window.sessionStorage.getItem('title'))
      }
      return title
    },
    artist: state => {
      let artist = state.artist
      if (!artist) {
        artist = JSON.parse(window.sessionStorage.getItem('artist'))
      }
      return artist
    },
    picUrl: state => {
      let picUrl = state.picUrl
      if (!picUrl) {
        picUrl = JSON.parse(window.sessionStorage.getItem('picUrl'))
      }
      return picUrl
    },
    autoNext: state => {
      let autoNext = state.autoNext
      if (!autoNext) {
        autoNext = JSON.parse(window.sessionStorage.getItem('autoNext'))
      }
      return autoNext
    },
    lyric: state => {
      let lyric = state.lyric
      if (!lyric.length) {
        lyric = JSON.parse(window.sessionStorage.getItem('lyric'))
      }
      return lyric
    },
    tempList: state => {
      let tempList = state.tempList
      if (!tempList.length) {
        tempList = JSON.parse(window.sessionStorage.getItem('tempList'))
      }
      return tempList
    },
    listIndex: state => {
      let listIndex = state.listIndex
      listIndex = JSON.parse(window.sessionStorage.getItem('listIndex'))
      return listIndex
    },
    volume: state => {
      let volume = state.volume
      if (!volume) {
        volume = JSON.parse(window.sessionStorage.getItem('volume'))
      }
      return volume
    },
    loginIn: state => {
      let loginIn = state.loginIn
      if (!loginIn) {
        loginIn = JSON.parse(window.sessionStorage.getItem('loginIn'))
      }
      return loginIn
    },
    userId: state => {
      let userId = state.userId
      if (!userId) {
        userId = JSON.parse(window.sessionStorage.getItem('userId'))
      }
      return userId
    },
    username: state => {
      let username = state.username
      if (!username) {
        username = JSON.parse(window.sessionStorage.getItem('username'))
      }
      return username
    },
    avatar: state => {
      let avatar = state.avatar
      if (!avatar) {
        avatar = JSON.parse(window.sessionStorage.getItem('avatar'))
      }
      return avatar
    }
  },
  mutations: {
    setIsPlay: (state, isPlay) => { state.isPlay = isPlay },
    setUrl: (state, url) => { state.url = url },
    setId: (state, id) => { state.id = id },
    setActiveName: (state, name) => {
      state.activeName = name
      window.sessionStorage.setItem('activeName', JSON.stringify(name))
    },
    setShowAside: (state, showAside) => {
      state.showAside = showAside
      window.sessionStorage.setItem('showAside', JSON.stringify(showAside))
    },
    setListOfSongs: (state, listOfSongs) => {
      state.listOfSongs = listOfSongs
      window.sessionStorage.setItem('listOfSongs', JSON.stringify(listOfSongs))
    },
    setDuration: (state, duration) => {
      state.duration = duration
      window.sessionStorage.setItem('duration', JSON.stringify(duration))
    },
    setCurTime: (state, curTime) => {
      state.curTime = curTime
      window.sessionStorage.setItem('curTime', JSON.stringify(curTime))
    },
    setChangeTime: (state, changeTime) => {
      state.changeTime = changeTime
      window.sessionStorage.setItem('changeTime', JSON.stringify(changeTime))
    },
    setTitle: (state, title) => {
      state.title = title
      window.sessionStorage.setItem('title', JSON.stringify(title))
    },
    setArtist: (state, artist) => {
      state.artist = artist
      window.sessionStorage.setItem('artist', JSON.stringify(artist))
    },
    setPicUrl: (state, picUrl) => {
      state.picUrl = picUrl
      window.sessionStorage.setItem('picUrl', JSON.stringify(picUrl))
    },
    setAutoNext: (state, autoNext) => {
      state.autoNext = autoNext
      window.sessionStorage.setItem('autoNext', JSON.stringify(autoNext))
    },
    setLyric: (state, lyric) => {
      state.lyric = lyric
      window.sessionStorage.setItem('lyric', JSON.stringify(lyric))
    },
    setTempList: (state, tempList) => {
      state.tempList = tempList
      window.sessionStorage.setItem('tempList', JSON.stringify(tempList))
    },
    setListIndex: (state, listIndex) => {
      state.listIndex = listIndex
      window.sessionStorage.setItem('listIndex', JSON.stringify(listIndex))
    },
    setVolume: (state, volume) => {
      state.volume = volume
      window.sessionStorage.setItem('volume', JSON.stringify(volume))
    },
    setLoginIn: (state, loginIn) => {
      state.loginIn = loginIn
      window.sessionStorage.setItem('loginIn', JSON.stringify(loginIn))
    },
    setUserId: (state, userId) => {
      state.userId = userId
      window.sessionStorage.setItem('userId', JSON.stringify(userId))
    },
    setUsername: (state, username) => {
      state.username = username
      window.sessionStorage.setItem('username', JSON.stringify(username))
    },
    setAvatar: (state, avatar) => {
      state.avatar = avatar
      window.sessionStorage.setItem('avatar', JSON.stringify(avatar))
    }
  }
})

export default store
