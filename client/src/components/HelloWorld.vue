<template>
  <v-container grid-list-xl text-md-center>
    <v-layout row wrap>
      <v-flex sm12>
        <div class="white elevation-24">
          <v-toolbar flat dense class=' light-green accent-4' dark>
            <v-toolbar-title>
              Welcome to our world
            </v-toolbar-title>
          </v-toolbar>
          <div class='pl-4 pr-4 pt-4 pb-4'>
            <v-flex>
              <div class="text-xs-center">
                <v-btn round block large class="orange darken-3" dark>Register</v-btn>
                <v-btn round block large class="orange darken-3" dark>Login</v-btn>
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
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
