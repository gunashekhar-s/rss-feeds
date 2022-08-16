
import axios from "axios"
export const UPDATE_LOGIN_STATUS = "UPDATE_LOGIN_STATUS"
export const UPDATE_USER_DETAILS = "UPDATE_USER_DETAILS"
export const LOGOUT_RESET = "LOGOUT_RESET"



export const loginToggle = () => {
    return {
        type: UPDATE_LOGIN_STATUS
    }
}

export const initialValueReset = () => {
    return {
        type: LOGOUT_RESET
    }
}

export const updateUserDetails = (data) => {
    return {
        type: UPDATE_USER_DETAILS,
        payload: data
    }
}



//login api call
export const asyncLogin = (data, navigate, setCommonError) => {
    return (dispatch) => {
        axios.post("http://localhost:3050/login", data)
            .then((response) => {
                const result = response.data
                if (result.error === "Invalid login credentials") {
                    setCommonError(result.error)
                } else if (result.token) {
                    localStorage.setItem("token", result.token)
                    navigate.push("/")
                    dispatch(loginToggle())
                } else {
                    console.log(result)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }
}

//register api call
export const asyncRegister = (data, navigate, setEmailError) => {
    return (dispatch) => {
        axios.post("http://localhost:3050/register", data)
            .then((response) => {
                const result = response.data
                if (result.error === "email already exists") {
                    setEmailError(result.error)
                } else if (result.message === "registered") {
                    navigate.push("/login")
                } else {
                    console.log(result)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

}

// fetch user data - post login
export const asyncGetUserDetails = (history) => {
    return (dispatch) => {
        axios.get("http://localhost:3050/user", {
            headers: {
                'Authorization': localStorage.getItem("token")
            }
        })
            .then((response) => {
                const result = response.data
                if (result._id) {
                    dispatch(loginToggle())
                    dispatch(updateUserDetails(result))


                } else if (result.error === "invalid user id") {
                    localStorage.removeItem("token")
                    dispatch(initialValueReset())
                    history.push("/login")

                }
            })
            .catch((err) => {
                if (err.response?.status === 401) {
                    localStorage.removeItem("token")
                    dispatch(initialValueReset())
                    history.push("/login")
                } else {
                    console.log(err)
                }
            })
    }
}

