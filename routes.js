import HomePage from './views/HomePage.js'
import AboutUs from './views/AboutUs.js'

import bMail from './apps/mail/pages/EmailIndex.js'
import EmailList from './apps/mail/cmps/EmailList.js'
import EmailDetails from './apps/mail/pages/EmailDetails.js'
import EmailCompose from './apps/mail/cmps/EmailCompose.js'

import yKeep from './apps/keep/pages/KeepIndex.js'

import BookIndex from './apps/bybooks/pages/BookIndex.js'
import BookDetails from './apps/bybooks/pages/BookDetails.js'
import BookEdit from './apps/bybooks/pages/BookEdit.js'

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
      children: [
        {
          path: 'inbox',
          component: EmailList,
          children: [
            {
              path: '/compose',
              component: EmailCompose,
            },
          ],
        },
        {
          path: '/mail/:emailId',
          component: EmailDetails,
        },

        { path: 'sent', component: EmailList },
        { path: 'starred', component: EmailList },
        { path: 'trash', component: EmailList },
        { path: 'draft', component: EmailList },
      ],
    },

    {
      path: '/keep',
      component: yKeep,
    },
    {
      path: '/book',
      component: BookIndex,
    },
    {
      path: '/book/:bookId',
      component: BookDetails,
    },
    {
      path: '/book/edit/:bookId?',
      component: BookEdit,
    },
  ],
}

export const router = createRouter(routerOptions)
