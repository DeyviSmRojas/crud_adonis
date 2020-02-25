'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group('practica', () =>{
    Route.post('user/login', 'UserController.login')
    Route.resource('user', 'UserController')
    // .middleware(['auth'])
    // GET: index
  // GET/:id: show
  // POST: store
  // PUT/:id: update
  // DELTE/:id: destroy

}).prefix('practica/1')
