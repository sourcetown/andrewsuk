<template>
  <div class="page-head">
    <div class="wrap">
      <div class="eyebrow">Page not found</div>
      <h1>We couldn’t find that page<span class="dot"></span></h1>
      <p class="lede">The link may be out of date. Try the home page or get in touch.</p>
      <div class="ctas" style="margin-top:30px"><router-link class="btn btn-primary arrow" to="/">Home</router-link><router-link class="btn btn-ghost" to="/contact">Contact us</router-link></div>
    </div>
  </div>
</template>

<script setup>
document.title = 'Page not found | Andrews UK'
</script>
