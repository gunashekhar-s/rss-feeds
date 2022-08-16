import { cloneDeep } from "lodash"
import { UPDATE_FEEDS } from "../actions/feedActions"
import { asyncLogin, LOGOUT_RESET } from "../actions/userAction"

const initialValue = {
    isLoading: true,
    feeds: [],
    error: {
        message: ""
    }
}

const feedReducer = (state = initialValue, action) => {
    switch (action.type) {
        case UPDATE_FEEDS: {
            return cloneDeep({ ...initialValue, isLoading: false, feeds: action.payload })
        }
        case LOGOUT_RESET: {
            return cloneDeep(initialValue)
        }
        default:
            return state
    }
}

export default feedReducer