<template>
  <div class="sec-head" v-if="visible">
    <div>
      <Rich as="div" class="eyebrow" :field="eyebrowField" :value="eyebrow" :text-style="textStyle" placeholder="Eyebrow" />
      <Rich as="h2" :field="titleField" :value="title" :text-style="textStyle" placeholder="Title" />
    </div>
    <Rich as="p" :field="introField" :value="intro" :text-style="textStyle" placeholder="Intro" />
    <slot />
  </div>
</template>
<script setup>
import { computed, inject, useSlots } from 'vue'
import Rich from '../components/Rich.vue'

const props = defineProps({
  eyebrow: String,
  title: String,
  intro: String,
  textStyle: Object,
  eyebrowField: { type: String, default: 'eyebrow' },
  titleField: { type: String, default: 'title' },
  introField: { type: String, default: 'intro' }
})

const slots = useSlots()
const inline = inject('greemoInline', null)
const visible = computed(() =>
  Boolean(inline) || props.eyebrow || props.title || props.intro || Boolean(slots.default)
)
</script>
