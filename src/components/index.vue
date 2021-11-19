<template>
  <div class="router">
    <div>路由跳转页</div>
    <div class="router-list">
      <a v-for="link in linkList" :key="link.name" @click="handleRoute(link.path)">
        {{ link.name }}
      </a>
    </div>
  </div>
</template>
<script>
import router from '../router'

export default {
  data() {
    return {
      linkList: router,
    }
  },
  methods: {
    handleRoute(path) {
      window.location.href = window.location.origin + path
    },
  },
}
</script>
<style>
.router {
  padding: 20px;
  font-size: 20px;
  text-align: left;
}
.router-list {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}
</style>
