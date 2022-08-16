import axios from "axios"
export const UPDATE_FEEDS = "UPDATE_FEEDS"


export const updateFeeds = (data) => {
    return {
        type: UPDATE_FEEDS,
        payload: data
    }
}

export const asyncGetFreshFeeds = () => {
    return (dispatch) => {
        axios.get("http://localhost:3050/feeds", {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
            .then((response) => {
                const result = response.data
                if (result.feeds?.length > 0) {
                    dispatch(updateFeeds(result.feeds))
                } else {
                    console.log(result)
                }
            })
            .catch((err) => {
                console.log(err)
            })

    }
}