const express = require("express")
const feedsController = require("../app/controllers/feedsController")
const userController = require("../app/controllers/userController")
const authenticateUser = require("../app/middlewares/authenticatUser")
const router = express.Router()

//user-auth routes
router.post("/register", userController.register)
router.post("/login", userController.login)

//feeds routes
router.get("/feeds", authenticateUser, feedsController.findFeeds)

module.exports = router