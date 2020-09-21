"use strict";
// const Redis = use("Redis");

class RoomController {
  async constructor({ socket, request }) {
    this.socket = socket;
    this.request = request;
  }

  onMessage(message) {
    this.socket.broadcastToAll("message", message);
  }
}

module.exports = RoomController;
