import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/Home'
import Login from '@/components/login/Login'
import List from '@/components/list/List'
import Person from '@/components/person/Person'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // },
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/list',
      name: 'List',
      component: List
    },
    {
      path: '/person',
      name: 'Person',
      component: Person
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ],
  mode: 'history',
})
