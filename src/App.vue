<template>
  <div id="app">
    <el-container>
      <el-header height="100">
        <header-menu />
      </el-header>
      <el-main>
        <tabs-container />
      </el-main>
    </el-container>
  </div>
</template>

<script>
import HeaderMenu from '@/components/HeaderMenu.vue';
import TabsContainer from '@/components/TabsContainer.vue';

export default {
  components: {
    'header-menu': HeaderMenu,
    'tabs-container': TabsContainer,
  },
};
</script>

<style>
#app {
  text-align: center;
}
</style>
