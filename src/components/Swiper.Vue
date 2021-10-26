<template>
  <div class="swiper">
    <el-carousel :interval="4000" type="card" height="380px">
      <el-carousel-item v-for="(item, index) in swiperList" :key="index">
        <img :src="item.picImg" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import { swiperList } from '../assets/data/swiper.js'
export default {
  name: 'Swiper',
  data () {
    return {
      swiperList: []
    }
  },
  created () {
    this.swiperList = swiperList
  },
  mounted () {}
}
</script>
<style scoped>
/* @import url(); 引入css类 */
@import '../assets/css/swiper.scss'
</style>
