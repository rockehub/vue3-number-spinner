## Installation

```bash
npm install ts-vue3-number-spinner
```

## Usage

```vue
<template>
  <number-spinner v-model="value" :min="0" :max="100" />
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { NumberSpinner } from 'ts-vue3-number-spinner'

  const value = ref<number>(50) // TypeScript type definition for the value
</script>

```