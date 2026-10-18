<template>
  <section v-if="(d.children || []).length" class="tint" style="padding-top:100px">
    <div class="wrap"><div class="grid3">
      <div v-for="(c, i) in d.children" :key="c.title" class="card"><div class="ic">{{ i + 1 }}</div><h3><Rich as="span" :field="`children.${i}.title`" :value="c.title" :text-style="d.textStyle" /></h3><Rich as="p" :field="`children.${i}.text`" :value="c.text" :text-style="d.textStyle" /></div>
    </div></div>
  </section>
</template>
<script setup>
import Rich from '../../components/Rich.vue'
import { useSectionBlock } from '../../utils/sectionBlock'
defineOptions({ inheritAttrs: false })
const props = defineProps({ data: Object, page: Object })
const { d } = useSectionBlock(props)
</script>
