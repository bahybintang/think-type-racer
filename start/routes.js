"use strict";

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
const Route = use("Route");

Route.on("/").render("welcome");

Route.group(() => {
  Route.get("google", "AuthController.redirectGoogle")
    .as("login.google")
    .middleware("guest");
  Route.get(
    "google/authenticated",
    "AuthController.authenticatedGoogle"
  ).middleware("guest");
  Route.get("facebook", "AuthController.redirectFacebook")
    .as("login.facebook")
    .middleware("guest");
  Route.get(
    "facebook/authenticated",
    "AuthController.authenticatedFacebook"
  ).middleware("guest");
}).prefix("login");

Route.get("logout", "AuthController.logout");
Route.get("pickusername", "AuthController.pickUsername")
  .as("pickusername.input")
  .middleware("gotoauthdetail");
Route.post("pickusername", "AuthController.registerUsername")
  .as("pickusername.register")
  .middleware("gotoauthdetail");
Route.get("room/:room_id", "RoomController.index")
  .as("room")
  .middleware("auth");
