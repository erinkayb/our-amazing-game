<template lang="html">

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
        async register () {
          try {
            const response = await authService.register({
              email: this.email,
              password: this.password
            })
            this.$store.dispatch('setToken', response.data.token)
            this.$store.dispatch('setUser', response.data.user)
          } catch (error) {
            this.error = error.response.data.error
          }
        }
      }
    }
</script>

<style lang="css">
</style>
