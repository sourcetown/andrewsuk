<template>
  <section :class="{ tint: d.tint }">
    <div class="wrap">
      <SecHead :eyebrow="d.eyebrow" :title="d.title" :intro="d.intro" :text-style="d.textStyle" />
      <div class="grid3">
        <component :is="d.links === false ? 'div' : ALink" v-for="(s, i) in list" :key="s.key || i" class="card gm-tile" v-bind="d.links === false ? {} : { to: `/services/${s.key}` }">
          <button v-if="editing" type="button" class="gm-tile-remove" aria-label="Remove tile" @click.stop.prevent="remove(s)">
            <svg viewBox="0 0 12 12" width="12" height="12" aria-hidden="true">
              <path d="M2.2 2.2l7.6 7.6M9.8 2.2l-7.6 7.6" stroke="currentColor" stroke-width="1.6" fill="none" />
            </svg>
          </button>
          <div class="ic"><Rich as="span" :field="itemField(d.items, s, 'initial')" :value="s.initial" :text-style="d.textStyle" /></div>
          <h3><Rich as="span" :field="itemField(d.items, s, 'title')" :value="s.title" :text-style="d.textStyle" /></h3>
          <p><Rich as="span" :field="itemField(d.items, s, 'summary')" :value="s.summary" :text-style="d.textStyle" /></p>
          <Rich v-if="d.links !== false" as="span" class="link" field="linkLabel" :value="d.linkLabel || 'Find out more'" :text-style="d.textStyle" />
        </component>
        <AddThumb list="items" :image-key="''" :blank="blank" />
      </div>
    </div>
  </section>
</template>
<script setup>
import { computed, inject } from 'vue'
import ALink from '../../components/ALink.vue'
import AddThumb from '../../components/AddThumb.vue'
import SecHead from '../SecHead.vue'
import Rich from '../../components/Rich.vue'
import { itemField, useSectionBlock } from '../../utils/sectionBlock'
defineOptions({ inheritAttrs: false })
const props = defineProps({ data: Object, page: Object })
const { d } = useSectionBlock(props)
const inline = inject('greemoInline', null)
const editing = computed(() => Boolean(inline?.removeItem))
const list = computed(() => (d.value.items || []).filter(s => !d.value.group || s.group === d.value.group).sort((a, b) => (a.order || 0) - (b.order || 0)))
const blank = computed(() => {
  const items = d.value.items || []
  const order = items.reduce((max, item) => Math.max(max, Number(item.order) || 0), 0) + 1
  return {
    key: `service-${order}`,
    initial: '',
    title: '',
    summary: '',
    group: d.value.group || '',
    order
  }
})
const remove = (item) => {
  const path = itemField(d.value.items, item)
  if (path) inline?.removeItem(path)
}
</script>
<style scoped>
.gm-tile { position: relative; }
.gm-tile-remove {
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  padding: 0;
  border: 0;
  border-radius: 999px;
  background: #fff;
  color: #9b2c2c;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.18);
  cursor: pointer;
  opacity: 0;
}
.gm-tile:hover .gm-tile-remove { opacity: 1; }
</style>
