<template>
  <section v-if="list.length || editing" :id="d.anchor" :class="{ tint: d.tint }">
    <div class="wrap">
      <SecHead :eyebrow="d.eyebrow" :title="d.title" :intro="d.intro" :text-style="d.textStyle">
        <ALink v-if="d.link" class="link" :to="d.link.path"><Rich as="span" field="link.label" :value="d.link.label" :text-style="d.textStyle" /></ALink>
      </SecHead>
      <div class="logo-wall">
        <Thumb v-for="p in list" :key="p.key">
          <Img :field="itemField(d.items, p, 'logo')" :src="p.logo" :alt="p.name" :title="p.name" loading="lazy" />
        </Thumb>
        <AddThumb list="items" image-key="logo" :blank="blank" />
      </div>
    </div>
  </section>
</template>
<script setup>
import { computed, inject } from 'vue'
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
const editing = computed(() => Boolean(inject('greemoInline', null)))
const blank = computed(() => ({ logo: '', name: '', ...(d.value.featuredOnly ? { featured: true } : {}) }))
const list = computed(() => {
  let items = d.value.items || []
  if (d.value.featuredOnly) items = items.filter(p => p.featured)
  if (d.value.byService) {
    const cat = props.page?.record?.partnerCategory
    items = cat ? items.filter(p => (p.categories || []).includes(cat)) : []
  }
  return items
})
</script>
