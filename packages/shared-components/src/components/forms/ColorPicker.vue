<script lang="ts">
import { defineComponent, ref, PropType } from 'vue'
import { BModal } from 'bootstrap-vue'
import { colors } from '@readapt/settings'

const ColorPicker = defineComponent({
  components: { BModal },
  props: {
    value: { type: String, default: '' },
    colors: { type: Array as PropType<string[]>, default: () => colors }
  },
  setup(_, { emit }) {
    const shouldShowPicker = ref(false)

    const showPicker = () => (shouldShowPicker.value = true)

    const selectColor = (value?: string): void => {
      shouldShowPicker.value = false
      emit('selectColor', value)
    }

    return { shouldShowPicker, showPicker, selectColor }
  }
})

export default ColorPicker
</script>

<template>
  <div>
    <button
      @click="showPicker"
      class="btn color-picker-circle rounded-circle"
      :class="{ 'default-color': !value }"
      :style="{ backgroundColor: value ? `${value}` : '' }"
    />
    <b-modal ref="color-modal" v-model="shouldShowPicker" hide-footer hide-header>
      <div class="color-modal">
        <template v-for="color in colors">
          <button
            class="btn btn-outline-primary color-picker-circle rounded-circle content-center m-2"
            :key="color"
            :style="{ backgroundColor: `${color}` }"
            :class="{ 'active-color': color === value }"
            @click="selectColor(color)"
          />
        </template>

        <button
          class="btn color-picker-circle rounded-circle content-center default-color m-2"
          :class="{ 'active-color': !value }"
          @click="selectColor()"
        />
      </div>
    </b-modal>
  </div>
</template>

<style lang="scss" scoped>
.color-picker-circle {
  width: 38px !important;
  height: 38px !important;
  border: 1px solid black !important;
}

.color-modal {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.active-color {
  outline: black solid 4px !important;
  outline-offset: 3px;
}

.default-color {
  background-image: url('../../assets/default-color.png') !important;
  background-size: 100%;
}
</style>
