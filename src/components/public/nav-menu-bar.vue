<template>
  <div id="navBar" class="navBar">
    <el-scrollbar class="navBar-scroll">
      <el-menu
        v-if="menuList && menuList.length > 0"
        class="cus-el-menu"
        router
        :collapse="collapse"
        :default-active="defaultActive"
        background-color="transparent"
        text-color="#ffffff99"
        active-text-color="#fff"
      >
        <template v-for="(item, index) in menuList">
          <!-- 多层菜单 -->
          <el-submenu v-if="item.submenus || item.children" :key="'submenu' + index" :index="item.path">
            <template slot="title">
              <!-- <i :class="'ba-ic-' + item.icon" class="iconfont menu-icon"></i> -->
              <svg class="iconfont-symbol" aria-hidden="true">
                <use :xlink:href="'#' + item.icon"></use>
              </svg>
              <span slot="title" style="padding-left:8px">{{item.label}}</span>
            </template>
            <el-submenu v-for="(submenusItem, submenusIndex) in item.submenus" :key="'submenu-sub' + submenusIndex" :index="item.path">
              <span slot="title">{{submenusItem.label}}</span>
              <el-menu-item v-for="(childrenItem, childrenIndex) in submenusItem.children" :key="'submenu-item' + childrenIndex" :index="childrenItem.path">
                {{childrenItem.label}}
              </el-menu-item>
            </el-submenu>
            <el-menu-item v-for="(item, index) in item.children" :key="'menu-item' + index" :index="item.path">
              {{item.label}}
            </el-menu-item>
          </el-submenu>
          <!-- 只有第一级的菜单 -->
          <el-menu-item v-if="!item.submenus && !item.children" :key="'menu-item' + index" :index="item.path">
            <i :class="'ba-ic-' + item.icon" class="iconfont menu-icon"></i>
            <span slot="title">{{item.label}}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script>
export default {
  props: {
    collapse: {
      default: false
    },
    menuList: {
      default: () => []
    }
  },
  data () {
    return {
      defaultActive: ''
    }
  },
  mounted () {
    this.getDefaultActive()
  },
  computed: {
  },
  methods: {
    getDefaultActive () {
      let { path } = this.$route
      this.defaultActive = path
    }
  },
  watch: {
    $route (to) {
      this.defaultActive = to.path
    }
  }
}
</script>

<style scoped lang="scss">
.navBar {
  background:linear-gradient(270deg,rgba(31,51,82,1) 0%,rgba(5,30,63,1) 100%);
  height: 100%;
  z-index: 2000;
  user-select: none;
  .navBar-scroll{
    height: 100%;
  }
  .el-menu{
    border: none;
    // &:not(.el-menu--collapse){
    //   width: 267px;
    // }
  }
  .el-menu--collapse{
    width: 50px;
  }
}
.menu-icon {
  font-style: normal;
  font-size: 16px;
  width: 40px;
  margin-right: 16px;
  height: 40px;
  line-height: 40px;
}
.iconfont-symbol{
  opacity: .6;
}
</style>
<style lang="scss">
#navBar{
  .cus-el-menu{
    >.el-submenu{
      &.is-active{
        >.el-submenu__title{
          background: #273D5E !important;
          color: #fff !important;
          .iconfont-symbol{
            opacity: 1;
          }
          &::after{
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            height: auto;
            width: 5px;
            background: #176AD3;
          }
          >i{
            color: #fff !important;
          }
        }
      }
      >.el-submenu__title{
        padding: 0 15px 0 25px !important;
        &:hover{
          background: #273D5E !important;
        }
      }
      >.el-menu{
        >li.is-active{
          >.el-submenu__title{
            background: #001325 !important;
            color: #1890FF !important;
            >i{
              color: #1890FF !important;
            }
          }
        }
      }
      .el-menu-item{
        padding-left: 49px !important;
      }
    }
    .el-menu-item:hover{
      background: linear-gradient(270deg,rgba(18,62,130,1) 0%,rgba(23,106,211,1) 100%) !important;
      color: #fff !important;
    }
    .el-menu-item.is-active{
      background: linear-gradient(270deg,rgba(18,62,130,1) 0%,rgba(23,106,211,1) 100%) !important;
    }
  }
}
</style>
