<template>
  <section>
    <div class="wrap split">
      <div><Rich as="div" class="eyebrow" field="eyebrow" :value="d.eyebrow" :text-style="d.textStyle" placeholder="Eyebrow" /><Rich as="h2" style="margin:14px 0 24px" field="title" :value="d.title" :text-style="d.textStyle" placeholder="Title" /><Rich as="div" class="muted rich" field="about" :value="d.about" :text-style="d.textStyle" /></div>
      <div>
        <Rich as="div" class="eyebrow" field="milestonesTitle" :value="d.milestonesTitle || 'Milestones'" :text-style="d.textStyle" placeholder="Milestones" />
        <div style="margin-top:30px">
          <div v-for="(m, i) in d.milestones || []" :key="m.title" class="tl">
            <span class="when"><Rich as="span" :field="`milestones.${i}.when`" :value="m.when" placeholder="Dates" /><Ph v-if="!m.when && !editing">Dates</Ph></span>
            <b><Rich as="span" :field="`milestones.${i}.title`" :value="m.title" :text-style="d.textStyle" /></b>
            <p><Rich as="span" :field="`milestones.${i}.text`" :value="m.text" :text-style="d.textStyle" /> <Ph v-if="!m.when && !editing">Years from Jan</Ph></p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import { computed, inject } from 'vue'
import Ph from '../../components/Ph.vue'
import Rich from '../../components/Rich.vue'
import { useSectionBlock } from '../../utils/sectionBlock'
defineOptions({ inheritAttrs: false })
const props = defineProps({ data: Object, page: Object })
const { d } = useSectionBlock(props)
const editing = computed(() => Boolean(inject('greemoInline', null)))
</script>
