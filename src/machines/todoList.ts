import { createMachine, assign } from '@xstate/fsm';

type MachineState =
  | { value: 'dehydrated'; context: MachineContext }
  | { value: 'idle'; context: MachineContext }
  | { value: 'editing'; context: MachineContext };

type MachineContext = { 
  idCounter: number;
  items: {
    id: number;
    title: string;
    completed: boolean;
  }[];
  inputValue: string;
};

type MachineEvent = 
  | { type: 'HYDRATE'; items: { title: string; completed: boolean }[] }
  | { type: 'TOGGLE'; id: number }
  | { type: 'EDIT' }
  | { type: 'CANCLE_EDIT' }
  | { type: 'SUBMIT' };


export const todoListMachine = createMachine<MachineContext, MachineEvent, MachineState>({
  id: 'todoList',
  initial: 'dehydrated',
  context: {
    idCounter: 0,
    items: [],
    inputValue: ''
  },
  states: {
    dehydrated: {
      on: {
        HYDRATE: {
          target: 'idle',
          actions: ['hydrate']
        }
      }
    },
    idle: {
      on: {
        TOGGLE: {
          actions: ['toggle']
        },
        EDIT: {
          target: 'editing'
        }
      }
    },
    editing: {
      on: {
        CANCLE_EDIT: {
          target: 'idle'
        },
        SUBMIT: {
          target: 'idle',
          actions: ['submit']
        }
      }
    }
  }
}, {
  actions: {
    hydrate: assign<MachineContext, MachineEvent>((ctx, evt) => {
      if (evt.type !== 'HYDRATE') {
        return {};
      }

      let { items } = evt;
      let idCounter = ctx.idCounter;

      items = items.map(item => ({
        ...item,
        id: idCounter++
      }));
      
      return {
        ...ctx,
        items,
        idCounter
      };
    }),
    submit: assign<MachineContext, MachineEvent>((ctx, evt) => {
      if (evt.type !== 'SUBMIT') {
        return {};
      }

      const items = ctx.items.slice(0);
      const title = ctx.inputValue;
      let idCounter = ctx.idCounter;

      items.push({
        title,
        completed: false,
        id: ++idCounter
      })
      
      return {
        ...ctx,
        items,
        idCounter,
        inputValue: ''
      };
    }),
    toggle: assign<MachineContext, MachineEvent>((ctx, evt) => {
      if (evt.type !== 'TOGGLE') {
        return {};
      }

      const { id } = evt;
      const items = ctx.items.slice(0);

      const updateIndex = items.findIndex(item => item.id === id);

      items[updateIndex].completed = !items[updateIndex].completed;
      
      return {
        ...ctx,
        items
      };
    })
  }
})