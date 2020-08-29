<template>
  <div class='wrap' @click="onClick(id)">
    <div 
      class='checkbox'
      :class="{ checkboxSelected: checked }"
    />
    <p 
      class='noPadding text'
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
  min-height: 30px;
  max-height: 30px;
  width: 30px;
  min-width: 30px;
  max-width: 30px;
  margin-right: calc(var(--spacing) * 2);
  border: 1px solid var(--text-color);
  border-radius: var(--roundness);
}

.checkboxSelected {
  background-color: var(--text-color);
}

.text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.textSelected {
  text-decoration: line-through;
}
</style>
