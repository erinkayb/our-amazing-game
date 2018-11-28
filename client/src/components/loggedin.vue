<template lang="html">
  <v-container>
    <div class="logo">
      <img src="https://res.cloudinary.com/erinkayb/image/upload/v1543335773/radwarsOrange.png" alt="">
    </div>

    <div class="welcome" v-for="u in users":key="u.name">
      Welcome, {{u.name}}!
    </div>

        <a @click="navigateTo({
        name: 'checkout',
        params: {
          userID: users.id
        }
        })">
        <div class='square-box2'>
        <div class='square-content2'>
          <div>
            <span>Donate</span>
          </div>
        </div>
      </div>
      </a>
      <div class='square-box3'>
      <div class='square-content3'>
        <div>
          <span class='font'>
            <h2>Your Stats</h2>
            <br/>
            <p>You have 20 wins</p>
            <p>You have 28 loses</p>
          </span>
        </div>
      </div>
    </div>
      <a :href="'http://localhost:3000'" target="_blank">
        {{ url }}
        <div class='square-box'>
        <div class='square-content'>
          <div>
            <span>Play Game</span>
          </div>
        </div>
      </div>
    </a>
<!-- Ads -->
      <!-- <v-flex xs4 mt-5 justify-space-around>
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
      </v-flex> -->

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
.green{
  color: white;
}
.welcome {
  font-family: 'Orbitron', sans-serif;
  font-size: 100px;
  transform: skewY(-13deg);
  color: #64dd17;
  margin-top: 90px;
  float: left;
  text-shadow: 2px 2px white;
}
img{
  position:fixed;
  max-height: 200px;
  left: 0;
  top: 15px;
  animation: 1s ease-out 0s 1 slideInFromLeft;
}
a{
  text-decoration: none;
  color: white;
  font-size: 40px;

}
.square-box{
    position: relative;
    margin-top: 20%;
    margin-left: 60%;
    margin-right: 20%;
    padding: 12%;
    overflow: hidden;
    border-radius: 30%;
    background-color: #ef6c00;
  }
.square-box:before{
    content: "";
    display: block;
    padding-top: 10%;
}
.square-content{
    position:  absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    color: white;
}
.square-content div {
   display: table;
   width: 100%;
   height: 100%;
}
.square-content span {
    display: table-cell;
    text-align: center;
    vertical-align: middle;
    color: white
}
.square-box2{
    position: fixed;
    margin-top: 25%;
    margin-left: 10%;
    margin-right: 30%;
    padding: 7%;
    overflow: hidden;
    border-radius: 30%;
    background-color: #ef6c00;
  }
.square-box2:before{
    content: "";
    display: block;
    padding-top: 10%;
}
.square-content2{
    position:  absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    color: white;
}
.square-content2 div {
   display: table;
   width: 100%;
   height: 100%;
}
.square-content2 span {
    display: table-cell;
    text-align: center;
    vertical-align: middle;
    color: white
}
.square-box3{
    position: fixed;
    margin-top: 20%;
    margin-left: 33%;
    margin-right: 30%;
    padding: 10%;
    overflow: hidden;
    background-color: #F5EDF0;
  }
.square-box3:before{
    content: "";
    display: block;
    padding-top: 10%;
}
.square-content3{
    position:  absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    color: white;
}
.square-content3 div {
   display: table;
   width: 100%;
   height: 100%;
}
.square-content3 span {
    display: table-cell;
    text-align: center;
    vertical-align: middle;
    color: blue;
}
</style>
