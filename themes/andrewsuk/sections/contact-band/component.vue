<template>
  <section style="padding-top:0">
    <div class="wrap"><div class="cta-band">
      <div class="cta-copy"><Rich as="div" class="eyebrow" field="eyebrow" :value="d.eyebrow" :text-style="d.textStyle" placeholder="Eyebrow" /><Rich as="h2" style="margin:14px 0 16px" field="title" :value="d.title" :text-style="d.textStyle" placeholder="Title" /><Rich as="p" class="muted" field="body" :value="d.body" :text-style="d.textStyle" placeholder="Body" /></div>
      <div class="actions">
        <component :is="editing ? 'span' : 'a'" v-if="email" class="btn btn-primary arrow" :href="editing ? undefined : `mailto:${email}`"><Rich as="span" field="emails.0.address" :value="email" :text-style="d.textStyle" /></component>
        <ALink class="btn btn-ghost" to="/contact"><Rich as="span" field="detailsLabel" :value="d.detailsLabel || 'Contact details'" :text-style="d.textStyle" /></ALink>
      </div>
    </div></div>
  </section>
</template>
<script setup>
import { computed, inject } from 'vue'
import ALink from '../../components/ALink.vue'
import Rich from '../../components/Rich.vue'
import { useSectionBlock } from '../../utils/sectionBlock'
defineOptions({ inheritAttrs: false })
const props = defineProps({ data: Object, page: Object })
const { d } = useSectionBlock(props)
const inline = inject('greemoInline', null)
const editing = computed(() => Boolean(inline))
const email = computed(() => (d.value.emails || [])[0]?.address)
</script>
