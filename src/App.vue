<template>
  <div id="app">
    <Index/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Index from './pages/Index.vue';

export default defineComponent({
  name: 'App',
  components: {
    Index
  }
});
</script>

<style>
:root {
  --primary-color: #050505;
  --primary-contrastText-color: #ffffff;
  --primary-contrastTextMuted-color: rgba(255,255,255,0.8);

  --accent-color: #cc0033;
  --text-color: #000;
  --text-muted-color: #555555;
  --background-color: #fff;
  --divider-color: rgba(0, 0, 0, 0.12);

  --spacing: 6px;
  --roundness: 4px;
}

@media (prefers-color-scheme: dark) {
  :root {
    --primary-color: #2c2c2c;
    --primary-contrastText-color: #ffffff;
    --primary-contrastTextMuted-color: rgba(255,255,255,0.8);

    --accent-color: #f70737;
    --text-color: #fff;
    --text-muted-color: #555555;
    --background-color: #000;
    --divider-color: rgba(255, 255, 255, 0.12);

    color: var(--text-color);
  }
}

html,
body {
  padding: 0;
  margin: 0;
}

#app {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: var(--background-color);
}

* {
  box-sizing: border-box;
}

p {
  font-size: 1.5rem;
}

p.noPadding {
  padding: 0;
  margin: 0;
}
</style>
