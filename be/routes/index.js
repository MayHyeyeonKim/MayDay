const express = require("express")
const Router = express.Router()

const authApi = require("./auth.api")
const userApi = require("./user.api");
const productApi = require("./product.api")

Router.use("/auth", authApi)
Router.use("/user", userApi)
Router.use("/product", productApi)


module.exports = Router;