import Vue from 'vue'
import Router from 'vue-router'
import commonRouter from './router'
import diffRouter from '@/assets/scripts/router'

Vue.use(Router)

export default new Router({
  routes: diffRouter.concat(commonRouter)
})
