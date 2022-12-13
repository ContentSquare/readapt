<script lang="ts" setup>
import { useSetup } from '../model/useSetup'

useSetup()
</script>

<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

html {
  min-width: 600px;
}
</style>
