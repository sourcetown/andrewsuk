<template>
  <section v-if="d.outletsNote || ((d.outlets || []).length && !d.partnerCategory)">
    <div class="wrap">
      <SecHead eyebrow="Outlets" :title="d.outletsNote ? 'The list of outlets continues to grow' : 'Examples of where we distribute'" />
      <div class="chips"><span v-for="(o, i) in d.outlets || []" :key="o.name" class="chip"><Rich as="span" :field="`outlets.${i}.name`" :value="o.name" /></span></div>
      <p v-if="d.outletsNote" class="outlets" style="margin-top:30px"><Rich as="span" field="outletsNote" :value="d.outletsNote" /></p>
    </div>
  </section>
</template>
<script setup>
import Rich from '../../components/Rich.vue'
import SecHead from '../SecHead.vue'
import { useSectionBlock } from '../../utils/sectionBlock'
defineOptions({ inheritAttrs: false })
const props = defineProps({ data: Object, page: Object })
const { d } = useSectionBlock(props)
</script>
