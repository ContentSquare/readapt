<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { BIconPlusCircle, BIconDashCircle } from 'bootstrap-vue'

import { Option } from '@readapt/settings'

const SelectPercentage = defineComponent({
  components: { BIconPlusCircle, BIconDashCircle },
  props: {
    options: { type: Array as PropType<Option[]>, required: true },
    value: { type: String, required: true }
  },
  setup(props, { emit }) {
    const currentIndex = computed(() => {
      const index = props.options.findIndex((option) => option.value === props.value)
      return index === -1 ? 0 : index
    })
    const currentValue = computed(() => props.options[currentIndex.value].text)
    const hasLessOptions = computed(() => currentIndex.value > 0)
    const hasMoreOptions = computed(() => currentIndex.value < props.options.length - 1)

    const onMinus = () => {
      if (hasLessOptions.value) {
        const value = props.options[currentIndex.value - 1].value
        emit('change', value)
      }
    }
    const onPlus = () => {
      if (hasMoreOptions.value) {
        const value = props.options[currentIndex.value + 1].value
        emit('change', value)
      }
    }

    const blabla = 'test'

    return {
      blabla,
      currentValue,
      hasLessOptions,
      hasMoreOptions,
      onMinus,
      onPlus
    }
  }
})
export default SelectPercentage
</script>

<template>
  <div class="d-flex justify-content-between align-items-center">
    <button @click="onMinus" class="float-left btn" :class="{ disabled: !hasLessOptions }" data-test-id="btn-minus">
      <b-icon-dash-circle font-scale="1.5" />
    </button>
    <div class="font-weight-bold text-center min-w-100">{{ $t(currentValue) }}</div>
    <button @click="onPlus" class="float-right btn" :class="{ disabled: !hasMoreOptions }" data-test-id="btn-plus">
      <b-icon-plus-circle font-scale="1.5" />
    </button>
  </div>
</template>

<style scoped>
.min-w-100 {
  min-width: 100px;
}
</style>
