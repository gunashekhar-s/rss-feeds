const mongoose = require("mongoose")


const configureDb = () => {
    mongoose.connect("mongodb://localhost:27017/rss-feeds")
        .then(() => {
            console.log("Successfully connected to database : rss-feeds")
        })
        .catch(() => {
            console.log("error connecting db rss-feeds")
        })
}

module.exports = configureDb