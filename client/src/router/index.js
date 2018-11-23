import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
// import register from '@/components/register'
// import Login from '@/components/Login'
//import game from '@/components/game'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: ()=>import('@/components/HelloWorld')
    },
    {
      path: '/register',
      name: 'register',
      component: ()=>import('@/components/register')
    },
    {
      path: '/login',
      name: 'login',
      component: ()=>import('@/components/Login')
    },
    {
      path: '/game',
      name: 'game',
      component: ()=>import('@/components/game.vue')
    }
  ]
})
