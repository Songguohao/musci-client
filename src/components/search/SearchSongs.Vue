<template>
  <div class="search-songs">
    <AlbumContent :songList='listOfSongs'></AlbumContent>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { mixin } from '../../mixins'
import AlbumContent from '../AlbumContent'
export default {
  name: 'SearchSongs',
  mixins: [mixin],
  data () {
    return {}
  },
  components: {
    AlbumContent
  },
  computed: {
    ...mapGetters([
      'listOfSongs'
    ])
  },
  // 生命周期 - 创建完成（访问当前this实例）
  created () {},
  // 生命周期 - 挂载完成（访问DOM元素）
  mounted () {
    this.getSong()
  },
  watch: {
    $route () {
      this.getSong()
    }
  }
}
</script>
<style lang='scss' scoped>
/* @import url(); 引入css类 */
@import '../../assets/css/search-songs.scss'
</style>
