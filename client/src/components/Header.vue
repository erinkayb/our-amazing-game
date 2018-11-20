<template>
    <v-toolbar fixed color="blue-grey darken-3" dark>
      <v-toolbar-title>
        <router-link class='colors' to="/">Our Game</router-link>
      </v-toolbar-title>

    <v-spacer></v-spacer>

    <v-toolbar-items>
        <v-btn flat dark class='btncolor' v-if='!$store.state.isUserLoggedIn'>
          <router-link class='colors' to="register">Sign Up</router-link>
        </v-btn>
        <v-btn flat dark class='btncolor' v-if='!$store.state.isUserLoggedIn'>
          <router-link class='colors' to="login">Login</router-link>
        </v-btn>
        <v-btn flat dark v-if='$store.state.isUserLoggedIn' class='colors' @click="logout">
          Logout
        </v-btn>
      </v-toolbar-items>

    </v-toolbar>
</template>

<script>
export default {
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    },
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push({
        name: 'home'
      })
    }
  }
}
</script>

<style scoped>
  .colors{
    color: white;
    text-decoration: none;
  }
  .btncolor:hover{
    color: #76FF03;
  }
</style>
