"use strict";
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class GotOAuthDetail {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ response, session }, next) {
    if (!session.get("userDetails")) return response.redirect("/");
    // call next to advance the request
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

module.exports = GotOAuthDetail;
