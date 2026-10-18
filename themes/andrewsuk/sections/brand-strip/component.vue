<template>
  <section class="tint">
    <div class="wrap">
      <SecHead :eyebrow="d.eyebrow" :title="d.title" :intro="d.acquisitions" intro-field="acquisitions" :text-style="d.textStyle" />
      <div class="brand-strip">
        <Thumb v-for="b in list" :key="b.key">
          <component :is="b.url ? ALink : 'span'" v-bind="b.url ? { to: b.url } : {}" :title="b.name"><Img :field="itemField(d.items, b, 'logo')" :src="b.logo" :alt="b.name" /></component>
        </Thumb>
        <AddThumb list="items" image-key="logo" :blank="{ logo: '', name: '', showInStrip: true }" />
      </div>
      <div v-if="d.cta" style="margin-top:44px"><ALink class="btn btn-ghost arrow" :to="d.cta.path"><Rich as="span" field="cta.label" :value="d.cta.label" :text-style="d.textStyle" /></ALink></div>
    </div>
  </section>
</template>
<script setup>
import { computed } from 'vue'
import AddThumb from '../../components/AddThumb.vue'
import Thumb from '../../components/Thumb.vue'
import SecHead from '../SecHead.vue'
import ALink from '../../components/ALink.vue'
import Img from '../../components/Img.vue'
import Rich from '../../components/Rich.vue'
import { itemField, useSectionBlock } from '../../utils/sectionBlock'
defineOptions({ inheritAttrs: false })
const props = defineProps({ data: Object, page: Object })
const { d } = useSectionBlock(props)
const list = computed(() => (d.value.items || []).filter(b => b.showInStrip))
</script>
