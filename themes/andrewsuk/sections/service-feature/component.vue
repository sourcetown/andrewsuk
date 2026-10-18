<template>
  <section v-if="brands.length || quote || d.featureTitle">
    <div class="wrap split" style="align-items:center">
      <div>
        <template v-if="d.featureTitle">
          <Img v-if="brands[0]" class="svc-logo" field="featureLogo" :src="d.featureLogo || brands[0].logo" :alt="brands[0].name" />
          <Rich as="h2" style="margin-bottom:20px" field="featureTitle" :value="d.featureTitle" :text-style="d.textStyle" placeholder="Title" />
          <Rich as="p" class="muted" field="featureText" :value="d.featureText" :text-style="d.textStyle" placeholder="Text" />
          <div v-if="brands[0]?.url" style="margin-top:28px"><ALink class="link" :to="brands[0].url"><Rich as="span" field="featureVisitLabel" :value="d.featureVisitLabel || ('Visit ' + host(brands[0].url))" :text-style="d.textStyle" /></ALink></div>
        </template>
        <template v-else>
          <Rich as="div" class="eyebrow" field="brandsEyebrow" :value="d.brandsEyebrow || (brands.length > 1 ? 'Our brands' : 'Part of the group')" :text-style="d.textStyle" />
          <div v-for="b in brands" :key="b.key" class="svc-brand">
            <Img :field="'brandLogos.' + b.key" :src="(d.brandLogos && d.brandLogos[b.key]) || b.logo" :alt="b.name" />
            <h3><Rich as="span" :field="'brandNames.' + b.key" :value="(d.brandNames && d.brandNames[b.key]) || b.name" :text-style="d.textStyle" /></h3>
            <p class="muted"><Rich as="span" :field="'brandBlurbs.' + b.key" :value="(d.brandBlurbs && d.brandBlurbs[b.key]) || b.blurb" :text-style="d.textStyle" /></p>
            <ALink v-if="b.url" class="link" :to="b.url"><Rich as="span" :field="'brandVisits.' + b.key" :value="(d.brandVisits && d.brandVisits[b.key]) || ('Visit ' + host(b.url))" :text-style="d.textStyle" /></ALink>
          </div>
        </template>
      </div>
      <div v-if="quote"><Rich as="p" class="quote" style="font-size:28px" field="testimonialQuote" :value="d.testimonialQuote || quote.quote" :text-style="d.textStyle" /><div class="quote-by"><Rich as="span" field="testimonialName" :value="d.testimonialName || quote.name" :text-style="d.textStyle" /><small><Rich as="span" field="testimonialRole" :value="d.testimonialRole || quote.role" :text-style="d.textStyle" /></small></div></div>
    </div>
  </section>
</template>
<script setup>
import { computed } from 'vue'
import ALink from '../../components/ALink.vue'
import Img from '../../components/Img.vue'
import Rich from '../../components/Rich.vue'
import { findRecord } from '../../utils/greemo'
import { useSectionBlock } from '../../utils/sectionBlock'
defineOptions({ inheritAttrs: false })
const props = defineProps({ data: Object, page: Object })
const { d } = useSectionBlock(props)
const brands = computed(() => (d.value.relatedBrands || []).map(k => findRecord('brands', k)).filter(Boolean))
const quote = computed(() => d.value.testimonial ? findRecord('testimonials', d.value.testimonial) : null)
const host = url => url.replace(/^https?:\/\//, '').replace(/\/$/, '')
</script>
