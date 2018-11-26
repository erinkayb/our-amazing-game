<template lang="html">
  <v-container grid-list-xl text-md-center>
    <v-layout row wrap>
      <v-flex xs6>
        <div class="white elevation-24">
          <v-toolbar flat dense class='light-green accent-4' dark>
              <v-toolbar-title>
                <v-flex v-for="u in users":key="u.name">
                  Welcome, {{u.name}}!
                </v-flex>
              </v-toolbar-title>
            </v-toolbar>
            <div class='pl-4 pr-4 pt-4 pb-4'>
              <v-flex>
                Your stats? Maybe.... I don't know
                <br/>
                <v-btn @click="navigateTo({
                  name: 'checkout',
                  params: {
                    userID: users.id
                  }
                  })">
                  Donate</router-link>
              </v-btn>
            </v-flex>
            </div>
          </v-toolbar>
          </div>
      </v-flex>
      <v-flex xs6>
        <div class="white elevation-24">
          <v-toolbar flat dense class='light-green accent-4' dark>
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
<!-- Ads -->
      <v-flex xs4 mt-5 justify-space-around>
            <div class='pl-4 pr-4 pt-4 pb-4'>
                <v-img
                  src="https://res.cloudinary.com/erinkayb/image/upload/v1542988856/Screen_Shot_2018-11-23_at_17.00.43.png"
                  aspect-ratio="1.75"
                ></v-img>
            </div>
      </v-flex>
      <v-flex xs4 mt-5>
            <div class='pl-4 pr-4 pt-4 pb-4'>
                <v-img
                  src="https://res.cloudinary.com/erinkayb/image/upload/v1542988710/ad.png"

                ></v-img>
            </div>
      </v-flex>
      <v-flex xs4 mt-5>
            <div class='pl-4 pr-4 pt-4 pb-4'>
                <v-img
                  src="https://res.cloudinary.com/erinkayb/image/upload/v1542988710/ad.png"

                ></v-img>
            </div>
      </v-flex>

<!-- - -->
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
  },
methods: {
  navigateTo (route) {
        this.$router.push(route)
      }
}
}

</script>

<style scoped>
.green{
  color: white;
}
</style>
