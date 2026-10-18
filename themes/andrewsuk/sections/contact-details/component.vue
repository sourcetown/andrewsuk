<template>
  <section style="padding-top:80px">
    <div class="wrap split">
      <div class="info">
        <div v-for="(e, i) in d.emails || []" :key="e.address">
          <h4><Rich as="span" :field="`emails.${i}.label`" :value="e.label" /></h4>
          <p class="big"><ALink :to="`mailto:${e.address}`"><Rich as="span" :field="`emails.${i}.address`" :value="e.address" /></ALink></p>
          <p v-if="e.note" class="muted small"><Rich as="span" :field="`emails.${i}.note`" :value="e.note" /></p>
        </div>
        <div v-if="d.address">
          <h4>Post</h4>
          <p><Rich as="span" field="legalName" :value="d.legalName" /><br><Rich as="span" field="address.line1" :value="d.address.line1" /><br><Rich as="span" field="address.line2" :value="d.address.line2" /><br><Rich as="span" field="address.town" :value="d.address.town" />, <Rich as="span" field="address.county" :value="d.address.county" />, <Rich as="span" field="address.postcode" :value="d.address.postcode" /></p>
          <p v-if="d.deliveryNote" class="muted small" style="margin-top:10px"><Rich as="span" field="deliveryNote" :value="d.deliveryNote" /></p>
        </div>
        <div style="border:0"><h4>Company</h4><p class="muted"><Rich as="span" field="registration" :value="d.registration" /></p></div>
        <div style="border:0"><h4>Phone</h4><p><ALink v-if="d.phone" :to="`tel:${d.phone}`"><Rich as="span" field="phone" :value="d.phone" /></ALink><Ph v-else>Phone number, if wanted</Ph></p></div>
      </div>
      <div class="card" style="padding:40px">
        <h3 style="font-size:28px;margin:0"><Rich as="span" field="formTitle" :value="d.formTitle || 'Send a message'" placeholder="Send a message" /></h3>
        <p class="muted small" style="margin-top:6px"><Ph>Form endpoint and recipient from Jan</Ph></p>
        <!-- TODO: /api/contact does not exist yet. Wire it to a form handler before launch. -->
        <form :action="d.formAction || '/api/contact'" method="POST" @submit.prevent="submit">
          <div class="row2">
            <div><label for="cf-name">Name</label><input id="cf-name" v-model="form.name" name="name" required placeholder="Your name"></div>
            <div><label for="cf-email">Email</label><input id="cf-email" v-model="form.email" name="email" type="email" required placeholder="you@example.com"></div>
          </div>
          <label for="cf-subject">Subject</label>
          <select id="cf-subject" v-model="form.subject" name="subject"><option>General enquiry</option><option>Publisher or content owner</option><option>Audio, video or games distribution</option><option>Merchandise and licensing</option></select>
          <label for="cf-message">Message</label>
          <textarea id="cf-message" v-model="form.message" name="message" required placeholder="Your message"></textarea>
          <div style="margin-top:24px"><button class="btn btn-primary arrow" type="submit" :disabled="state === 'sending'">{{ state === 'sending' ? 'Sending' : 'Send message' }}</button></div>
          <p v-if="state === 'sent'" class="form-note ok">Thank you. We will get back to you as soon as possible.</p>
          <p v-if="state === 'error'" class="form-note">Sorry, the form is not connected yet. Please email {{ (d.emails || [])[0]?.address }}.</p>
        </form>
      </div>
    </div>
    <div class="wrap" style="margin-top:70px"><div class="ph-box map-ph">[Map of West Wing Studios, The Mall, Luton, if wanted]</div></div>
  </section>
</template>
<script setup>
import { reactive, ref } from 'vue'
import ALink from '../../components/ALink.vue'
import Ph from '../../components/Ph.vue'
import Rich from '../../components/Rich.vue'
import { useSectionBlock } from '../../utils/sectionBlock'
defineOptions({ inheritAttrs: false })
const props = defineProps({ data: Object, page: Object })
const { d } = useSectionBlock(props)
const form = reactive({ name: '', email: '', subject: 'General enquiry', message: '' })
const state = ref('idle')
async function submit() {
  state.value = 'sending'
  try {
    const res = await fetch(d.value.formAction || '/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    state.value = res.ok ? 'sent' : 'error'
  } catch { state.value = 'error' }
}
</script>
