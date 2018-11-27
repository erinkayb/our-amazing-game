<template>
  <div id="app">
    <v-app>
      <!-- <nav-header/> -->
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
body{
  margin: auto;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-image: url(https://res.cloudinary.com/erinkayb/image/upload/v1543239154/overlayblack.png);
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Do not repeat the image */
  background-size: cover;
}
</style>
