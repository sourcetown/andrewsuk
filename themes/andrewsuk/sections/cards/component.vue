<template>
  <section>
    <div class="wrap">
      <SecHead :eyebrow="d.eyebrow" :title="d.title" :intro="d.intro" :text-style="d.textStyle" />
      <div class="grid3"><div v-for="(c, i) in d.items || []" :key="i" class="card"><div class="ic"><Rich as="span" :field="`items.${i}.initial`" :value="c.initial" /></div><h3><Rich as="span" :field="`items.${i}.title`" :value="c.title" :text-style="d.textStyle" /></h3><Rich as="p" :field="`items.${i}.text`" :value="c.text" :text-style="d.textStyle" /></div></div>
    </div>
  </section>
</template>
<script setup>
import SecHead from '../SecHead.vue'
import Rich from '../../components/Rich.vue'
import { useSectionBlock } from '../../utils/sectionBlock'
defineOptions({ inheritAttrs: false })
const props = defineProps({ data: Object, page: Object })
const { d } = useSectionBlock(props)
</script>
