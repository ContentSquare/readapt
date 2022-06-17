<script lang="ts">
import { defineComponent, PropType, ref } from '@vue/composition-api'
import { BButton, BCard, BCardText, BFormRadio } from 'bootstrap-vue'
import AdaptContainer from '@/components/AdaptContainer.vue'
import { SettingsTemplate } from '@/interfaces/settingsTemplate'

const TemplateSelectorOption = defineComponent({
  components: { BButton, BCard, BCardText, BFormRadio, AdaptContainer },
  props: {
    name: { type: String, required: true },
    value: { type: Object as PropType<SettingsTemplate>, required: true },
    template: { type: Object as PropType<SettingsTemplate>, required: true }
  },
  setup(props, { emit }) {
    const valueModel = ref(props.value)

    const isSelected = () => props.value.value === props.template.value

    const onSelect = (value: SettingsTemplate) => {
      valueModel.value = value
      emit('change', value)
    }

    const onChange = (value: SettingsTemplate) => emit('change', value)

    const onModify = () => emit('modify', props.template.settings)

    return { valueModel, isSelected, onSelect, onChange, onModify }
  }
})
export default TemplateSelectorOption
</script>

<template>
  <b-card :border-variant="isSelected() ? 'dark' : 'grey'" @click="onSelect(template)">
    <b-card-text>
      <div class="option-header">
        <b-form-radio v-model="valueModel" :name="name" :value="template" @change="onChange">
          <strong class="m-2">{{ template.name }}</strong>
        </b-form-radio>

        <b-button size="sm" variant="primary" @click="onModify()">{{ $t('SELECT_TEMPLATE.MODIFY') }}</b-button>
      </div>

      <ul>
        <template v-for="description of template.descriptions">
          <li :key="description">{{ description }}</li>
        </template>
      </ul>
    </b-card-text>

    <AdaptContainer class="template-preview" :content-to-adapt="template.content" :settings="template.settings" :scope="template.value" />
  </b-card>
</template>

<style lang="scss">
.option-header {
  display: flex;
  justify-content: space-between;
}

.template-preview {
  width: 320px;
}
</style>
