<template>
  <v-container >
    <div class="logo">
      <img src="https://res.cloudinary.com/erinkayb/image/upload/v1543240847/radOrange.png" alt="">
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

.parallelogram-container{
  margin-top: 200px;
  width: 70%;
  border: 3px solid #ef6c00;
  background-color: white;
  transform: skewY(-10deg);
  -webkit-box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
  -moz-box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
  box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
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
