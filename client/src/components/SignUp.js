
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import isEmail from 'validator/lib/isEmail';
import { asyncRegister } from '../redux/actions/userAction';
import { Avatar, Grid, Box, Typography, Container, Toolbar, InputAdornment, IconButton, TextField } from '@mui/material'
import Button from '@mui/material/Button'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';


function SignUp(props) {
    const styles = {
        box: {
            marginTop: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            border: "1px solid grey",
            borderRadius: "5px",
            padding: "15px 15px",
        },
        link: {
            color: "inherit"
        }
    }
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        if (name === "email") {
            setEmail(value)
            setEmailError("")
        } else if (name === "password") {
            setPassword(value)
            setPasswordError("")
        }
    }
    const history = useHistory()
    const dispatch = useDispatch()
    const handleSubmit = (e) => {
        e.preventDefault()
        if (email.length === "") {
            setEmailError("email address cannot be empty")
        } else if (!isEmail(email)) {
            setEmailError("Invalid email address")
        } else if (password.length === "") {
            setPasswordError("password cannot be empty")
        } else if (password.length < 8) {
            setPasswordError("password length must atleast 8 letters")
        } else if (password.length > 128) {
            setPasswordError("password length cannot exceed 128 letters")
        } else {
            const data = {
                email,
                password
            }
            dispatch(asyncRegister(data, history, setEmailError))
        }
    }


    const [showPassword, setShowPassword] = useState(false)
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);
    return (
        <div>
            <Toolbar />
            <Container component="main" maxWidth="sm">

                <Box sx={styles.box}                >
                    <Avatar sx={{ m: 1, bgcolor: "text.light" }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Register

                    </Typography>
                    <Box component="form" onSubmit={handleSubmit}>
                        <TextField
                            margin="normal"
                            fullWidth
                            value={email}
                            onChange={handleChange}
                            id="email"
                            name="email"
                            label="Email Address"
                            autoComplete="current-email"
                            error={Boolean(emailError && emailError)}
                            helperText={emailError && emailError}
                        />


                        <TextField
                            margin="normal"
                            fullWidth
                            value={password}
                            onChange={handleChange}
                            id="password"
                            name="password"
                            label="Password"
                            autoComplete="current-password"
                            type={showPassword ? "text" : "password"}
                            error={Boolean(passwordError && passwordError)}
                            helperText={passwordError && passwordError}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {showPassword ? <VisibilityRoundedIcon /> : <VisibilityOffRoundedIcon />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Register

                        </Button>

                        <Grid container>
                            <Grid item xs>
                                <Link to="/login" style={styles.link}>
                                    {"Already have an account? Sign In"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </div>
    );
}

export default SignUp;