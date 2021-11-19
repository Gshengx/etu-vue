<template>
  <span :style="style" :class="`iconfont icon-${name}`"></span>
</template>
<script>
export default {
  props: {
    name: {
      default: '',
      type: String,
    },
    style: {
      default: () => {},
      type: Object,
    },
  },
}
</script>
<style lang="less" scoped>
.iconfont {
  font-size: 64px;
}
</style>
