<template>
  <v-container grid-list-xl text-md-center>
    <v-layout row wrap>
      <v-flex xs6>
        <div class="white elevation-24">
          <v-toolbar flat dense class='light-green accent-4' dark>
              <v-toolbar-title>
                <v-flex>
                  Checkout
                </v-flex>
              </v-toolbar-title>
            </v-toolbar>
            <div class='pl-4 pr-4 pt-4 pb-4'>
              <v-flex>
                <div class="input-group">
                  <span class="input-group-addon">$</span>
                  <input type="number" class="form-control" v-model="amount" aria-label="Amount (to the nearest dollar)">
                  <span class="input-group-addon">.00</span>
                </div>
                <br><br><br>
               <paypal :amount="amount"></paypal>
              </v-flex>
            </div>
          </div>
      </v-flex>
    </v-layout>
 </v-container>
</template>
<script>
import Paypal from './Paypal'
export default {
  name: 'checkout',
  data () {
    return {
      amount:5
    }
  },
   components: {
            'paypal': Paypal
        },
}
</script>
