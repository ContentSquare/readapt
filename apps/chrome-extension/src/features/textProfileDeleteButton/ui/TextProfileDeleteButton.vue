<script lang="ts" setup>
import { useTextPreferences, type TextProfileId } from '@/entities/textPreferences'
import { useI18n } from 'vue-i18n-composable'

const props = defineProps<{
  value: TextProfileId | null
}>()

const emit = defineEmits<{
  (event: 'input', profileId: TextProfileId | null): void
}>()

const { deleteProfile } = useTextPreferences()
const { t } = useI18n()

const onClick = async () => {
  if (confirm(t('SETTINGS.PROFILE_DELETE_CONFIRM'))) {
    deleteProfile(props.value)
    emit('input', null)
    alert(t('SETTINGS.PROFILE_DELETED'))
  }
}
</script>
<template>
  <button class="btn-warning btn-sm btn" v-if="value" data-test-id="delete" @click="onClick">{{ $t('SETTINGS.DELETE') }}</button>
</template>
