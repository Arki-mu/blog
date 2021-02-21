<template>
  <div>Edit 文章修改</div>
</template>

<script>
// 当前路由是动态路由
export default {
  props: {
    aid: {
      // 接收来自路由的ID传参，也可以接受来自父组件的数值
      type: [Number, String],
    },
  },
};
</script>

<style>
</style>