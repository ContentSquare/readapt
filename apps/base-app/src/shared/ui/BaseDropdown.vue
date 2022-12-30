<script lang="ts" setup></script>
<template>
  <select
    v-bind="$attrs"
    v-on="$listeners"
    class="rounded-4 border-1 border-gray-base px-1.5 py-1 text-body-button text-gray-base hover:border-gray-darker-10"
    data-test-id="dropdown"
  >
    <slot />
  </select>
</template>
