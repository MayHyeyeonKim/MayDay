const express = require("express")
const Router = express.Router()

const authApi = require("./auth.api")
const userApi = require("./user.api");
const productApi = require("./product.api")
const cartApi = require("./cart.api")
const orderApi = require("./order.api")

Router.use("/auth", authApi)
Router.use("/user", userApi)
Router.use("/product", productApi)
Router.use("/cart", cartApi);
Router.use("/order", orderApi)


module.exports = Router;