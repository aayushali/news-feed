import Login from "pages/auth/Login";
import Register from "pages/auth/Register";
const routes = [
  // {
  //   path: '/',
  //   component: () => import('layouts/MainLayout.vue'),
  //   children: [
  //     { path: '', component: () => import('pages/Index.vue') }
  //   ]
  // },
  {
    path: '/',
    component: () => import('pages/Index.vue')
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/login',
    name: 'login',
    component: Login,

  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
