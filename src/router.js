const { Router } = require("express");

class Routes {
  constructor() {
    this.Routers = new Router();
    this.routes();
  }

  routes() {
    this.Routers.get("/", (req, res) => {
      return res.json({ message: "consegui" });
    });
  }
}

module.exports = new Routes().Routers;
