<template>
  <section>
    <div class="wrap split">
      <div><Rich as="div" class="eyebrow" field="eyebrow" :value="d.eyebrow" :text-style="d.textStyle" placeholder="Eyebrow" /><Rich as="h2" style="margin-top:14px" field="title" :value="d.title" :text-style="d.textStyle" placeholder="Title" /></div>
      <Rich as="p" class="muted" style="font-size:18px" :field="d.bodyField || 'body'" :value="d[d.bodyField || 'body']" :text-style="d.textStyle" placeholder="Body" />
    </div>
  </section>
</template>
<script setup>
import Rich from '../../components/Rich.vue'
import { useSectionBlock } from '../../utils/sectionBlock'
defineOptions({ inheritAttrs: false })
const props = defineProps({ data: Object, page: Object })
const { d } = useSectionBlock(props)
</script>
