<script lang="ts" setup>
import { useTextPreferences, TextProfileId } from '@/entities/textPreferences'
import { Settings } from '@readapt/settings'
import { BButton } from 'bootstrap-vue'
import { nextTick } from 'vue'

const props = defineProps<{ profileId: TextProfileId | null }>()
</script>
<template>
  <b-button v-if="props.profileId" data-test-id="rename" size="sm" variant="primary">
    <!-- {{ $t('SETTINGS.SAVE') }} -->
    Rename
  </b-button>
</template>
