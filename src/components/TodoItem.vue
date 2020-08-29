<template>
  <div class='wrap' @click="onClick(id)">
    <div 
      class='checkbox'
      :class="{ checkboxSelected: checked }"
    />
    <p 
      class='noPadding'
      :class="{ textSelected: checked }"
    >
      {{ title }}
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TodoItem',
  props: {
    title: String,
    id: Number,
    checked: Boolean,
    onClick: Function
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrap {
  display: flex;
  flex-direction: row;
  margin-bottom: calc(var(--spacing) * 3.5);
  cursor: pointer;
}

.checkbox {
  height: 30px;
  width: 30px;
  margin-right: calc(var(--spacing) * 2);
  border: 1px solid var(--text-color);
  border-radius: var(--roundness);
}

.checkboxSelected {
  background-color: var(--text-color);
}

.textSelected {
  text-decoration: line-through;
}
</style>
