<template>
  <div class="card-list">
    <table border="0">
      <thead>
        <tr>
          <td v-for="(item, index) in columns" :key="index">{{item.label}}</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in listData" :key="index">
          <td v-for="(i, k) in columns" :key="k">
            {{item[i.prop]}}
          </td>
        </tr>
        <div>
          <tr v-for="(item, index) in listData" :key="index">
            <td v-for="(i, k) in columns" :key="k">
              {{item[i.prop]}}
            </td>
          </tr>
        </div>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    columns: {
      default: () => []
    },
    listData: {
      default: () => []
    }
  }
}
</script>

<style lang="scss" scoped>
.card-list{
  >table{
    width: 100%;
    table-layout: fixed;
  }
}
</style>
