<template>
  <input
      ref="dragElement"
      type="text"
      v-bind="$attrs"
      :style="style"
      :class="{
      default: !$attrs['class'],
      drag: true,
      dragging,
      fast: stepFactor > 1,
      slow: stepFactor < 1,
      focus: dragFocussed,
      inactive: editing,
    }"
      v-model="visibleValue"
      readonly
      contenteditable="false"
      @mousedown.stop="dragstartHandler"
      @touchstart.stop.prevent="touchstartHandler"
      @focus="dragFocusHandler"
      @blur="dragBlurHandler"
      @keydown="keydownHandler"
      @keyup="keyupHandler"
  />
  <input
      ref="editElement"
      type="text"
      v-bind="$attrs"
      :style="style"
      :class="{
      default: !$attrs['class'],
      edit: true,
      editing,
      focus: editFocussed,
      inactive: !editing,
    }"
      v-model="visibleValue"
      @focus="editFocusHandler"
      @blur="editBlurHandler"
      @input="inputHandler"
  />
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue';
import { useEventListener } from '@/composables/useEventListener';

defineProps({
  modelValue: { type: Number, default: 0 },
  min: { type: Number, default: -1e12 },
  max: { type: Number, default: +1e12 },
  step: { type: Number, default: 1 },
  precision: { type: Number, default: 1 },
  speed: { type: Number, default: 1 },
  keyStepSlow: { type: Number, default: 1 },
  keyStep: { type: Number, default: 10 },
  keyStepFast: { type: Number, default: 100 },
  decimals: { type: Number, default: 0 },
  format: { type: Function, default: undefined },
  parse: { type: Function, default: undefined },
  horizontal: { type: Boolean, default: true },
  vertical: { type: Boolean, default: false },
  circular: { type: Boolean, default: false },
  mainStyle: { type: String },
  fastStyle: { type: String },
  slowStyle: { type: String },
  focusStyle: { type: String },
  draggingStyle: { type: String },
  editingStyle: { type: String },
  cursor: { type: String },
  options: { type: Object },
});

const emit = defineEmits([
  'consoleLog', 'change', 'input', 'focus', 'blur', 'dragstart', 'dragend', 'editstart', 'editend', 'update:modelValue'
]);

const state = reactive({
  preciseValue: undefined as number | undefined,
  visibleValue: undefined as number | string | undefined,
  dragging: false,
  editing: false,
  stepFactor: 1,
  dragFocussed: false,
  editFocussed: false,
});

const dragElement = ref<HTMLInputElement | null>(null);
const editElement = ref<HTMLInputElement | null>(null);

const style = computed(() => {
  let styles = '';
  if (!state.editing && state.stepFactor > 1) styles += ';fast-style';
  if (!state.editing && state.stepFactor < 1) styles += ';slow-style';
  return styles;
});

function updateValues(val: number) {
  state.preciseValue = val;
  state.visibleValue = val.toFixed(2);
  emit('update:modelValue', val);
}

watch(() => state.visibleValue, (newVal) => {
  const parsedValue = parseFloat(newVal as string);
  if (!isNaN(parsedValue)) {
    updateValues(parsedValue);
  }
});

function dragstartHandler() {
  state.dragging = true;
}

function dragFocusHandler() {
  state.dragFocussed = true;
}

function dragBlurHandler() {
  state.dragFocussed = false;
}

function editFocusHandler() {
  state.editFocussed = true;
}

function editBlurHandler() {
  state.editFocussed = false;
}

function keydownHandler(event: KeyboardEvent) {
  if (event.key === 'ArrowUp') {
    updateValues((state.preciseValue || 0) + 1);
  } else if (event.key === 'ArrowDown') {
    updateValues((state.preciseValue || 0) - 1);
  }
}

function keyupHandler() {}
function inputHandler() {}

useEventListener(window, 'keydown', keydownHandler);
useEventListener(window, 'keyup', keyupHandler);
</script>

<style scoped>
.default {
  display: inline-block;
  font-variant-numeric: tabular-nums;
  background-color: white;
  color: black;
  width: 4em;
  height: 1.6em;
  padding: 0.25em;
  border: 0.075em solid #0004;
  border-radius: 0.15em;
  text-align: right;
  cursor: ew-resize;
}
</style>
