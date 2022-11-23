<script setup lang="ts">
import { TextAdaptationProfile } from '../model/TextAdaptationProfile'

interface Props {
  profiles: TextAdaptationProfile[]
}

const props = defineProps<Props>()
</script>
<template>
  <select data-test-id="dropdown">
    <option value="">New Profile</option>
    <option v-for="({ name, id }, index) in props.profiles" :key="index" :value="id">
      {{ name }}
    </option>
  </select>
</template>
