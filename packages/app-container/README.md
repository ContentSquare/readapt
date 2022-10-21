# @readapt/app-container

This package contains Vue.js components shared between readapt apps.

## Installation

### Prerequisites

Install peer-dependencies

1. `vue`

### npm

2. Install `@readapt/app-container`

```bash
  npm install @readapt/app-container
```

## Usage

Register shared components  in your Vue.js app typically your `main.ts`

```javascript
import ReadaptComponents from '@readapt/app-container'

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
import { ColorPicker } from '@readapt/app-container'

const MyComponent = defineComponent({
  components: { ColorPicker },
  setup() {
    // ...
  }
})
```
