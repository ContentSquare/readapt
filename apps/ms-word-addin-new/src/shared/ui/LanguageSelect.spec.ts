import { mount } from '@vue/test-utils'
import LanguageSelect from './LanguageSelect.vue'
import { type Language, languageOptions } from '@readapt/settings'

describe('LanguageSelect', () => {
  type FactoryProps = {
    modelValue?: Language
  }
  const factory = ({ modelValue = 'en' }: FactoryProps = {}) => {
    const wrapper = mount(LanguageSelect, {
      props: {
        modelValue
      }
    })
    const select = wrapper.find<HTMLSelectElement>('select')

    return { wrapper, select }
  }
  it('should render languages as options', () => {
    const { select } = factory()

    for (const { value, text } of languageOptions) {
      expect(select.find(`option[value="${value}"]`).text()).toBe(text)
    }
  })

  it('should set select value from "value" prop', () => {
    const language: Language = 'fr'
    const { select } = factory({ modelValue: language })

    expect(select.element.value).toBe(language)
  })

  describe('when language changes', () => {
    it('should emit "update:modelValue " with the new language', async () => {
      const newLanguage: Language = 'fr'
      const { wrapper, select } = factory()

      await select.setValue(newLanguage)

      expect(wrapper.emitted('update:modelValue')).toEqual([[newLanguage]])
    })
  })
})
