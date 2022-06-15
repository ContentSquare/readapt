<script lang="ts">
import { defineComponent, onMounted, onBeforeUnmount, ref } from '@vue/composition-api'
import { BButton, BModal } from 'bootstrap-vue'

const SettingsSaveConfirmation = defineComponent({
  components: { BButton, BModal },
  setup(_, { emit }) {
    const shouldShowModal = ref(false)
    const onConfirm = () => emit('confirm')

    onMounted(() => (shouldShowModal.value = true))
    onBeforeUnmount(() => (shouldShowModal.value = false))

    return { shouldShowModal, onConfirm }
  }
})
export default SettingsSaveConfirmation
</script>

<template>
  <b-modal v-model="shouldShowModal" @hidden="onConfirm" class="m-4" hide-footer hide-header>
    <div class="m-4 justify-content-start">
      <h4>
        {{ $t('SETTINGS.CONFIRMATION_TITLE') }}
      </h4>
      <p class="">{{ $t('SETTINGS.CONFIRMATION_MESSAGE') }}</p>
      <div class="p-2 bg-grey">
        <b-button size="sm" variant="primary" @click="onConfirm"> {{ $t('SETTINGS.OK') }}</b-button>
      </div>
    </div>
  </b-modal>
</template>

<style lang="css">
.bg-grey {
  background-color: #f6f7f9;
}
</style>
