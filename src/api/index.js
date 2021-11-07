import axios from 'axios'
import { post, get } from './http'

// 添加歌手
export const setSinger = (params) => post(`singer/add`, params)

// 查询歌手
export const getAllSinger = () => get(`singer/allSinger`)

// 根据歌手id查询歌手
export const getSinger = (id) => get(`singer/selectByPrimaryKey?id=${id}`)

// 更新歌手
export const updateSinger = (params) => post(`singer/update`, params)

// 删除歌手
export const delSinger = (id) => get(`singer/delete?id=${id}`)

// =============== 歌曲相关=================

// 查询歌单
export const getAllSong = () => get(`song/allSong`)

// 根据歌手id查询歌曲
export const songOfSingerId = (id) => get(`song/singer/detail?id=${id}`)

// 根据歌曲id查询歌曲
export const songOfSongId = (songId) => get(`song/detail?songId=${songId}`)

// 根据歌曲名字查询歌曲
export const songOfSongName = (songName) => get(`song/songName/detail?songName=${songName}`)

// 根据歌曲id查询歌曲简单信息
export const songVOOfSongId = (songId) => get(`song/detailVO?songId=${songId}`)

// 根据歌手模糊名查找歌曲
export const songLikeSingerName = (singerName) => get(`song/singerName/detail?singerName=${singerName}`)

// =============== 歌单相关=================

// 添加歌单
export const setSongList = (params) => post(`songList/add`, params)

// 查询歌单
export const getAllSongList = () => get(`songList/allSongList`)

// 查询歌单歌曲详情
export const getSongListDetail = (songListId) => get(`listSong/detail?songListId=${songListId}`)

// =============== 用户相关 =================

// 添加用户
export const signUp = (params) => post(`consumer/add`, params)

// 查询用户
export const getAllConsumer = () => get(`consumer/allConsumer`)

// 根据用户id查询用户
export const getConsumer = (id) => get(`consumer/selectByPrimaryKey?id=${id}`)

// 登陆
export const loginIn = (params) => post(`/consumer/login`, params)

// 下载音乐
export const download = (url) => axios({
  method: 'get',
  url: url,
  responseType: 'blob'
})
