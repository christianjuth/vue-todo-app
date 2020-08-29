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
          v-on:blur="edit"
          v-model="state.context.inputValue"
          ref="input"
        />

        <div 
          class="addButton"
          :class="{ rotate45: state.value === 'editing' }"
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
      if (this.state.value === 'editing') {
        console.log('focus')
        setTimeout(() => {
          this.$refs.input.focus()
        }, 50)
      }
    },
    submit(e: Event) {
      e.preventDefault();
      this.send({
        type: 'SUBMIT',
        title: 'TEST TEST'
      })
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
  min-height: 100vh;
}

.page {
  width: 500px
}

.titleRow {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.addButton {
  height: 35px;
  width: 35px;
  line-height: 30px;
  text-align: center;
  font-size: 2rem;
  background-color: var(--text-color);
  color: var(--background-color);
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.2s;
}

.rotate45 {
  transform: rotate(-45deg);
}

.title,
.input {
  font-size: 2rem;
  line-height: 2.5rem;
  margin: 0;
  padding: 10px 0;
  margin-bottom: 10px;
  border: none;
  outline: none;
  background-color: transparent;
  color: var(--text-color);
}

.hide {
  display: none;
}
</style>
