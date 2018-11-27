<template>
  <v-container >
    <div class="logo">
      <img src="https://res.cloudinary.com/erinkayb/image/upload/v1543335773/radwarsOrange.png" alt="">
    </div>
    <a href="/#/"><div class="parallelogram-container-two">Home</div></a>
    <a href="/#/register"><div class="parallelogram-container-three">Register</div></a>
    <div class="parallelogram-container">
      <h1>Login</h1>
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
            <v-btn large flat class="regbtn"
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

<style scoped>

html { height: 100%; display: flex; }
body { margin: auto; }

p{
  color: #006EAA;
  padding: 60px 100px 40px 100px;
  transform: skewY(10deg);
  text-align: center;
  max-width: 400px;
}
@keyframes fadein {
    from {
        opacity:0;
    }
    to {
        opacity:1;
    }
}
@-moz-keyframes fadein { /* Firefox */
    from {
        opacity:0;
    }
    to {
        opacity:1;
    }
}
@-webkit-keyframes fadein { /* Safari and Chrome */
    from {
        opacity:0;
    }
    to {
        opacity:1;
    }
}
@-o-keyframes fadein { /* Opera */
    from {
        opacity:0;
    }
    to {
        opacity: 1;
    }
}
@keyframes slideInFromLeft {
0% {
  transform: translateX(100%);
}
100% {
  transform: translateX(0);
}
}
.parallelogram-container{
  margin-top: 200px;
  width: 70%;
  border: 3px solid #ef6c00;
  background-color: white;
  transform: skewY(-10deg);
  -webkit-box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
  -moz-box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
  box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
  animation: fadein 3s;
 -moz-animation: fadein 3s; /* Firefox */
 -webkit-animation: fadein 3s; /* Safari and Chrome */
 -o-animation: fadein 3s; /* Opera */
}
.parallelogram-container-two{
  position: absolute;
  right: 100px;
  height: 10%;
  width: 20%;
  font-size: 40px;
  border: 1px solid black;
  background-color: #64dd17;
  transform: skewY(10deg);
  -webkit-box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
  -moz-box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
  box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
  animation: fadein 3s;
 -moz-animation: fadein 3s; /* Firefox */
 -webkit-animation: fadein 3s; /* Safari and Chrome */
 -o-animation: fadein 3s; /* Opera */
}
.parallelogram-container-three{
  position: absolute;
  top: 150px;
  right: 100px;
  height: 10%;
  width: 20%;
  font-size: 40px;
  border: 1px solid black;
  background-color: #64dd17;
  transform: skewY(10deg);
  -webkit-box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
  -moz-box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
  box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
  animation: fadein 3s;
 -moz-animation: fadein 3s; /* Firefox */
 -webkit-animation: fadein 3s; /* Safari and Chrome */
 -o-animation: fadein 3s; /* Opera */
}
.parallelogram-container-two:hover{
  background-color: #e515e1;
}
.parallelogram-container-three:hover{
  background-color: #e515e1;
}
img{
  position:fixed;
  max-height: 200px;
  left: 60px;
  animation: 1s ease-out 0s 1 slideInFromLeft;

}
a{
  text-decoration: none;
  color: white;
}
.regbtn{
    background-color: #0071bc;
    color:white;
}
</style>
