<script lang="ts">
import { computed, defineComponent, PropType, ref } from 'vue'
import { BIconClipboardPlus, VBTooltip } from 'bootstrap-vue'
import { encodeSettings, Settings } from '@readapt/settings'

const SettingsCode = defineComponent({
  props: {
    settings: { type: Object as PropType<Settings>, required: true }
  },
  components: {
    BIconClipboardPlus
  },
  directives: {
    VBTooltip
  },
  setup(props) {
    const copyLabel = ref<string>('COPY')

    const settingsCode = computed<string>(() => {
      return encodeSettings(props.settings)
    })

    const copyCode = (): Promise<void> => {
      copyLabel.value = 'COPIED'
      return navigator.clipboard.writeText(settingsCode.value)
    }

    const resetLabel = () => {
      setTimeout(() => {
        copyLabel.value = 'COPY'
      }, 300)
    }

    return { settingsCode, copyLabel, copyCode, resetLabel }
  }
})

export default SettingsCode
</script>

<template>
  <div class="d-flex justify-content-between">
    <div>{{ $t('SETTINGS_CODE.PREFERENCE_CODE') }}:</div>
    <div class="d-flex copy ml-4" @click="copyCode()" v-b-tooltip.hover.top :title="$t(copyLabel)" @mouseleave="resetLabel()">
      <div class="settings-code">
        <code>{{ settingsCode }}</code>
      </div>
      <div class="ml-2">
        <BIconClipboardPlus></BIconClipboardPlus>
      </div>
    </div>
  </div>
</template>

<style scoped>
.copy {
  cursor: pointer;
}

.settings-code {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 120px;
}
</style>
