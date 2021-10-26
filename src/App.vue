<template>
  <div>
    <TheHeader></TheHeader>
    <router-view/>
    <SongAudio v-show="false"/>
    <TheAside></TheAside>
    <PlayBar/>
    <ScrollTop></ScrollTop>
    <TheFooter></TheFooter>
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader'
import ScrollTop from '@/components/ScrollTop'
import TheFooter from '@/components/TheFooter'
import SongAudio from '@/components/SongAudio'
import PlayBar from '@/components/PlayBar'
import TheAside from '@/components/TheAside'
export default {
  name: 'App',
  components: {
    SongAudio,
    TheHeader,
    ScrollTop,
    TheFooter,
    PlayBar,
    TheAside
  }
}
</script>

<style>

</style>
