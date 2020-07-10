<template>
  <div class="map-type-radio">
    <div
      class="map-type-radio__item"
      :class="{ 'map-type-radio__item--current': item.value === value }"
      :style="{ 'margin-left': index === 0 ? '' : gapLength + 'px' }"
      v-for="(item, index) in options"
      :key="item.value"
      @click="$emit('input', item.value)"
    >
      <img :src="item.img" alt="">
      <div class="map-type-radio__item-label">{{ item.label }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'map-type-radio',
  props: {
    value: {
      type: [Number, String]
    },
    options: {
      type: Array
    },
    gapLength: {
      type: [Array, Number],
      default: 29
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@/styles/index.scss";
  @at-root .map-type-radio {
    display: flex;
    .map-type-radio__item {
      position: relative;
      height: 57px;
      width: 80px;
      border: 2px solid $base-bg-color-lighter;
      border-radius: 3px;
      overflow: hidden;
      img {
        height: 100%;
        width: 100%;
      }
      .map-type-radio__item-label {
        position: absolute;
        top: 3px;
        left: 3px;
        height: 22px;
        width: 37px;
        line-height: 22px;
        text-align: center;
        font-size: 12px;
        background-color: $base-bg-color-lighter;
        color: $base-text-color;
        border-radius: 1px;
      }
      &.map-type-radio__item--current {
        border: 2px solid $primary-color;
        .map-type-radio__item-label {
          background-color: $primary-color;
          color: #fff;
        }
      }
    }
  }
</style>
