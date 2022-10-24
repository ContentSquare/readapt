<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { BFormInput } from 'bootstrap-vue'
import { Option } from '@readapt/settings'

const RangeBar = defineComponent({
  components: { BFormInput },
  props: {
    options: { type: Array as PropType<Option[]>, required: true },
    value: { type: String, required: true }
  },
  setup(props, { emit }) {
    const min = '1'
    const max = computed(() => props.options.length.toString())

    const currentValue = computed(() => {
      const { options, value } = props
      const index = options.findIndex((option) => option.value === value)
      const currentIndex = index === -1 ? 0 : index
      return options[currentIndex].text as string
    })

    const onValueChange = (value: string): void => {
      const option = props.options[parseInt(value) - 1]
      emit('change', option.value)
    }

    return { min, max, currentValue, onValueChange }
  }
})
export default RangeBar
</script>

<template>
  <div>
    <div class="selected-value">{{ currentValue }}</div>
    <b-form-input type="range" :min="min" :max="max" step="1" :value="currentValue" @input="onValueChange" />
  </div>
</template>

<style lang="scss" scoped>
.selected-value {
  font-weight: bold;
  font-size: 15px;
}
</style>
