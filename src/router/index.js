import Vue from 'vue'
import Router from 'vue-router'
import CreateCase from '@/views/CreateTestTemplate'
import CreateBox from '@/views/CreateBox'
import BoxInstance from '@/views/BoxInstance'

Vue.use(Router)

const NotFoundView = Vue.component('NotFoundView', {
  template: '<h1>...Ops, 404</h1>'
})

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/boxinstance'
    },
    {
      path: '/404',
      name: 'NotFoundView',
      component: NotFoundView
    },
    {
      path: '/createtesttemplate',
      name: 'CreateTestTemplate',
      component: CreateCase
    },
    {
      path: '/createbox',
      name: 'CreateBox',
      component: CreateBox
    },
    {
      path: '/boxinstance',
      name: 'BoxInstance',
      component: BoxInstance
    }
  ]
})
