<template>
  <div class="page-head">
    <div class="wrap" :class="{ split: d.split }" :style="d.split ? 'align-items:end' : ''">
      <div><Rich as="div" class="eyebrow" field="eyebrow" :value="d.eyebrow" :text-style="d.textStyle" placeholder="Eyebrow" /><h1><Rich as="span" field="title" :value="d.title" :text-style="d.textStyle" placeholder="Title" /><span class="dot"></span></h1></div>
      <Rich as="p" class="lede" :field="d.lede ? 'lede' : (d.ledeField || 'lede')" :value="d.lede || (d.ledeField ? d[d.ledeField] : '')" :text-style="d.textStyle" placeholder="Lede" />
    </div>
  </div>
</template>
<script setup>
import Rich from '../../components/Rich.vue'
import { useSectionBlock } from '../../utils/sectionBlock'
defineOptions({ inheritAttrs: false })
const props = defineProps({ data: Object, page: Object })
const { d } = useSectionBlock(props)
</script>
