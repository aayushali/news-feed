
import {auth, guest} from "../router/middleware/index";
import Route from "vue-routisan";
Route.setViewResolver((component) => {
  return require('src/pages/' + component).default;
});

Route.view( "/auth", 'layouts/Auth' ).guard( guest ).children( () => {
} );

Route.view('/' ,'Index')
Route.view('/admin', 'layouts/UserLayout' ).children(()=> {
  Route.view('users', 'Users');
});

Route.view( '/', 'layouts/Auth' ).guard( auth ).children( () => {
  Route.view( 'dashboard', 'Dashboard' );
} );


export default Route.all();
