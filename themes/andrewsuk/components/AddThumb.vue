<template>
  <div v-if="editing" class="gm-thumb gm-thumb-add">
    <button type="button" class="gm-thumb-add" aria-label="Add" @click.stop.prevent="inline.addItem(list, blank, imageKey)">+</button>
  </div>
</template>

<script setup>
import { computed, inject } from 'vue'

defineProps({
  list: { type: String, default: 'items' },
  imageKey: { type: String, default: 'logo' },
  blank: { type: Object, default: () => ({ logo: '' }) }
})

const inline = inject('greemoInline', null)
const editing = computed(() => Boolean(inline?.addItem))
</script>
