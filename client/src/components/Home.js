import { useSelector } from "react-redux"
import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import FeedViewer from "./FeedViewer";

function Home(props) {
    const styles = {
        box: {
            display: 'flex',
            height: "100vh",
            alignItems: 'center',
            color: "white",
            // borderLeft: "1px solid grey",
            // borderRight: "1px solid grey",
            padding: "15px 0",
            // backgroundColor: "#EEEEEE"
            background: "rgb(106,254,239)",
            background: "linear-gradient(0deg, rgba(106,254,239,1) 0%, rgba(34,193,195,1) 100%)"
        }

    }

    const isUserLoggedIn = useSelector((state) => {
        return state.userDetails.isUserLoggedIn
    })


    return (
        <div>
            {
                isUserLoggedIn ? (
                    <FeedViewer />
                ) : (
                    <Box sx={styles.box}>
                        <Grid display="flex" direction="row" container sx={styles.grid}>
                            <Grid item xs>
                                <Typography variant="h4" align="center">
                                    Hi There!!
                                    <br />
                                    <br />
                                    Login to View Feeds

                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                )
            }

        </div>
    );
}

export default Home;