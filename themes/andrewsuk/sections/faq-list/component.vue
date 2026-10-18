<template>
  <section style="padding-top:70px">
    <div class="wrap faq-layout">
      <nav class="side-nav"><a v-for="g in groups" :key="g.id" :href="`#${g.id}`" :class="{ on: g.id === activeId }" @click.prevent="go(g.id)"><Rich as="span" :field="itemField(d.items, g.items[0], 'category')" :value="g.name" /></a></nav>
      <div>
        <div v-for="g in groups" :id="g.id" :key="g.id" class="faq-cat">
          <Rich as="div" class="eyebrow" :field="itemField(d.items, g.items[0], 'category')" :value="g.name" />
          <details v-for="(f, i) in g.items" :key="f.key" class="faq" :open="g === groups[0] && i === 0">
            <summary><Rich as="span" :field="itemField(d.items, f, 'question')" :value="f.question" /></summary>
            <Rich as="div" class="rich" :field="itemField(d.items, f, 'answer')" :value="f.answer" />
          </details>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import { computed, ref } from 'vue'
import Rich from '../../components/Rich.vue'
import { itemField, useSectionBlock } from '../../utils/sectionBlock'
defineOptions({ inheritAttrs: false })
const props = defineProps({ data: Object, page: Object })
const { d } = useSectionBlock(props)
const groups = computed(() => {
  const map = new Map()
  for (const f of d.value.items || []) {
    const name = f.category || 'General'
    if (!map.has(name)) map.set(name, { name, id: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'), items: [] })
    map.get(name).items.push(f)
  }
  return [...map.values()]
})
const activeId = ref(groups.value[0]?.id)
function go(id) { activeId.value = id; document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }
</script>
