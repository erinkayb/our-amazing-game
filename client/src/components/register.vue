<template>
  <!-- <v-container grid-list-xl text-md-center> -->
    <!-- <v-layout row wrap>
      <v-flex xs6 offset-xs3>
        <div class="white elevation-24">
          <v-toolbar flat dense class='blue-grey darken-3' dark>
            <v-toolbar-title>
              Register
            </v-toolbar-title>
          </v-toolbar>
          <div class='pl-4 pr-4 pt-4 pb-4'>
            <v-flex>
              <form
                name="ourgame-signup-form"
                autocomplete="off">
              <v-text-field
                label="Name"
                box
                v-model="name"
              ></v-text-field>
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
              @click="register">
              Register
            </v-btn>
          </div>
        </div>
      </v-flex>
    </v-layout> -->
    <div>
      <div class="circle">
        <span class="circlespan">
          <h1>Register</h1>
          <v-flex>
            <form
              name="ourgame-signup-form"
              autocomplete="off">
            <v-text-field
              label="Name"
              box
              v-model="name"
            ></v-text-field>
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
        </span>
      </div>
      <div class="groupcircles">
        <div class="circle2">
          <span class="circlespansmall">Login</span>
        </div>
        <div class="circle4">
          <span class="circlespansmall">Home</span>
        </div>
      </div>
      <img src="https://res.cloudinary.com/erinkayb/image/upload/v1543240847/radOrange.png" alt="">
    </div>
  <!-- </v-container> -->
</template>

<script>
import authService from '@/services/auth'
export default {
  data () {
    return {
      name: '',
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async register () {
      try {
        const response = await authService.register({
          name: this.name,
          email: this.email,
          password: this.password
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        this.$router.push({
          name: 'login'
        })
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>

<style scoped>
.circlespan{
    position: absolute;
    left: 5%;
    top: 30%;
    margin: 0 auto;
    width: 90%;
    text-align: center;
    color: black;
}
.circlespansmall{
    position: absolute;
    left: 5%;
    top: 30%;
    margin: 0 auto;
    width: 90%;
    text-align: center;
    font-size: 40px;
    color: white;
}
.circle{
    /* margin: 0 auto; */
    position: fixed;
    width: 100px;
    height: 100px;
    padding: 25%;
    border-radius: 50%;
    background-color: #F5EDF0;
    z-index: 2;
    left: 200px;
    /* margin: 1em; */
}
.circle2 {
    position: absolute;
    width: 50px;
    height: 50px;
    padding: 7%;
    border-radius: 50%;
    background-color: #e515e1;
    bottom: 10%;
    right: 200px;
    z-index: 1;
}
.circle4 {
  position: absolute;
  width: 50px;
  height: 50px;
  padding: 7%;
  border-radius: 50%;
  background-color: #64dd17;
  bottom: 38%;
  right: 200px;
  z-index: 1;
}
.circle2:hover{
  background-color: #ef6c00;
}
.circle4:hover{
  background-color: #ef6c00;
}
h1{
  margin-top: -10px;
}
img{
  position:fixed;
  max-height: 200px;
  left: 66%;
}
</style>
