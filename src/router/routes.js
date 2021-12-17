
import {auth, guest} from "../router/middleware/index";
import Route from "vue-routisan";
Route.setViewResolver( (component) => {
  return require( 'src/pages/' + component).default;
});

Route.view( "/auth", 'layouts/Auth' ).guard( guest ).children( () => {

} );

Route.view( '/', 'layouts/UserLayout' ).guard( auth ).children( () => {
  Route.view('users', 'Users');
  Route.view('tags', 'Tags');
} );

export default Route.all();
