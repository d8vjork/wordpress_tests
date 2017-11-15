import Vue from 'vue'
import Router from 'vue-router'

// Pages
import HomePage from '@/pages/HomePage'
import SinglePage from '@/pages/SinglePage'
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
      path: '/page/:id',
      name: 'pages.single',
      component: SinglePage
    },
    {
      path: '/author/:id',
      name: 'authors.single',
      component: SingleUserPage
    }
  ]
})
