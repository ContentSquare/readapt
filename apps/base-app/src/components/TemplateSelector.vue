<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import { BCol, BRow } from 'bootstrap-vue'
import TemplateSelectorOption from './TemplateSelectorOption.vue'
import type { SettingsTemplate } from '@/interfaces/settingsTemplate'

const TemplateSelector = defineComponent({
  components: { BCol, BRow, TemplateSelectorOption },
  props: {
    templates: { type: Array as PropType<SettingsTemplate[]>, required: true },
    value: { type: Object as PropType<SettingsTemplate>, required: true }
  },
  setup(_, { emit }) {
    const onChange = (value: SettingsTemplate) => emit('change', value)
    const onModify = (value: SettingsTemplate) => emit('modify', value)

    return { onChange, onModify }
  }
})
export default TemplateSelector
</script>

<template>
  <b-row>
    <template v-for="template in templates">
      <b-col class="mt-2" lg="6" sm="12" md="12" :key="template.value">
        <TemplateSelectorOption
          name="template-radio-field"
          :value="value ? value : templates[0]"
          :template="template"
          @change="onChange"
          @modify="onModify"
        />
      </b-col>
    </template>
  </b-row>
</template>
