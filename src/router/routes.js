// import Login from "pages/auth/Login";
// import Register from "pages/auth/Register";
// import Dashboard from "pages/Dashboard";
// const routes = [
//   // {
//   //   path: '/',
//   //   component: () => import('layouts/Auth.vue'),
//   //   children: [
//   //     { path: '', component: () => import('pages/Index.vue') }
//   //   ]
//   // },
//
//   // Always leave this as last one,
//   // but you can also remove it
//   {
//     path: '/login',
//     name: 'login',
//     component: Login,
//
//   },
//   {
//     path: '/register',
//     name: 'register',
//     component: Register
//   },
//   {
//     path: '/dashboard',
//     name: 'dashboard',
//     component: Dashboard
//   },
//   {
//     path: '/',
//     component: () => import('pages/Index.vue')
//   },
//   {
//     path: '*',
//     component: () => import('pages/Error404.vue')
//   }
// ]
// //
// export default routes

import {auth, guest} from "../router/middleware/index";
import Route from "vue-routisan";
Route.setViewResolver((component) => {
  return require('src/pages/' + component).default;
});

Route.view( "/auth", 'Layouts/Auth' ).guard( guest ).children( () => {} );

Route.view('/' ,'Index')

Route.view( '/', 'Layouts/Auth' ).guard( auth ).children( () => {
  Route.view( 'dashboard', 'Dashboard' );
} );

export default Route.all();
