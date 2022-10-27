<script lang="ts">
import { defineComponent, ref } from 'vue'
import { BButton } from 'bootstrap-vue'

import SettingsLeaveConfirmation from '../modals/SettingsLeaveConfirmation.vue'

const SaveSetting = defineComponent({
  components: { BButton, SettingsLeaveConfirmation },
  props: {
    isSettingsDirty: { type: Boolean, default: false }
  },
  setup(props, { emit }) {
    const shouldShowModal = ref(false)

    const closeSettings = () => {
      if (props.isSettingsDirty) {
        shouldShowModal.value = true
      } else {
        emit('close-settings')
      }
    }
    const onConfirm = () => {
      shouldShowModal.value = false
      emit('close-settings')
    }
    const onCancel = () => (shouldShowModal.value = false)

    return {
      shouldShowModal,
      closeSettings,
      onConfirm,
      onCancel
    }
  }
})
export default SaveSetting
</script>

<template>
  <div>
    <b-button size="sm" variant="outline-primary" @click="closeSettings"> {{ $t('SETTINGS.CLOSE') }}</b-button>
    <template v-if="shouldShowModal && isSettingsDirty">
      <SettingsLeaveConfirmation @confirm="onConfirm" @cancel="onCancel" />
    </template>
  </div>
</template>
