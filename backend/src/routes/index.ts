const routes = require("express").Router();
const { createShortURL, shortURL, allShortURL } = require("../controller");
const { Login, Register } = require("../controller/auth");
const { protect, Secure } = require("../middleware");

routes.route("/").post(Secure, createShortURL).get(Secure, allShortURL);
routes.get("/:alias", shortURL);
routes.post("/login", Login);
routes.post("/register", Register);

module.exports = routes;
