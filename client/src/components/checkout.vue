<template>
  <v-container grid-list-xl text-md-center>
    <v-layout row wrap>
      <v-flex xs6 offset-xs3>
        <div class="white elevation-24">
          <v-toolbar flat dense class='light-green accent-4' dark>
              <v-toolbar-title>
                <v-flex>
                  Donate
                </v-flex>
              </v-toolbar-title>
            </v-toolbar>
            <div class='pl-4 pr-4 pt-4 pb-4'>
              <v-flex>
                <p>Help us continue to make awesome games.</p>
                <div class="input-group">
                  <v-text-field
                    type="number"
                    class="form-control"
                    v-model="amount"
                    prefix="$"
                    suffix=".00"
                    aria-label="Amount (to the nearest dollar)">
                  </v-text-field>
                </div>
                <br><br><br>
               <paypal :amount="amount"></paypal>
              </v-flex>
            </div>
            <a @click="navigateTo({
            name: 'loggedin',
            params: {
              userID: users.id
            }
            })">
        <strong> Back </strong></a>
          </div>
      </v-flex>
    </v-layout>
 </v-container>
</template>
<script>
import Paypal from './Paypal'
import userservice from '@/services/userservice'
export default {
  name: 'checkout',
  data () {
    return {
      users: [],
      amount:5
    }
  },
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    }
  },
   components: {
            'paypal': Paypal
        },
}
</script>
<style scoped>
  .form-control{
    max-width: 100px;
    text-align: center;
    display: inline-block;
  }
  a {
    font-size: 20px;
  }
</style>
