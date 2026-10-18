<template>
  <component
    :is="as"
    v-if="visible"
    ref="root"
    :class="attrs.class"
    :style="[attrs.style, css]"
    :contenteditable="editable ? 'true' : undefined"
    :data-gm-field="editable ? field : undefined"
    :data-placeholder="editable ? (placeholder || label) : undefined"
    spellcheck="true"
    @focus="onFocus"
    @blur="onBlur"
    @input="onInput"
    @click="onClick"
    @keydown="onKeyDown"
  />
</template>

<script setup>
import { computed, inject, nextTick, onMounted, ref, useAttrs, watch } from 'vue'
import { fieldCss, richText } from '../utils/greemo'

defineOptions({ inheritAttrs: false })

const props = defineProps({
  as: { type: String, default: 'span' },
  value: { type: [String, Number], default: '' },
  field: { type: String, default: '' },
  textStyle: { type: Object, default: null },
  placeholder: { type: String, default: '' }
})

const attrs = useAttrs()
const inline = inject('greemoInline', null)
const root = ref(null)
const focused = ref(false)

const editable = computed(() => Boolean(inline) && Boolean(props.field))
const visible = computed(() => editable.value || String(props.value ?? '').trim() !== '')
const label = computed(() => props.field.split('.').filter(part => !/^\d+$/.test(part)).pop() || 'Text')
const css = computed(() => fieldCss(props.textStyle, props.field))

const element = () => {
  const value = root.value
  if (value instanceof HTMLElement) return value
  return value?.$el instanceof HTMLElement ? value.$el : null
}

const formatLocked = () => document.body?.dataset.gmFormat === '1'

const paint = () => {
  const node = element()
  if (!node || focused.value || formatLocked()) return
  node.innerHTML = richText(props.value ?? '')
}

onMounted(() => nextTick(paint))
watch(() => props.value, () => nextTick(paint))

const onFocus = () => {
  if (!editable.value) return
  focused.value = true
  inline.focus(props.field)
}

const onBlur = () => {
  focused.value = false
  inline?.blur(props.field)
  nextTick(paint)
}

const onInput = () => {
  if (!editable.value) return
  inline.update(props.field, element()?.innerHTML || '')
}

const onClick = (event) => {
  if (editable.value) event.preventDefault()
}

const onKeyDown = (event) => {
  if (!editable.value || event.key !== 'Enter' || event.shiftKey) return
  event.preventDefault()
  document.execCommand('insertLineBreak')
  onInput()
}
</script>

<style scoped>
[contenteditable='true'] {
  outline: none;
  cursor: text;
}
[contenteditable='true']:hover,
[contenteditable='true']:focus {
  box-shadow: inset 0 -1px 0 rgba(23, 121, 95, 0.45);
}
[contenteditable='true']:empty::before {
  content: attr(data-placeholder);
  opacity: 0.35;
  text-transform: capitalize;
}
</style>
