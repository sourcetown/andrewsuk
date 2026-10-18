<template>
  <div class="wrap"><div class="stats">
    <div v-for="(s, i) in d.stats || []" :key="i" class="stat"><b><Rich as="span" :field="`stats.${i}.value`" :value="s.value" :text-style="d.textStyle" /></b><Rich as="span" :field="`stats.${i}.label`" :value="s.label" :text-style="d.textStyle" /></div>
  </div></div>
</template>
<script setup>
import Rich from '../../components/Rich.vue'
import { useSectionBlock } from '../../utils/sectionBlock'
defineOptions({ inheritAttrs: false })
const props = defineProps({ data: Object, page: Object })
const { d } = useSectionBlock(props)
</script>
