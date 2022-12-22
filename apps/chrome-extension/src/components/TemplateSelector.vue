<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { BCol, BRow } from 'bootstrap-vue'
import TemplateSelectorOption from './TemplateSelectorOption.vue'
import { SettingsTemplate } from '@/interfaces/settingsTemplate'

const TemplateSelector = defineComponent({
  components: { BCol, BRow, TemplateSelectorOption },
  props: {
    templates: { type: Array as PropType<SettingsTemplate[]>, required: true }
  },
  setup(_, { emit }) {
    const onModify = (value: SettingsTemplate) => emit('modify', value)

    return { onModify }
  }
})
export default TemplateSelector
</script>

<template>
  <b-row>
    <template v-for="template in templates">
      <b-col class="mt-2" lg="6" sm="12" md="12" :key="template.value">
        <TemplateSelectorOption name="template-radio-field" :template="template" @modify="onModify" />
      </b-col>
    </template>
  </b-row>
</template>
