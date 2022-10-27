# @readapt/shared-components

This package contains Vue.js components shared between readapt apps.

## Installation

### Prerequisites

Install peer-dependencies

1. `vue`
2. `bootstrap`
3. `bootstrap-vue`
4. `@readapt/settings`
5. `core-js`

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
import { defineComponent } from 'vue'
import { ColorPicker } from '@readapt/shared-components'

const MyComponent = defineComponent({
  components: { ColorPicker },
  setup() {
    // ...
  }
})
```
