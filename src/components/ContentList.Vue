<template>
  <div class="content-list">
    <ul class="section-content">
      <li class="content-item" v-for="(item, index) in contentList" :key="index">
        <div class="kuo">
          <img class="item-img" :src="attachImageUrl(item.img)">
          <div class="mask">
            <Icon class="icon" type="ios-play"></Icon>
          </div>
        </div>
        <p class="item-name">{{item.name||item.title}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { mixin } from '../mixins/index.js'
export default {
  mixins: [mixin],
  name: 'ContentList',
  props: ['contentList'],
  data () {
    return {}
  },
  // 生命周期 - 创建完成（访问当前this实例）
  created () {},
  // 生命周期 - 挂载完成（访问DOM元素）
  mounted () {
  }
}
</script>
<style lang='scss' scoped>
@import '../assets/css/content-list.scss'
</style>
