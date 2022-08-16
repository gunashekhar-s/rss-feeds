const mongoose = require("mongoose")
const Schema = mongoose.Schema
const uniqueValidator = require('mongoose-unique-validator');

const feedsSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: ""
    },
    link: {
        type: String,
        required: true,
    },
    guid: {
        type: String,
        required: true,
    },
    pubDate: {
        //type Date changing date value
        type: String,
        required: true,
    },
}, { timestamps: true })

feedsSchema.plugin(uniqueValidator);

const Feeds = mongoose.model("Feeds", feedsSchema)

module.exports = Feeds


