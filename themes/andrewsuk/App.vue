<template>
  <component :is="headerView" />
  <main><router-view :key="$route.fullPath" /></main>
  <component :is="footerView" />
</template>

<script setup>
import { computed, defineAsyncComponent } from 'vue'
import { useRoute } from 'vue-router'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import { pages } from './utils/pages'
import { layouts, shellFor } from './utils/layouts'

const vueFiles = import.meta.glob('./components/**/*.vue')
const route = useRoute()

function viewFor(template, fallback) {
  if (!template) return fallback
  const key = `./${String(template).replace(/^\.\//, '')}`
  const loader = vueFiles[key]
  return loader ? defineAsyncComponent(loader) : fallback
}

const shell = computed(() => {
  const page = pages.find(item => item.path === route.path)
  return shellFor(layouts, page?.meta?.themeLayout)
})

const headerView = computed(() => viewFor(shell.value.header?.template, Header))
const footerView = computed(() => viewFor(shell.value.footer?.template, Footer))
</script>
