<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { BButton, BCard, BCardText } from 'bootstrap-vue'
import { AdaptContainer } from '@readapt/shared-components'
import { SettingsTemplate } from '@/interfaces/settingsTemplate'
import { adaptHtmlElementAsyncFn } from '@/features/textAdaptationPreview'

const TemplateSelectorOption = defineComponent({
  components: { BButton, BCard, BCardText, AdaptContainer },
  props: {
    name: { type: String, required: true },
    template: { type: Object as PropType<SettingsTemplate>, required: true }
  },
  setup(props, { emit }) {
    const templateContent = computed(() => `<p>${props.template.content}</p>`)

    const onModify = () => emit('modify', props.template.settings)

    return { templateContent, onModify, adaptHtmlElementAsyncFn }
  }
})
export default TemplateSelectorOption
</script>

<template>
  <b-card>
    <b-card-text>
      <div class="option-header">
        <strong class="mb-2">{{ template.name }}</strong>
        <b-button size="sm" variant="primary" @click="onModify()">{{ $t('SELECT_TEMPLATE.MODIFY') }}</b-button>
      </div>

      <ul>
        <template v-for="description of template.descriptions">
          <li :key="description">{{ description }}</li>
        </template>
      </ul>
    </b-card-text>

    <AdaptContainer
      class="template-preview"
      :adapt-html-element-async="adaptHtmlElementAsyncFn()"
      :content-to-adapt="templateContent"
      :settings="template.settings"
      :scope="template.value"
    />
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
