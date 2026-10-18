<template>
  <NotFound v-if="!page || missingRecord" />
  <template v-else>
    <template v-for="(block, i) in page.blocks" :key="i">
      <template v-if="isLoopTile(block)">
        <component
          v-for="(record, recordIndex) in loopTiles"
          :key="`${i}-${record?.key || record?.id || recordIndex}`"
          :is="sections[block.name]"
          v-bind="sectionBind(resolveSectionData(block.config, loopContext(record, recordIndex)))"
          :page="loopContext(record, recordIndex)"
        />
      </template>
      <component
        v-else-if="block.type === 'template' && sections[block.name]"
        :is="sections[block.name]"
        v-bind="sectionBind(resolveSectionData(block.config, context))"
        :page="context"
      />
      <section v-else-if="block.type === 'markdown'" class="prose-section"><div class="wrap prose" v-html="marked.parse(block.content)"></div></section>
    </template>
  </template>
</template>

<script setup>
import { computed, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { marked } from 'marked'
import NotFound from './NotFound.vue'
import { sections } from '../sections'
import { pages } from '../utils/pages'
import { collectionItems, collections, findRecord, resolveSectionData, site } from '../utils/greemo'
import { sectionBind } from '../utils/sectionBlock'

const props = defineProps({ pageName: String })
const route = useRoute()
const page = computed(() => pages.find(p => p.name === props.pageName))
const context = computed(() => {
  const meta = page.value?.meta || {}
  const objectKey = meta.kind === 'detail' ? route.params.key : undefined
  const record = objectKey ? findRecord(meta.collection, objectKey) : undefined
  return { collection: meta.kind === 'detail' || meta.kind === 'list' ? meta.collection : undefined, objectKey, record, meta }
})
const missingRecord = computed(() => page.value?.meta.kind === 'detail' && !context.value.record)
const loopRecords = computed(() => {
  if (page.value?.meta?.kind !== 'list') return []
  return collectionItems(collections[page.value?.meta?.collection])
})
const loopTiles = computed(() => (loopRecords.value.length ? loopRecords.value : [null]))
const isLoopTile = (block) => block.type === 'template' && block.config?.__loopTile && sections[block.name] && page.value?.meta?.kind === 'list'
const loopContext = (record, index) => {
  if (!record) return context.value
  const objectKey = record.key || record.id || String(index)
  return { ...context.value, objectKey, record }
}

watchEffect(() => {
  const meta = page.value?.meta || {}
  const title = meta.seoTitle || context.value.record?.title || meta.title
  document.title = meta.kind === 'home' || meta.seoTitle ? title : `${title} | ${site.siteName || 'Andrews UK'}`
  const description = meta.seoDescription || context.value.record?.summary || meta.description || site.siteDescription
  let tag = document.head.querySelector('meta[name="description"]')
  if (!tag) { tag = document.createElement('meta'); tag.setAttribute('name', 'description'); document.head.appendChild(tag) }
  tag.setAttribute('content', description || '')
})
</script>
