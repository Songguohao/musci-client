<template>
  <transition name="slide-fade">
    <div class="the-aside" v-if="showAside">
      歌单列表
    </div>
  </transition>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: 'TheAside',
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'showAside'
    ])
  },
  mounted () {
    let that = this
    document.addEventListener('click', function () {
      that.$store.commit('setShowAside', false)
    }, true)
  },
  components: {

  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/the-aside.scss'
</style>
