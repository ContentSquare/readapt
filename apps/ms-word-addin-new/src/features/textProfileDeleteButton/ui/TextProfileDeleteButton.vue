<script lang="ts" setup>
import { useTextPreferences, type TextProfileId } from '@/entities/textPreferences'
import { useI18n } from 'vue-i18n'
import { confirm, alert } from '@/shared/ui/dialog'
import { DialogWrapper } from 'vue3-promise-dialog'

const props = defineProps<{
  modelValue: TextProfileId | null
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', profileId: TextProfileId | null): void
}>()

const { deleteProfile } = useTextPreferences()
const { t } = useI18n()

const onClick = async () => {
  if (props.modelValue && (await confirm(t('SETTINGS.PROFILE_DELETE_CONFIRM')))) {
    deleteProfile(props.modelValue)
    emit('update:modelValue', null)
    await alert(t('SETTINGS.PROFILE_DELETED'))
  }
}
</script>
<template>
  <div>
    <DialogWrapper />
    <button v-if="modelValue" class="btn-warning btn-sm btn" data-test-id="delete" @click="onClick">{{ t('SETTINGS.DELETE') }}</button>
  </div>
</template>
