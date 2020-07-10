<template>
  <div id="only-header">
    <header-bar :fixed="true"></header-bar>
    <slot/>
  </div>
</template>

<script>
import HeaderBar from '@/components/HeaderBar'

export default {
  components: {
    HeaderBar
  }
}
</script>

<style scoped>
#only-header{
  /* min-width: 1080px; */
  height: 100%;
  padding-top: 60px;
  box-sizing: border-box;
}
</style>
