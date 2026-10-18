<template>
  <footer class="site-footer">
    <div class="wrap">
      <div class="foot-grid">
        <div class="foot-brand">
          <Img :src="c.logo" :alt="c.legalName" field="company.logo" />
          <Rich as="p" style="max-width:36ch" field="company.description" :value="c.description" placeholder="Description" />
          <p v-if="c.address" style="margin-top:16px">
            <Rich as="span" field="company.address.line1" :value="c.address.line1" />,
            <Rich as="span" field="company.address.line2" :value="c.address.line2" /><br>
            <Rich as="span" field="company.address.town" :value="c.address.town" />,
            <Rich as="span" field="company.address.county" :value="c.address.county" />,
            <Rich as="span" field="company.address.postcode" :value="c.address.postcode" />
          </p>
          <p v-if="email" style="margin-top:10px"><a :href="`mailto:${email}`" class="foot-email"><Rich as="span" field="company.emails.0.address" :value="email" /></a></p>
        </div>
        <nav class="foot-menu" aria-label="What we do">
          <h4>What we do</h4>
          <ALink v-for="item in services" :key="item.key" :to="`/services/${item.key}`">
            <Rich as="span" :field="recordField(serviceRecords, 'services', item, 'title')" :value="item.title" />
          </ALink>
        </nav>
        <nav class="foot-menu" aria-label="Company">
          <h4>Company</h4>
          <ALink v-for="item in company" :key="item.id" :to="item.path">
            <Rich as="span" :field="menuField(menu, 'footer', item, 'label')" :value="item.label" />
          </ALink>
        </nav>
        <nav class="foot-menu" aria-label="Follow">
          <h4>Follow</h4>
          <a v-for="(item, index) in c.social || []" :key="item.url" :href="item.url" target="_blank" rel="noopener">
            <Rich as="span" :field="`company.social.${index}.label`" :value="item.label" />
          </a>
        </nav>
      </div>
      <div class="foot-base">
        <span>© {{ year }} <Rich as="span" field="company.legalName" :value="c.legalName" />. <Rich as="span" field="company.registration" :value="c.registration" /></span>
        <span class="foot-legal">
          <ALink v-for="item in legal" :key="item.id" :to="item.path">
            <Rich as="span" :field="menuField(menu, 'legal', item, 'label')" :value="item.label" />
          </ALink>
        </span>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed, inject } from 'vue'
import ALink from './ALink.vue'
import Img from './Img.vue'
import Rich from './Rich.vue'
import { collectionItems, menuField, menuFrom, recordField, siteData } from '../utils/greemo'

const provided = inject('greemoCollections', null)
const bag = () => {
  const extra = provided?.value
  if (extra && Object.keys(extra).length) return { ...siteData(), ...extra }
  return siteData()
}
const c = computed(() => bag().company || {})
const email = computed(() => (c.value.emails || [])[0]?.address)
const serviceRecords = computed(() => bag().services)
const services = computed(() => collectionItems(serviceRecords.value).filter(item => item.group === 'main').sort((a, b) => (a.order || 0) - (b.order || 0)))
const menu = computed(() => bag().menu || {})
const company = computed(() => menuFrom(menu.value, 'footer'))
const legal = computed(() => menuFrom(menu.value, 'legal'))
const year = new Date().getFullYear()
</script>

<style>
.foot-menu { display: flex; flex-direction: column; align-items: flex-start; }
.foot-menu > a,
.foot-menu > span { display: block; color: var(--muted, #5b6662); font-size: 15px; margin-bottom: 10px; text-decoration: none; }
</style>
