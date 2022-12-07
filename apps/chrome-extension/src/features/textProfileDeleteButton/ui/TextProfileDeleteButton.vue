<script lang="ts" setup>
import { useTextPreferences, TextProfileId } from '@/entities/textPreferences'
import { BButton } from 'bootstrap-vue'
import { useI18n } from 'vue-i18n-composable'

const props = defineProps<{
  value: TextProfileId | null
}>()

const emit = defineEmits<{
  (event: 'input', profileId: TextProfileId | null): void
}>()

const { deleteProfile } = useTextPreferences()

const onClick = async () => {
  if (confirm('Are you sure you want to delete this profile? This is irreversible.')) {
    deleteProfile(props.value)
    emit('input', null)
    alert('The profile has been deleted')
  }
}
</script>
<template>
  <b-button v-if="props.value" data-test-id="delete" size="sm" variant="danger" @click="onClick"> {{ $t('SETTINGS.DELETE') }}</b-button>
</template>
