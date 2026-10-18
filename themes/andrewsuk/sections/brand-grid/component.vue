<template>
  <section :class="{ tint: d.tint }" :style="d.filters ? 'padding-top:60px' : ''">
    <div class="wrap">
      <SecHead :eyebrow="d.eyebrow" :title="d.title" :intro="d.intro" :text-style="d.textStyle" />
      <div v-if="d.filters" class="chips" style="margin-bottom:36px">
        <button v-for="f in filters" :key="f.value" class="chip" :class="{ on: active === f.value }" @click="active = f.value">{{ f.label }}</button>
      </div>
      <div :class="d.columns === 4 ? 'grid4' : 'grid3'">
        <Thumb v-for="b in list" :key="b.key">
          <BrandCard :b="b" :field="itemField(d.items, b)" />
        </Thumb>
        <AddThumb list="items" image-key="logo" :blank="blank" />
      </div>
    </div>
  </section>
</template>
<script setup>
import { computed, ref } from 'vue'
import AddThumb from '../../components/AddThumb.vue'
import Thumb from '../../components/Thumb.vue'
import SecHead from '../SecHead.vue'
import BrandCard from '../BrandCard.vue'
import { itemField, useSectionBlock } from '../../utils/sectionBlock'
defineOptions({ inheritAttrs: false })
const props = defineProps({ data: Object, page: Object })
const { d } = useSectionBlock(props)
const LABELS = { imprint: 'Imprints', children: 'Children’s', standalone: 'Standalone companies', sister: 'Sister companies', 'games-brand': 'Games brands', 'joint-venture': 'Joint ventures' }
const active = ref('all')
const all = computed(() => (d.value.items || []).filter(b => !d.value.types || d.value.types.includes(b.type)))
const filters = computed(() => [{ value: 'all', label: 'All' }, ...[...new Set(all.value.map(b => b.type))].map(t => ({ value: t, label: LABELS[t] || t }))])
const list = computed(() => active.value === 'all' ? all.value : all.value.filter(b => b.type === active.value))
const blank = computed(() => ({
  logo: '',
  name: '',
  ...(Array.isArray(d.value.types) && d.value.types[0] ? { type: d.value.types[0] } : {})
}))
</script>
