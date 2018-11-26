<template>
  <div>
    <div id="paypal-button-container"></div>
    <div v-if="success" class="alert alert-success">
      <strong>Success!</strong> Payment successfuly done
    </div>
    <div v-if="error" class="alert alert-danger">
      <strong>Ooops!</strong>  something went wrong
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
    name:'paypal',
    props:['amount'],
    data (){
        return {
            error:false ,
            success:false
        }
    },
    mounted(){
            paypal.Button.render({

            env: 'sandbox', // sandbox | production

            // PayPal Client IDs - replace with your own
            // Create a PayPal app: https://developer.paypal.com/developer/applications/create
            client: {
                sandbox: 'AaF-Lr3-drxBPjahmfsMeHipQaU0ZS33OH3cveCepePNnBw-ezVgUZaHVxKPIRkzRnBM3Mx9Kb1VTDeA'
            },

            // Show the buyer a 'Pay Now' button in the checkout flow
            commit: true,

            // payment() is called when the button is clicked
            payment: function(data, actions) {

                // Make a call to the REST api to create the payment
                return actions.payment.create({
                    payment: {
                        transactions: [
                            {
                                amount: { total: '0.01', currency: 'USD' }
                            }
                        ]
                    }
                });
            },

            // onAuthorize() is called when the buyer approves the payment
            onAuthorize: function(data, actions) {

                // Make a call to the REST api to execute the payment
                return actions.payment.execute().then(function() {
                    window.alert('Payment Complete!');
                });
            }

        }, '#paypal-button-container');
    }
}

</script>
