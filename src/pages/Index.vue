<template>
  <div class="pageWrap">
    <div class="page">
      <div class="titleRow">
        <h1 
          class="title" v-if="state.value === 'idle'"
          :class="{ hide: state.value === 'editing' }"
          @click="edit"
        >
          Todo List
        </h1>

        <input 
          class="input" 
          :class="{ hide: state.value !== 'editing' }"
          placeholder="Title..."
          v-on:keyup.enter="submit"
          v-on:blur="cancleEdit"
          v-model="state.context.inputValue"
          ref="input"
        />

        <div 
          class="addButton"
          :class="{ buttonEditing: state.value === 'editing' }"
          @click="edit"
        >
          +
        </div>
      </div>
      <div v-for="item in state.context.items" :key="item.id">
        <TodoItem :title="item.title" :id="item.id" :checked="item.completed" :onClick="handleClick"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { TodoItem } from '../components';
import { useMachine } from '@xstate/vue/lib/fsm';
import { todoListMachine } from '../machines';

export default defineComponent({
  name: 'Index',
  components: {
    TodoItem
  },
  setup() {
    const { state, send } = useMachine(todoListMachine);
    return {
      state,
      send
    };
  },
  mounted: function() {
    this.send({
      type: 'HYDRATE',
      items: [{
        title: 'Build Vue Todo App',
        completed: false
      }]
    })
  },
  updated: function() {
    if (this.state.value === 'editing') {
      this.$refs.input.focus();
    } else {
      this.$refs.input.blur();
    }
  },
  methods: {
    handleClick(id: number) {
      this.send({
        type: 'TOGGLE',
        id
      });
    },
    edit() {
      this.send({
        type: 'EDIT'
      });
    },
    cancleEdit() {
      this.send({
        type: 'CANCLE_EDIT'
      });
    },
    submit(e: Event) {
      e.preventDefault();
      this.send({
        type: 'SUBMIT'
      });
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.pageWrap {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  user-select: none;
}

.page {
  width: 100%;
  max-width: calc(600px + 8vw);
  padding: calc(var(--spacing) + 4vw);
}

.titleRow {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: calc(var(--spacing) * 2);
}

.addButton {
  height: 35px;
  width: 35px;
  line-height: 31px;
  text-align: center;
  font-size: 2rem;
  background-color: var(--text-color);
  color: var(--background-color);
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.2s;
}

.buttonEditing {
  transform: rotate(-45deg);
  /* THIS IS A HACK: input blur handles send, so we will disable the button */
  pointer-events: none;
}

.title,
.input {
  display: flex;
  min-width: 0;
  flex: 1;
  font-size: 2rem;
  line-height: 2.5rem;
  margin: 0;
  padding: 10px 0;
  border: none;
  outline: none;
  background-color: transparent;
  color: var(--text-color);
}

.title {
  cursor: pointer;
}

.input {
  padding-right: calc(var(--spacing) * 2);
}

.hide {
  display: none;
}
</style>
