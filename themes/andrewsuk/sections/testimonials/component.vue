<template>
  <section :class="{ tint: d.tint }">
    <div class="wrap">
      <SecHead :eyebrow="d.eyebrow" :title="d.title" :intro="d.intro" :text-style="d.textStyle" />
      <div class="masonry">
        <div v-for="t in d.items || []" :key="t.key" class="tcard">
          <button v-if="editing" type="button" class="gm-tile-remove" aria-label="Remove testimonial" @click.stop.prevent="remove(t)">
            <svg viewBox="0 0 12 12" width="12" height="12" aria-hidden="true">
              <path d="M2.2 2.2l7.6 7.6M9.8 2.2l-7.6 7.6" stroke="currentColor" stroke-width="1.6" fill="none" />
            </svg>
          </button>
          <p>“<Rich as="span" :field="itemField(d.items, t, 'quote')" :value="t.quote" :text-style="d.textStyle" />”</p>
          <div class="quote-by"><Rich as="span" :field="itemField(d.items, t, 'name')" :value="t.name" :text-style="d.textStyle" /><small><Rich as="span" :field="itemField(d.items, t, 'role')" :value="t.role" :text-style="d.textStyle" /></small></div>
        </div>
        <AddThumb list="items" :image-key="''" :blank="blank" />
      </div>
    </div>
  </section>
</template>
<script setup>
import { computed, inject } from 'vue'
import AddThumb from '../../components/AddThumb.vue'
import SecHead from '../SecHead.vue'
import Rich from '../../components/Rich.vue'
import { itemField, useSectionBlock } from '../../utils/sectionBlock'
defineOptions({ inheritAttrs: false })
const props = defineProps({ data: Object, page: Object })
const { d } = useSectionBlock(props)
const inline = inject('greemoInline', null)
const editing = computed(() => Boolean(inline?.removeItem))
const blank = computed(() => ({
  key: `quote-${(d.value.items || []).length + 1}`,
  quote: '',
  name: '',
  role: ''
}))
const remove = (item) => {
  const path = itemField(d.value.items, item)
  if (path) inline?.removeItem(path)
}
</script>
<style scoped>
.tcard { position: relative; }
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
.tcard:hover .gm-tile-remove { opacity: 1; }
</style>
