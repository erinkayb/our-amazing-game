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
