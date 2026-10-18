<template>
  <section class="hero">
    <div class="wrap">
      <div>
        <Rich as="div" class="eyebrow" field="eyebrow" :value="d.eyebrow" :text-style="d.textStyle" placeholder="Eyebrow" />
        <Rich as="h1" style="margin-top:22px" :field="d.title ? 'title' : 'tagline'" :value="d.title || d.tagline" :text-style="d.textStyle" placeholder="Title" />
        <Rich as="p" class="lede" style="margin-top:28px" :field="d.lede ? 'lede' : 'intro'" :value="d.lede || d.intro" :text-style="d.textStyle" placeholder="Lede" />
        <div class="ctas">
          <ALink v-if="d.primaryCta" class="btn btn-primary arrow" :to="d.primaryCta.path"><Rich as="span" field="primaryCta.label" :value="d.primaryCta.label" :text-style="d.textStyle" /></ALink>
          <ALink v-if="d.secondaryCta" class="btn btn-ghost" :to="d.secondaryCta.path"><Rich as="span" field="secondaryCta.label" :value="d.secondaryCta.label" :text-style="d.textStyle" /></ALink>
        </div>
      </div>
      <div class="circle-art"><Img field="image" :src="d.image" alt="" /></div>
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
