import { Box, Card, CardActions, CardContent, Divider, Grid, Typography } from '@mui/material';
import moment from 'moment';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncGetFreshFeeds } from '../redux/actions/feedActions';

function FeedViewer(props) {

    const feedDetails = useSelector((state) => {
        return state.feedDetails
    })
    const dispatch = useDispatch()
    useEffect(() => {
        if (feedDetails.isLoading) {
            dispatch(asyncGetFreshFeeds())
        }
    }, [feedDetails.isLoading])

    const styles = {
        box: {
            display: 'flex',
            height: "100vh",
            flexDirection: 'column',
            alignItems: 'center',
            padding: "15px 0",
            backgroundColor: "#F9F5F5",

        },
        gridContainer: {
            overflow: "auto"
        },
        link: {
            textDecoration: "none",
            color: "darkgray"
        }

    }
    return (
        <div>
            {
                !feedDetails.isLoading && (
                    <Box sx={styles.box}                >
                        <Grid display="flex" direction="row" container alignItems="center" sx={styles.gridContainer}>

                            {
                                feedDetails.feeds.map((feed, i) => {
                                    return (
                                        <Grid item xs={12} align="center" sx={{ px: "15px", mb: 2 }} key={feed._id}>

                                            <Card sx={styles.card}>
                                                <CardContent>
                                                    <Typography sx={{ fontSize: 14, mr: 2 }} color="text.secondary" gutterBottom align="right">
                                                        {moment(feed.pubDate).format("DD-MM-YYYY hh:mm A")}
                                                    </Typography>
                                                    <Typography variant="h5" component="div" align="left" >
                                                        {feed.title}
                                                    </Typography>
                                                    <Divider sx={{ width: "100%", my: 1 }} />
                                                    <Typography variant="body2" align="left">
                                                        {feed.description}
                                                    </Typography>
                                                </CardContent>
                                                <CardActions>
                                                    <a href={feed.link} target="_blank" style={styles.link}>View Page</a>
                                                </CardActions>
                                            </Card>
                                        </Grid>
                                    )
                                })
                            }


                        </Grid>

                    </Box>
                )
            }
        </div>
    );
}

export default FeedViewer;