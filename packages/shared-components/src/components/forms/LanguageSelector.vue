<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api'
import { BFormSelect } from 'bootstrap-vue'

import { languageOptions, Language } from '@readapt/settings'

const LanguageSelector = defineComponent({
  components: { BFormSelect },
  props: {
    value: { type: String as PropType<Language>, required: true }
  },
  setup(_, { emit }) {
    const onLanguageChange = (value: string) => emit('change', value)

    return { languageOptions, onLanguageChange }
  }
})
export default LanguageSelector
</script>

<template>
  <label>
    {{ $t('SELECT_TEMPLATE.PROFILE_LANGUAGE') }}
    <b-form-select :options="languageOptions" :value="value" @change="onLanguageChange" />
  </label>
</template>
