<template>
  <v-container grid-list-xl text-md-center>
    <v-layout row wrap>
      <v-flex xs6 offset-xs3>
        <div class="white elevation-24">
          <v-toolbar flat dense class='blue-grey darken-3' dark>
            <v-toolbar-title>
              Login
            </v-toolbar-title>
          </v-toolbar>
          <div class='pl-4 pr-4 pt-4 pb-4'>
            <v-flex>
              <form
                name="ourgame-signup-form"
                autocomplete="off">
              <v-text-field
                label="Email"
                box
                v-model="email"
              ></v-text-field>
              <v-text-field
                label="Password"
                type="password"
                box
                v-model="password"
                autocomplete="new-password"
              ></v-text-field>
            </form>
            </v-flex>

            <div class="error" v-html="error"></div>
            <v-btn class='elevation-8 blue-grey darken-3' dark
              @click="login">
              <!-- $navigateTo({
                name: 'loggedin',
                params: {
                  userId: user.id
                }
                }) -->
              Login
            </v-btn>
          </div>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import authService from '@/services/auth'
export default {

  data () {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async login () {
      try {
        const response = await authService.login({
          email: this.email,
          password: this.password
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        if(response){
        this.$router.push({
          name: 'loggedin',
          params: {
            userId: response.data.user.id
          }
        })
      }
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>

<style lang="css">
</style>
