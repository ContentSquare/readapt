<script lang="ts" setup>
import { computed } from 'vue'
import { BButton, BCard, BCardText } from 'bootstrap-vue'
import AdaptContainer from '@/shared/ui/AdaptContainer.vue'
import type { SettingsTemplate } from '../model/settingsTemplate'
import { adaptHtmlElementAsyncFn } from '@/shared/lib/textAdaptation'
import { useI18n } from 'vue-i18n-composable'

interface Props {
  name: string
  template: SettingsTemplate
}
const props = defineProps<Props>()

const templateContent = computed(() => `<p>${props.template.content}</p>`)
const { t } = useI18n()
</script>

<template>
  <b-card>
    <b-card-text>
      <div class="option-header">
        <strong class="mb-2">{{ template.name }}</strong>
        <b-button size="sm" variant="primary" @click="onModify()">{{ t('SELECT_TEMPLATE.MODIFY') }}</b-button>
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
