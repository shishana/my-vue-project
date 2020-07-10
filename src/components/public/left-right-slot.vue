<template>
  <div class="left-right-slot">
    <div class="left-right-slot-left">
      <slot name="left"></slot>
    </div>
    <div class="left-right-slot-right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
$border-color: #aaa;
.left-right-slot{
  height: 100%;
  display: flex;
  // border: 1px solid $border-color;
  .left-right-slot-left{
    width: 200px;
    border-right: 1px solid $border-color;
  }
  .left-right-slot-right{
    width: 1px;
    flex: auto;
  }
}
</style>
