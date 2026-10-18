<template>
  <span v-if="editable" class="gm-img" :class="{ 'is-empty': !src }">
    <img v-if="src" :src="src" :alt="alt" v-bind="attrs" />
    <span class="gm-thumb-actions">
      <button
        type="button"
        class="gm-thumb-btn"
        :aria-label="src ? 'Replace media' : 'Add image'"
        @click.stop.prevent="inline.pickImage(field)"
      >
        <svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true">
          <rect x="1.5" y="2.5" width="13" height="11" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.4" />
          <circle cx="5.5" cy="6.2" r="1.15" fill="currentColor" />
          <path d="M2.2 12.2l3.2-3.2 2.1 2.1 2.2-2.4 4.1 3.5" fill="none" stroke="currentColor" stroke-width="1.4" />
        </svg>
      </button>
      <button
        v-if="removable"
        type="button"
        class="gm-thumb-btn gm-thumb-remove"
        aria-label="Remove"
        @click.stop.prevent="inline.removeItem(field)"
      >
        <svg viewBox="0 0 12 12" width="12" height="12" aria-hidden="true">
          <path d="M2.2 2.2l7.6 7.6M9.8 2.2l-7.6 7.6" stroke="currentColor" stroke-width="1.6" fill="none" />
        </svg>
      </button>
    </span>
  </span>
  <img v-else-if="src" :src="src" :alt="alt" v-bind="attrs" />
</template>

<script setup>
import { computed, inject, useAttrs } from 'vue'

defineOptions({ inheritAttrs: false })

const props = defineProps({
  src: { type: String, default: '' },
  alt: { type: String, default: '' },
  field: { type: String, default: '' }
})

const attrs = useAttrs()

const inline = inject('greemoInline', null)
const editable = computed(() => Boolean(inline) && Boolean(props.field))
const removable = computed(() => Boolean(inline?.removeItem) && /^[\w]+\.\d+\./.test(props.field))
</script>

<style scoped>
.gm-img {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  max-width: 100%;
}
.gm-img.is-empty {
  min-width: 4.5rem;
  min-height: 4.5rem;
}
.gm-thumb-actions {
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 2;
  display: flex;
  gap: 4px;
  transform: translate(-50%, -50%);
  opacity: 0;
  pointer-events: none;
}
.gm-img:hover .gm-thumb-actions {
  opacity: 1;
  pointer-events: auto;
}
.gm-thumb-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  padding: 0;
  border: 0;
  border-radius: 999px;
  background: #fff;
  color: #3f3f46;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.16);
  cursor: pointer;
}
.gm-thumb-remove {
  color: #b42318;
}
</style>
