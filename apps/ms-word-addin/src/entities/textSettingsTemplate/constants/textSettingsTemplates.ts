import {
  buildDefaultSettings,
  colors,
  getLangConfig,
  lineSpacingOptions,
  opacityOptions,
  overrideDefaultLetters,
  overrideDefaultPhonemes,
  silentLetterOpacityOptions
} from '@readapt/settings'
import type { TextSettingsTemplate } from '@/entities/textSettingsTemplate'

const defaultSettingsEn = buildDefaultSettings('en')
const defaultSettingsFr = buildDefaultSettings('fr')
const textPreviewEn = getLangConfig('en').textPreview
const textPreviewFr = getLangConfig('fr').textPreview

export const textSettingsTemplates: TextSettingsTemplate[] = [
  {
    name: 'Template 1',
    descriptions: ['Alternate lines shaded', 'Silent letters greyed'],
    content: textPreviewEn,
    value: 'template-1-en',
    settings: {
      ...defaultSettingsEn,
      shadeAlternateLinesActive: true,
      shadeAlternateLinesOpacity: opacityOptions[1].value,
      silentLetterActive: true,
      silentLetterOpacity: silentLetterOpacityOptions[2].value,
      lineSpacing: lineSpacingOptions[1].value
    }
  },
  {
    name: 'Template 2',
    descriptions: ['Syllables colored', 'Silent letters greyed'],
    content: textPreviewEn,
    value: 'template-2-en',
    settings: {
      ...defaultSettingsEn,
      syllableActive: true,
      syllableColor1: colors[3],
      syllableColor2: colors[4],
      syllableOpacity: opacityOptions[1].value,
      silentLetterActive: true,
      silentLetterOpacity: silentLetterOpacityOptions[2].value
    }
  },
  {
    name: 'Template 3',
    descriptions: ['Mirror letters differentiated', 'Silent letters greyed'],
    content: textPreviewEn,
    value: 'template-3-en',
    settings: {
      ...defaultSettingsEn,
      shadeAlternateLinesActive: true,
      shadeAlternateLinesOpacity: opacityOptions[1].value,
      silentLetterActive: true,
      silentLetterOpacity: silentLetterOpacityOptions[2].value,
      lineSpacing: lineSpacingOptions[1].value,
      letters: overrideDefaultLetters('en', [
        { key: '2', value: 'd', bold: false, color: colors[0], active: true },
        { key: '8', value: 'm', bold: false, color: colors[1], active: true },
        { key: '7', value: 'n', bold: false, color: colors[2], active: true },
        { key: '3', value: 'p', bold: false, color: colors[3], active: true },
        { key: '1', value: 'b', bold: false, color: colors[4], active: true },
        { key: '24', value: 'w', bold: false, color: colors[7], active: true },
        { key: '19', value: 'u', bold: false, color: colors[8], active: true },
        { key: '4', value: 'q', bold: false, color: colors[11], active: true }
      ])
    }
  },
  {
    name: 'Template 4',
    descriptions: ['Similar phonemes differentiated', 'Silent letters greyed'],
    content: textPreviewEn,
    value: 'template-4-en',
    settings: {
      ...defaultSettingsEn,
      shadeAlternateLinesActive: true,
      shadeAlternateLinesOpacity: opacityOptions[1].value,
      silentLetterActive: true,
      silentLetterOpacity: silentLetterOpacityOptions[2].value,
      lineSpacing: lineSpacingOptions[1].value,
      phonemes: overrideDefaultPhonemes('en', [
        { key: '9', value: 'd', bold: false, color: colors[0], active: true },
        { key: '15', value: 'g', bold: false, color: colors[1], active: true },
        { key: '14', value: 'f', bold: false, color: colors[2], active: true },
        { key: '27', value: 'p', bold: false, color: colors[3], active: true },
        { key: '31', value: 't', bold: false, color: colors[4], active: true },
        { key: '20', value: 'k', bold: false, color: colors[7], active: true },
        { key: '35', value: 'v', bold: false, color: colors[8], active: true },
        { key: '8', value: 'ch', bold: false, color: colors[9], active: true },
        { key: '19', value: 'jh', bold: false, color: colors[10], active: true },
        { key: '7', value: 'b', bold: false, color: colors[11], active: true }
      ])
    }
  },
  {
    name: 'Template 1',
    descriptions: ['Différenciation des lignes', 'Différenciation des lettres muettes'],
    content: textPreviewFr,
    value: 'template-1-fr',
    settings: {
      ...defaultSettingsFr,
      shadeAlternateLinesActive: true,
      shadeAlternateLinesOpacity: opacityOptions[1].value,
      silentLetterActive: true,
      silentLetterOpacity: silentLetterOpacityOptions[2].value,
      lineSpacing: lineSpacingOptions[1].value
    }
  },
  {
    name: 'Template 2',
    descriptions: ['Différenciation des syllabes', 'Différenciation des lettres muettes'],
    content: textPreviewFr,
    value: 'template-2-fr',
    settings: {
      ...defaultSettingsFr,
      syllableActive: true,
      syllableColor1: colors[3],
      syllableColor2: colors[4],
      syllableOpacity: opacityOptions[1].value,
      silentLetterActive: true,
      silentLetterOpacity: silentLetterOpacityOptions[2].value
    }
  },
  {
    name: 'Template 3',
    descriptions: ['Différenciation des lettres miroirs', 'Différenciation des lettres muettes'],
    content: textPreviewFr,
    value: 'template-3-fr',
    settings: {
      ...defaultSettingsFr,
      shadeAlternateLinesActive: true,
      shadeAlternateLinesOpacity: opacityOptions[1].value,
      silentLetterActive: true,
      silentLetterOpacity: silentLetterOpacityOptions[2].value,
      lineSpacing: lineSpacingOptions[1].value,
      letters: overrideDefaultLetters('fr', [
        { key: '2', value: 'd', bold: false, color: colors[0], active: true },
        { key: '7', value: 'm', bold: false, color: colors[1], active: true },
        { key: '6', value: 'n', bold: false, color: colors[2], active: true },
        { key: '3', value: 'p', bold: false, color: colors[3], active: true },
        { key: '1', value: 'b', bold: false, color: colors[4], active: true },
        { key: '27', value: 'w', bold: false, color: colors[7], active: true },
        { key: '5', value: 'u, ù', bold: false, color: colors[8], active: true },
        { key: '4', value: 'q', bold: false, color: colors[11], active: true }
      ])
    }
  },
  {
    name: 'Template 4',
    descriptions: ['Différenciation des phonèmes similaires', 'Différenciation des lettres muettes'],
    content: textPreviewFr,
    value: 'template-4-fr',
    settings: {
      ...defaultSettingsFr,
      syllableActive: false,
      shadeAlternateLinesActive: true,
      shadeAlternateLinesOpacity: opacityOptions[1].value,
      silentLetterActive: true,
      silentLetterOpacity: silentLetterOpacityOptions[2].value,
      lineSpacing: lineSpacingOptions[1].value,
      phonemes: overrideDefaultPhonemes('fr', [
        { key: '6', value: 'd', bold: false, color: colors[0], active: true },
        { key: '12', value: 'g', bold: false, color: colors[1], active: true },
        { key: '11', value: 'f', bold: false, color: colors[2], active: true },
        { key: '29', value: 'p', bold: false, color: colors[3], active: true },
        { key: '32', value: 't', bold: false, color: colors[4], active: true },
        { key: '4', value: 'c', bold: false, color: colors[7], active: true },
        { key: '35', value: 'v', bold: false, color: colors[8], active: true },
        { key: '5', value: 'ch', bold: false, color: colors[9], active: true },
        { key: '17', value: 'j', bold: false, color: colors[10], active: true },
        { key: '3', value: 'b', bold: false, color: colors[11], active: true }
      ])
    }
  }
]
