import { AppBar, Button, Container, Grid, Toolbar } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { asyncGetFreshFeeds } from '../redux/actions/feedActions';
import { initialValueReset } from '../redux/actions/userAction';
const styles = {

    link: {
        textDecoration: "none",
        color: "white",
        fontSize: "15px",

    }

}

function NavBar(props) {

    const dispatch = useDispatch()
    const isUserLoggedIn = useSelector((state) => {
        return state.userDetails.isUserLoggedIn
    })

    const handleClick = () => {
        dispatch(initialValueReset())
        localStorage.removeItem("token")

    }

    const handleRefreshClick = () => {
        dispatch(asyncGetFreshFeeds())
    }

    return (

        <AppBar position="static" >
            <Container maxWidth="sm">
                <Toolbar>
                    {
                        isUserLoggedIn ? (
                            <>
                                <Grid display="flex" direction="row" container alignItems="center">
                                    <Grid item xs={6}>
                                        <Button variant='contained' sx={{ color: "black", backgroundColor: "white" }} onClick={handleRefreshClick}>Refresh</Button>
                                    </Grid>
                                    <Grid item xs={6} align="right">
                                        <Link to="/login" style={styles.link} onClick={handleClick} >
                                            Sign Out
                                        </Link>
                                    </Grid>
                                </Grid>
                            </>
                        ) : (
                            <>
                                <Grid item xs align="center">
                                    <Link to="/login" style={styles.link}>
                                        Sign In
                                    </Link>
                                    <Link to="/register" style={styles.link}>
                                        Sign Up
                                    </Link>
                                </Grid>


                            </>
                        )
                    }

                </Toolbar>
            </Container>
        </AppBar>

    );
}

export default NavBar;