const axios = require("axios")
const xml2js = require('xml2js');
const Feeds = require("../models/feeds");



const feedsController = {}

feedsController.findFeeds = (req, res) => {

    axios.get("https://timesofindia.indiatimes.com/rssfeedstopstories.cms")
        .then((response) => {
            const result = response.data
            const parser = new xml2js.Parser();

            parser.parseStringPromise(result)
                .then((data) => {

                    const feeds = data.rss?.channel[0]?.item.map(feed => {
                        //alternative - toString() on array works
                        //*Converting array value to string

                        feed.title = feed.title[0]
                        feed.description = feed.description[0]
                        feed.link = feed.link[0]
                        feed.guid = feed.guid[0]
                        feed.pubDate = feed.pubDate[0]
                        return feed
                    })

                    Feeds.findOne().sort({ pubDate: -1 }) // finding the latest feed 
                        .then(feed => {
                            if (!feed) { //no feed - insert all feed
                                Feeds.insertMany(feeds)
                                    .then((latestFeeds) => {

                                        //will return sorted array - latest to oldest
                                        Feeds.find().sort({ pubDate: -1 }).all()
                                            .then((allFeeds) => {
                                                res.json({ feeds: allFeeds })
                                            })
                                    })
                                    .catch((err) => {
                                        res.json(err)
                                    })
                            } else {  //*Feeds exist so update only feeds created after latest one

                                //*filtering feeds based on  time of the latest existing feed
                                const newFeeds = feeds.filter(feedItem => feedItem.pubDate > feed.pubDate)
                                if (newFeeds.length > 0) {
                                    Feeds.insertMany(newFeeds)
                                        .then((latestFeeds) => {
                                            Feeds.find().sort({ pubDate: -1 }).all()
                                                .then((allFeeds) => {
                                                    res.json({ feeds: allFeeds })
                                                })
                                        })
                                        .catch((err) => {
                                            res.json(err)
                                        })
                                } else {
                                    Feeds.find().sort({ pubDate: -1 }).all()
                                        .then((allFeeds) => {
                                            res.json({ feeds: allFeeds })
                                        })
                                        .catch((err) => {
                                            res.json(err)
                                        })
                                }
                            }
                        })
                        .catch((err) => {
                            res.json(err)
                        })
                })
                .catch((err) => {
                    console.log(err)
                });

        })
        .catch((err) => {
            console.log(err)
        })

}

module.exports = feedsController