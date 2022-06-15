# @readapt/shared-components

This package contains Vue.js components shared between readapt apps.

## Installation

### Prerequisites

Install peer-dependencies

1. `vue`
2. `@vue/composition-api`
3. `bootstrap`
4. `bootstrap-vue`
5. `@readapt/settings`
6. `core-js`

### npm

2. Install `@readapt/shared-component`

```bash
  npm install @readapt/shared-components
```

## Usage

Register shared components  in your Vue.js app typically your `main.ts`

```javascript
import ReadaptComponents from '@readapt/shared-components'

Vue.use(ReadaptComponents)
```
Add the ReadaptComponent in your template for example:

```html
<template>
  <readapt-color-picker :value="bar" @selectColor="fooFn" />
</template>
```

Or add it individually in your components (for smaller bundles)

```javascript
import { defineComponent } from '@vue/composition-api'
import { ColorPicker } from '@readapt/shared-components'

const MyComponent = defineComponent({
  components: { ColorPicker },
  setup() {
    // ...
  }
})
```
