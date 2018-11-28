import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import register from '@/components/register'
import Login from '@/components/Login'
import loggedin from '@/components/loggedin'
import checkout from '@/components/checkout'
import Paypal from '@/components/Paypal'
import checkoutpaypal from '@/components/checkoutpaypal'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: HelloWorld
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/loggedin/:userId',
      name: 'loggedin',
      component: loggedin
    },
    {
      path: ':userId/checkout/',
      name: 'checkout',
      component: checkout
    },
    {
      path: '/checkoutpaypal',
      name: 'checkoutpaypal',
      component: checkoutpaypal
    }
  ]
})
