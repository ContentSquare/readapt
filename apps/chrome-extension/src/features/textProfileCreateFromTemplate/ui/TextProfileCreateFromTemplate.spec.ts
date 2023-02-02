import { shallowMount } from '@vue/test-utils'
import type { TextSettingsTemplate } from '@/entities/textSettingsTemplate'
import { textSettingsFixture as settings, useTextPreferences } from '@/entities/textPreferences'
import TextProfileCreateFromTemplate from './TextProfileCreateFromTemplate.vue'
import TextSettingsTemplatePreview from './TextSettingsTemplatePreview.vue'
import { nextTick } from 'vue'

describe('TextProfileCreateFromTemplate', () => {
  afterEach(() => {
    useTextPreferences().reset()
  })

  const templates: TextSettingsTemplate[] = [
    {
      name: 'name 1',
      content: 'Content',
      descriptions: [],
      value: 'value-1',
      settings
    },
    {
      name: 'name 2',
      content: 'Content',
      descriptions: [],
      value: 'value-2',
      settings
    }
  ]

  const factory = () => {
    const wrapper = shallowMount(TextProfileCreateFromTemplate, {
      props: { templates }
    })

    const previews = wrapper.findAllComponents(TextSettingsTemplatePreview)

    return { wrapper, previews }
  }

  it('should render template previews', () => {
    const { previews } = factory()

    templates.forEach((template, index) => {
      expect(previews[index].props('template')).toEqual(template)
    })
  })

  describe('when preview emits "modify"', () => {
    it('should create a text profile from template', async () => {
      const { preferences } = useTextPreferences()
      const { previews } = factory()

      await previews[0].vm.$emit('modify', templates[0].settings)

      expect(preferences.profiles).toHaveLength(1)
      expect(preferences.profiles[0].settings).toEqual(templates[0].settings)
    })

    it('should emit "created" with the newly created text profile id', async () => {
      const { wrapper, previews } = factory()

      await previews[0].vm.$emit('modify', templates[0].settings)

      await nextTick()

      expect(wrapper.emitted('created')).toEqual([[1]])
    })
  })
})
