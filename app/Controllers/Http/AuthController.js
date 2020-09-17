"use strict";
const User = use("App/Models/User");
const crypto = require("crypto");
const { validate } = use("Validator");

class AuthController {
  async redirectFacebook({ ally }) {
    await ally.driver("facebook").redirect();
  }

  async authenticatedFacebook({ ally, auth, response }) {
    const fbUser = await ally.driver("facebook").getUser();

    const userDetails = {
      email: fbUser.getEmail(),
      name: fbUser.getName(),
      password: crypto.randomBytes(26).toString("base64"),
      avatar: fbUser.getAvatar(),
    };

    const user = await User.findBy("email", fbUser.getEmail());
    if (!user) {
      session.put("userDetails", userDetails);
      return response.redirect("/pickusername");
    }
    await auth.login(user);
    return response.redirect("/");
  }

  async redirectGoogle({ ally }) {
    await ally.driver("google").redirect();
  }

  async authenticatedGoogle({ ally, auth, response, session }) {
    const googleUser = await ally.driver("google").getUser();

    const userDetails = {
      email: googleUser.getEmail(),
      name: googleUser.getName(),
      password: crypto.randomBytes(26).toString("base64"),
      avatar: googleUser.getAvatar(),
    };

    const user = await User.findBy("email", googleUser.getEmail());
    if (!user) {
      session.put("userDetails", userDetails);
      return response.redirect("/pickusername");
    }
    await auth.login(user);
    return response.redirect("/");
  }

  async logout({ auth, response }) {
    await auth.logout();
    return response.redirect("/");
  }

  async pickUsername({ view }) {
    return view.render("pickusername");
  }

  async registerUsername({ request, session, response, auth }) {
    const rules = {
      username: "required",
    };

    const validation = await validate(request.all(), rules);
    if (validation.fails()) {
      session.withErrors(validation.messages()).flashExcept(["password"]);
      return response.redirect("back");
    }

    const userDetails = {
      ...session.get("userDetails"),
      username: request.input("username"),
    };

    const user = await User.create(userDetails);
    await auth.login(user);
    session.forget("userDetails");
    return response.redirect("/");
  }
}

module.exports = AuthController;
