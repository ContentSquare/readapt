<script lang="ts">
import { defineComponent, ref } from 'vue'
import { BButton } from 'bootstrap-vue'

import SettingsSaveConfirmation from '../modals/SettingsSaveConfirmation.vue'

const SaveSetting = defineComponent({
  components: { BButton, SettingsSaveConfirmation },
  setup(_, { emit }) {
    const shouldShowModal = ref(false)

    const saveSettings = () => {
      emit('save-settings')
      shouldShowModal.value = true
    }
    const closeModal = () => (shouldShowModal.value = false)

    return {
      shouldShowModal,
      saveSettings,
      closeModal
    }
  }
})
export default SaveSetting
</script>

<template>
  <div>
    <b-button size="sm" variant="primary" @click="saveSettings">{{ $t('SETTINGS.SAVE') }}</b-button>
    <template v-if="shouldShowModal">
      <SettingsSaveConfirmation @confirm="closeModal" />
    </template>
  </div>
</template>
