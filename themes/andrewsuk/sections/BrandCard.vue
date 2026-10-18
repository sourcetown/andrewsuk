<template>
  <div class="brand-card">
    <div class="logo"><Img :field="field ? `${field}.logo` : ''" :src="b.logo" :alt="`${b.name} logo`" /></div>
    <div class="body">
      <div class="tag"><Rich as="span" :field="field ? `${field}.tag` : ''" :value="b.tag" /></div>
      <h3><Rich as="span" :field="field ? `${field}.name` : ''" :value="b.name" /></h3>
      <p><Rich v-if="b.blurb || editing" as="span" :field="field ? `${field}.blurb` : ''" :value="b.blurb" /><Ph v-else>Short description from Jan</Ph></p>
      <a v-if="b.url && !editing" class="link" :href="b.url" target="_blank" rel="noopener"><Rich as="span" :field="field ? `${field}.visitLabel` : ''" :value="visitLabel" /></a>
      <span v-else-if="b.url" class="link"><Rich as="span" :field="field ? `${field}.visitLabel` : ''" :value="visitLabel" /></span>
      <span v-else><Ph>Website link</Ph></span>
    </div>
  </div>
</template>
<script setup>
import { computed, inject } from 'vue'
import Img from '../components/Img.vue'
import Ph from '../components/Ph.vue'
import Rich from '../components/Rich.vue'
const props = defineProps({ b: Object, field: { type: String, default: '' } })
const inline = inject('greemoInline', null)
const editing = computed(() => Boolean(inline))
const host = computed(() => (props.b.url || '').replace(/^https?:\/\//, '').replace(/\/$/, ''))
const visitLabel = computed(() => props.b.visitLabel || `Visit ${host.value}`)
</script>
