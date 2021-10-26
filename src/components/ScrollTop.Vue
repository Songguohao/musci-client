<template>
  <div class="scroll-top" @click="returnTop">
    <div class="box-in"></div>
  </div>
</template>

<script>
export default {
  name: 'ScrollTop',
  data () {
    return {}
  },
  // 生命周期 - 创建完成（访问当前this实例）
  created () {},
  // 生命周期 - 挂载完成（访问DOM元素）
  mounted () {},
  methods: {
    returnTop () {
      document.documentElement.scrollTop = document.body.scrollTop = 0
    }
  }
}
</script>
<style lang="scss" scoped>
/* @import url(); 引入css类 */
@import '../assets/css/scroll-top.scss'
</style>
