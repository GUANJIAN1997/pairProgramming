import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/Login'
import Questionnaire from '../views/Questionnaire'
import Programming from '../views/Programming'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/questionnaire',
      name: 'Questionnaire',
      component: Questionnaire
    },
    {
      path: '/programming',
      name: 'Programming',
      component: Programming
    }
  ]
})
