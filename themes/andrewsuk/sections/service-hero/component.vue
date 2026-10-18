<template>
  <div class="wrap"><div class="crumbs"><ALink to="/services"><Rich as="span" field="crumb" :value="d.crumb || 'Services'" :text-style="d.textStyle" /></ALink> / <Rich as="span" field="title" :value="d.title" :text-style="d.textStyle" /></div></div>
  <section class="hero" style="padding-top:50px">
    <div class="wrap">
      <div>
        <Rich as="div" class="eyebrow" :field="d.eyebrow ? 'eyebrow' : ''" :value="d.eyebrow || 'Services'" :text-style="d.textStyle" placeholder="Eyebrow" />
        <Rich as="h1" style="margin-top:20px" :field="d.headline ? 'headline' : 'title'" :value="d.headline || d.title" :text-style="d.textStyle" placeholder="Title" />
        <Rich as="div" class="lede rich" style="margin-top:26px" :field="d.body ? 'body' : 'summary'" :value="d.body || d.summary" :text-style="d.textStyle" placeholder="Body" />
        <div v-if="d.cta" class="ctas"><ALink class="btn btn-primary arrow" :to="d.cta.path"><Rich as="span" field="cta.label" :value="d.cta.label" :text-style="d.textStyle" /></ALink></div>
      </div>
      <div class="circle-art letter-art"><Rich as="span" field="initial" :value="d.initial" /></div>
    </div>
  </section>
</template>
<script setup>
import ALink from '../../components/ALink.vue'
import Rich from '../../components/Rich.vue'
import { useSectionBlock } from '../../utils/sectionBlock'
defineOptions({ inheritAttrs: false })
const props = defineProps({ data: Object, page: Object })
const { d } = useSectionBlock(props)
</script>
