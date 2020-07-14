<template>
  <div id="example-container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item
        v-for="(item,index) in breadList"
        :key="index"
        @click.native="breadcrumbClick(item, index)"
      >{{item.title}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  data () {
    return {
      breadList: [] // 路由集合
    }
  },
  watch: {},
  computed: {},
  mounted () {
    this.getBreadcrumb()
  },
  methods: {
    breadcrumbClick (item, index) {
      if (index === this.breadList.length - 1) {
        return
      }
      this.$router.push(item.path)
    },
    getBreadcrumb () {
      let matched = this.$route.matched
      let res = []
      for (const key in matched) {
        // if (matched.hasOwnProperty(key)) {
        if (Object.prototype.hasOwnProperty.call(matched, key)) {
          const element = matched[key]
          const title = element.meta.title
          // if (!title) {
          //   res = []
          //   break
          // }
          res.push({
            path: element.path,
            title
          })
        }
      }
      this.breadList = res
    }
  }
}
</script>

<style lang="scss">
@import '@/styles/index.scss';
#example-container{
  background: $primary-bg-color;
  .el-breadcrumb__inner {
    text-decoration: none;
    -webkit-transition: color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    transition: color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    color: $sedondary-text-color;
  }
  .el-breadcrumb__inner:hover {
    color: $sedondary-text-color;
    cursor: pointer;
  }
  .el-breadcrumb__item:last-child{
    .el-breadcrumb__inner{
      font-weight: normal;
    }
  }
}
</style>
