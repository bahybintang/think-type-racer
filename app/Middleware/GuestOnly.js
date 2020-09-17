"use strict";
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class NotLoggedIn {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ response, auth }, next) {
    try {
      await auth.check();
      var loggedIn = true;
    } catch {}
    if (loggedIn) return response.redirect("/");
    await next();
  }

  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async wsHandle({ request }, next) {
    // call next to advance the request
    await next();
  }
}

module.exports = NotLoggedIn;
