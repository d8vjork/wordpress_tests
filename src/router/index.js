import Vue from 'vue'
import Router from 'vue-router'

// Pages
import HomePage from '@/pages/HomePage'
import SinglePostPage from '@/pages/SinglePostPage'
import SingleUserPage from '@/pages/SingleUserPage'

Vue.use(Router)

export default new Router({
  linkActiveClass: '',
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/post/:id',
      name: 'posts.single',
      component: SinglePostPage
    },
    {
      path: '/author/:id',
      name: 'authors.single',
      component: SingleUserPage
    }
  ]
})
