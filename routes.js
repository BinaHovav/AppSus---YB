import HomePage from './views/HomePage.js'
import AboutUs from './views/AboutUs.js'

import bMail from './apps/mail/pages/EmailIndex.js'
import EmailDetails from './apps/mail/pages/EmailDetails.js'

import yKeep from './apps/keep/pages/KeepIndex.js'

const { createRouter, createWebHashHistory } = VueRouter

const routerOptions = {
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: HomePage,
    },
    {
      path: '/about',
      component: AboutUs,
    },
    {
      path: '/mail',
      component: bMail,
    },
    {
      path: '/mail/:emailId',
      component: EmailDetails,
    },
    {
      path: '/keep',
      component: yKeep,
    },
  ],
}

export const router = createRouter(routerOptions)
