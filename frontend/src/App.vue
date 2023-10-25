<template>
  <main class="main">
    <game />
  </main>
</template>

<script>
import game from './components/game.vue'

export default {
  name: 'App',
  components: {
    game
  }
}
</script>

<style>
  .main{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 98vh;
  }
</style> 