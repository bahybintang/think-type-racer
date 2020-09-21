"use strict";

class RoomController {
  async index({ params, response, view }) {
    return view.render("room", { room_id: params.room_id });
  }
}

module.exports = RoomController;
