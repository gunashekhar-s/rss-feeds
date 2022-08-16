require('dotenv').config()
const express = require("express")
const app = express()
const cors = require("cors")
const routes = require("./config/routes")
const configureDb = require("./config/database")
app.use(express.json())
const PORT = process.env.PORT || 3050

app.use(cors())
configureDb()

app.use("/", routes)


app.listen(PORT, () => {
    console.log("server is live on port : " + PORT)
})