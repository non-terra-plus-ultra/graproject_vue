import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from "../views/LoginAndRegister/Login.vue"
// import aaBb from "../views/LoginAndRegister/aaBb.vue"
//import getPic from "@components/getPic.vue"
// import jiLian from "../components/jiLian.vue"
import userMain3 from "../views/User/userMain3.vue"
// import frmFirst from "@/components/frmFirst.vue"
import Register from "../views/LoginAndRegister/Register.vue"
import showSegment from "@/components/showSegment.vue"
import showAll from "@/components/showAll.vue"
import segment from "@/components/segment.vue"
import detect from "@/components/detect.vue"
import statistics from "@/components/statistics.vue"
import statisticsSegment from "@/components/statisticsSegment.vue"
import userInfo from "@/components/userInfo.vue"
import ManagerLogin from "@/views/Manager/LoginMan.vue"
import managerMain from "@/views/Manager/managerMain.vue"
import show from "@/components/show.vue"
import showSegment2 from "@/components/showSegment2.vue"
import userManager from "@/components/userManager.vue"
import videoMain from "@/components/videoMain.vue"
const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace(location){
  return originalReplace.call(this , location).catch(err=>err)
}
Vue.use(VueRouter)


const routes = [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register
    },
    
    {
      path: '/userMain3',
      name: 'userMain3',
      component: userMain3,
      redirect:{name: "showAll"},
    children:[
        {
          path: "/showAll",
          name: "showAll",
          component: showAll,
          meta: {
            title: "查看异物记录"
          }
        },
        {
          path: "/showSegment",
          name: "showSegment",
          component: showSegment,
          meta: {
            title: "查看历史覆冰记录"
          }
        },
        {
          path: "/statistics",
          name: "statistics",
          component: statistics,
          meta: {
            title: "查看异物统计图"
          }
        },
        {
          path: "/statisticsSegment",
          name: "statisticsSegment",
          component: statisticsSegment,
          meta: {
            title: "查看覆冰统计图"
          }
        },
        {
          path: "/detect",
          name: "detect",
          component: detect,
          meta: {
            title: "异物检测"
          }
        },
        {
          path: "/segment",
          name: "segment",
          component: segment,
          meta: {
            title: "覆冰检测"
          }
        },
        {
          path: "/userInfo",
          name: "userInfo",
          component: userInfo,
          meta: {
            title: "个人信息"
          }
        },
        {
          path: "/videoMain",
          name: "videoMain",
          component: videoMain,
          meta: {
            title: "视频检测"
          }
        },
      ]
      
    },
    {
      path: '/ManagerLogin',
      name: 'ManagerLogin',
      component: ManagerLogin
    },
    {
      path: '/managerMain',
      name: 'managerMain',
      component: managerMain,
      redirect:{name: "show"},
    children:[
        {
          path: "/show",
          name: "show",
          component: show,
          meta: {
            title: "查看异物记录"
          }
        },
        {
          path: "/showSegment2",
          name: "showSegment2",
          component: showSegment2,
          meta: {
            title: "查看历史覆冰记录"
          }
        },
        {
          path: "/userManager",
          name: "userManager",
          component: userManager,
          meta: {
            title: "用户列表界面"
          }
        },

   
        
        
       
      ]
      
    },
    // {
    //   path: '/userLogin',
    //   name: 'userMain2',
    //   component: userMain2,
    //   redirect:{name: "jiLian"},
    // children:[
    //     {
    //       path: "/jiLian",
    //       name: "jiLian",
    //       component: jiLian,
    //       meta: {
    //         title: "首页"
    //       }
    //     },
    //   ]
      
    // },
]

const router = new VueRouter({
  routes
})

export default router
