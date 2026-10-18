<template>
  <header class="site-header">
    <div class="wrap">
      <router-link class="brand" to="/" @click="open = false">
        <Img :src="company.logo" :alt="company.legalName" field="company.logo" />
      </router-link>
      <nav class="nav" :class="{ open }">
        <ALink v-for="item in items" :key="item.id" :to="item.path" @click="open = false">
          <Rich as="span" :field="menuField(menu, 'header', item, 'label')" :value="item.label" />
        </ALink>
        <ALink v-for="item in cta" :key="item.id" :to="item.path" class="btn btn-primary" @click="open = false">
          <Rich as="span" :field="menuField(menu, 'header-cta', item, 'label')" :value="item.label" />
        </ALink>
      </nav>
      <button class="burger" :class="{ on: open }" aria-label="Menu" @click="open = !open"><span></span></button>
    </div>
  </header>
</template>

<script setup>
import { computed, inject, ref } from 'vue'
import ALink from './ALink.vue'
import Img from './Img.vue'
import Rich from './Rich.vue'
import { menuField, menuFrom, siteData } from '../utils/greemo'

const provided = inject('greemoCollections', null)
const bag = () => {
  const extra = provided?.value
  if (extra && Object.keys(extra).length) return { ...siteData(), ...extra }
  return siteData()
}
const company = computed(() => bag().company || {})
const menu = computed(() => bag().menu || {})
const items = computed(() => menuFrom(menu.value, 'header'))
const cta = computed(() => menuFrom(menu.value, 'header-cta'))
const open = ref(false)
</script>
