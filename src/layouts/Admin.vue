<template>
  <div class="layouts-outside-div">
    <header-bar :fixed="true"></header-bar>
    <div class="admin-content">
      <nav-menu-bar :menuList="menuList" class="nav-menu-bar"></nav-menu-bar>
      <slot/>
    </div>
  </div>
</template>

<script>
import HeaderBar from '@/components/HeaderBar'
import NavMenuBar from '@/components/public/nav-menu-bar'

export default {
  components: {
    NavMenuBar,
    HeaderBar
  },
  data () {
    return {
      menuList: [
        {
          label: '示例菜单',
          icon: 'iconlishiziliao',
          path: '/example',
          children: [
            {
              label: '示例',
              path: '/example/example-route'
            }
          ]
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.admin-content{
  // min-width: 1080px;
  box-sizing: border-box;
  height: 100%;
  position: relative;
  .nav-menu-bar{
    float: left;
    width: 200px;
    padding-top: 120px;
  }
}
</style>
<style lang="scss">
@import '@/styles/index.scss';
.admin-content{
  >div{
    &:nth-child(2){
      padding: 16px;
      height: 100%;
      box-sizing: border-box;
      background: $primary-bg-color;
      overflow-x: auto;
    }
  }
}
</style>
