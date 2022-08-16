import { cloneDeep } from "lodash"
import { LOGOUT_RESET, UPDATE_LOGIN_STATUS, UPDATE_USER_DETAILS } from "../actions/userAction"

const initialValue = {
    isUserLoggedIn: false,
    user: { //not using for now
        _id: "",
        email: "",
    },
    error: {
        message: ""
    },
    isLoading: true
}

const userReducer = (state = initialValue, action) => {
    switch (action.type) {
        case UPDATE_LOGIN_STATUS: {
            return { ...cloneDeep(state), isUserLoggedIn: true }
        }
        case UPDATE_USER_DETAILS: {
            return { ...cloneDeep(state), user: { ...state.user, ...action.payload }, isLoading: false }
        }
        case LOGOUT_RESET: {
            return cloneDeep(initialValue)
        }
        default:
            return state
    }
}

export default userReducer