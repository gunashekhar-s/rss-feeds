import { createStore, applyMiddleware, combineReducers } from "redux"
import thunk from "redux-thunk"
import feedReducer from "./reducers/feedReducer"
import userReducer from "./reducers/userReducer"


const configureStore = () => {
    const store = createStore(combineReducers({
        userDetails: userReducer,
        feedDetails: feedReducer
    }), applyMiddleware(thunk))
    return store
}


export default configureStore