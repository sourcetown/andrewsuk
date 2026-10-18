<template>
  <section style="padding-top:40px">
    <div class="wrap"><div class="rows">
      <div v-for="(s, i) in list" :id="s.key" :key="s.key" class="row">
        <div class="num">{{ String(i + 1).padStart(2, '0') }}</div>
        <div><h3><Rich as="span" :field="itemField(d.items, s, 'title')" :value="s.title" :text-style="d.textStyle" /></h3><div class="chips" style="margin-top:16px"><span v-for="(o, oi) in s.outlets || []" :key="o.name || oi" class="chip"><Rich as="span" :field="outletField(s, oi)" :value="o.name" /></span></div></div>
        <p><Rich as="span" :field="itemField(d.items, s, 'summary')" :value="s.summary" :text-style="d.textStyle" /></p>
        <ALink class="link" :to="`/services/${s.key}`"><Rich as="span" field="detailsLabel" :value="d.detailsLabel || 'Details'" :text-style="d.textStyle" /></ALink>
      </div>
    </div></div>
  </section>
</template>
<script setup>
import { computed } from 'vue'
import ALink from '../../components/ALink.vue'
import Rich from '../../components/Rich.vue'
import { itemField, useSectionBlock } from '../../utils/sectionBlock'
defineOptions({ inheritAttrs: false })
const props = defineProps({ data: Object, page: Object })
const { d } = useSectionBlock(props)
const list = computed(() => (d.value.items || []).filter(s => !d.value.group || s.group === d.value.group).sort((a, b) => (a.order || 0) - (b.order || 0)))
const outletField = (service, index) => {
  const base = itemField(d.value.items, service, 'outlets')
  return base ? `${base}.${index}.name` : ''
}
</script>
