import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/Login'
import Questionnaire from '../views/Questionnaire'
import Programming from '../views/Programming'
import Discussion from '../views/Discussion'
import Feedback from '../views/Feedback'
import TA from '../views/TA'
import Teaching from '../views/Teaching'
import ChildTeaching from '../views/ChildTeaching'
import Check from '../views/Check'

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
    },
    {
      path: '/TA/teaching',
      name: 'Teaching',
      component: Teaching
    },
    {
      path: '/childTeaching',
      name: 'ChildTeaching',
      component: ChildTeaching
    },
    {
      path: '/check',
      name: 'Check',
      component: Check
    }
  ]
})
