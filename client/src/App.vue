<template>
  <div id="app">
    <v-app>
      <nav-header class="navHeader"></nav-header>
      <main>
        <v-container fluid>
        
          <router-view/>
        </v-container>
      </main>
    </v-app>
  </div>
</template>

<script>

import NavHeader from '@/components/Header.vue'
export default {
  name: 'App',
  components: {
    NavHeader
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #263238;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
