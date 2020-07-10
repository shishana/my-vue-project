<template>
  <div id="app">
      <component :is="layout">
        <keep-alive include="">
          <router-view/>
        </keep-alive>
      </component>
  </div>
</template>

<script>
const defaultLayout = 'fullPage'

export default {
  name: 'App',
  computed: {
    layout () {
      return (this.$route.meta.layout || defaultLayout) + '-layout'
    }
  }
}
</script>

<style lang="scss">
@import '@/styles/index.scss';
*{
  box-sizing: border-box;
}
#app {
  // min-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  font-family: 'PingFangSC-light', 'Microsoft YaHei', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*user-select: none;*/
  color: $default-text-color;
  font-size: 14px;
  .el-tooltip{
    outline: none !important;
  }
}
.el-select-dropdown{
  .el-scrollbar{
    .el-scrollbar__wrap{
      margin-bottom: 0 !important;
    }
  }
}
// el-table的整体样式调整
.el-table{
  thead{
    >tr{
      >th{
        padding: 10px 0 !important;
        background: rgb(250,250,250);
        .cell{
          color: $default-text-color;
        }
      }
    }
  }
  .cell{
    padding: 0 32px!important;
    text-align: center;
  }
  .gutter{
    background: #F5F7F8 !important;
  }
  .is-leaf{
    background: #F5F7F8 !important;
    font-weight: 600;
    font-size: 14px;
    border-right: 0;
  }
}
.el-pagination{
  .el-pagination__total, input, .number {
    font-size: 12px !important;
  }
  input{
    border-radius: 6px !important;
  }
  .btn-prev, .btn-next, .number, .el-icon-more{
    background: transparent !important;
    border-radius:6px !important;
    border:1px solid rgba(217,217,217,1) !important;
  }
  >button{
    margin-top: 2px !important;
    height: 26px !important;
  }
  .el-pager{
    padding-top: 2px;
    .number{
      font-weight: normal !important;
    }
    .active{
      background: $primary-color !important;
    }
    >li{
      height: 26px !important;
      line-height: 24px !important;
    }
  }
  .el-pagination__editor{
    width: 60px !important;
    height: 28px !important;
  }
}
.drawer{
  .el-drawer__header{
    margin-bottom: 0px;
  }
  .el-drawer__close-btn:focus, .el-drawer:focus, .el-drawer__header{
    outline: none !important;
    span:focus{
      outline: none !important;
    }
  }
}
</style>
