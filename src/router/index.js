import Vue from 'vue'
import VueRouter from 'vue-router'
import {constantRouterMap} from '@/config/router.config'

//hack router.push方法3.1版本后出现的"NavigationDuplicated"错误
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: constantRouterMap
})

export default router
