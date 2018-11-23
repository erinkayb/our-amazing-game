<template lang="html">
  <v-container grid-list-xl text-md-center>
    <v-layout row wrap>
      <v-flex xs6>
        <div class="white elevation-24">
          <v-toolbar flat dense class='blue-grey darken-3' dark>
            <v-toolbar-title>
              Welcome
            </v-toolbar-title>
          </v-toolbar>
          <div class='pl-4 pr-4 pt-4 pb-4'>
            <v-flex v-for="u in users":key="u.name">
              {{u.name}}

            </v-flex>
          </div>
        </div>
      </v-flex>
      <v-flex xs6>
        <div class="white elevation-24">
          <v-toolbar flat dense class='blue-grey darken-3' dark>
            <v-toolbar-title>
              Ready to play?
            </v-toolbar-title>
          </v-toolbar>
          <div class='pl-4 pr-4 pt-4 pb-4'>
            <v-flex>
              <div class="text-xs-center">
                <v-btn round block large class="orange darken-3" dark>Enter Game</v-btn>
              </div>
            </v-flex>
          </div>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import userservice from '@/services/userservice'
export default {
  data () {
    return {
      users: []
    }
  },
  async mounted () {
    this.users.push( (await userservice.index()).data)
    console.log("users:",this.users);
  }
}
</script>

<style scoped>
</style>
