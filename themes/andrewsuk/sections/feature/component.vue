<template>
  <section :class="{ tint: d.tint }">
    <div class="wrap split" style="align-items:center">
      <div>
        <Rich as="div" class="eyebrow" field="eyebrow" :value="d.eyebrow" :text-style="d.textStyle" placeholder="Eyebrow" /><Rich as="h2" style="margin:14px 0 22px" field="title" :value="d.title" :text-style="d.textStyle" placeholder="Title" />
        <Rich as="p" class="muted" field="body" :value="d.body" :text-style="d.textStyle" placeholder="Body" />
        <div v-if="d.cta" style="margin-top:30px"><ALink class="btn btn-primary arrow" :to="d.cta.path"><Rich as="span" field="cta.label" :value="d.cta.label" :text-style="d.textStyle" /></ALink></div>
      </div>
      <div class="circle-art feature-art"><Img field="logo" :src="d.logo" :alt="d.name || ''" /></div>
    </div>
  </section>
</template>
<script setup>
import ALink from '../../components/ALink.vue'
import Img from '../../components/Img.vue'
import Rich from '../../components/Rich.vue'
import { useSectionBlock } from '../../utils/sectionBlock'
defineOptions({ inheritAttrs: false })
const props = defineProps({ data: Object, page: Object })
const { d } = useSectionBlock(props)
</script>
