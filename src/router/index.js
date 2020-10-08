import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/Login'
import Questionnaire from '../views/Questionnaire'
import Programming from '../views/Programming'
import Discussion from '../views/Discussion'
import Feedback from '../views/Feedback'
import TA from '../views/TA'

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
    },
    {
      path: '/discussion',
      name: 'Discussion',
      component: Discussion
    },
    {
      path: '/feedback',
      name: 'Feedback',
      component: Feedback
    },
    {
      path: '/TA',
      name: 'TA',
      component: TA
    }
  ]
})
