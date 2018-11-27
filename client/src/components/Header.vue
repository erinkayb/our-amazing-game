<template>
  <v-btn flat right large flat dark v-if='$store.state.isUserLoggedIn' class='colors' @click="logout">
    Logout
  </v-btn>
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
