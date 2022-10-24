<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount } from 'vue'
import { BButton, BModal } from 'bootstrap-vue'

const SettingsLeaveConfirmation = defineComponent({
  components: { BButton, BModal },
  setup(_, { emit }) {
    const shouldShowModal = ref(false)
    const onConfirm = () => emit('confirm')
    const onCancel = () => emit('cancel')

    onMounted(() => (shouldShowModal.value = true))
    onBeforeUnmount(() => (shouldShowModal.value = false))

    return { shouldShowModal, onConfirm, onCancel }
  }
})
export default SettingsLeaveConfirmation
</script>

<template>
  <b-modal v-model="shouldShowModal" class="m-4" hide-footer hide-header>
    <div class="m-4 justify-content-start">
      <h4>
        {{ $t('SETTINGS.ARE_YOU_SURE') }}
      </h4>
      <p class="">{{ $t('SETTINGS.LEAVE_UNSAVED_CHANGES') }}</p>
      <div class="p-2 bg-grey d-flex justify-content-start">
        <b-button size="sm" class="ml-1" variant="primary" @click="onConfirm">
          {{ $t('SETTINGS.YES_CLOSE') }}
        </b-button>
        <b-button size="sm" class="ml-1" variant="outline-primary" @click="onCancel">
          {{ $t('SETTINGS.NO_STAY') }}
        </b-button>
      </div>
    </div>
  </b-modal>
</template>

<style lang="css">
.bg-grey {
  background-color: #f6f7f9;
}
</style>
