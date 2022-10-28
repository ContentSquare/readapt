# @readapt/settings

Readapt adaptations are based on a settings profile. This package contains Settings models, type definitions and a few
utility functions to easily build Settings in order to adapt text.

## Installation

1. Install `@readapt/settings` package:

```bash
     npm install @readapt/settings
```

## How to build settings?

Use `buildDefaultSettings()` to build default settings

```typescript

    import { buildDefaultSettings } from '@readapt/settings'

    const defaultSettings = buildDefaultSettings('en')
```

Then you can customize it using available options. For example:

```typescript
    import { colors, lineSpacingOptions, opacityOptions, silentLetterOpacityOptions, overrideDefaultLetters } from '@readapt/settings'

    const mySettings = {
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
```

Each Option is typed to easily know available values. Explore our source code to check all available options.

`overrideDefaultLetters()` and `overrideDefaultPhonemes()` are two methods to easily customize letters and phonemes.

`getLangConfig()` returns available phonemes and letters for each language.
