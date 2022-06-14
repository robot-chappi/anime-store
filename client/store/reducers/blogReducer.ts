import {BlogAction, BlogActionTypes, BlogState} from "../../types/blog";

const initialState: BlogState = {
    blogs: [],
    error: ''
}

export const blogReducer = (state = initialState, action: BlogAction): BlogState => {
    switch (action.type) {
        case BlogActionTypes.FETCH_BLOGS_ERROR:
            return {...state, error: action.payload}
        case BlogActionTypes.FETCH_BLOGS:
            return {error: '', blogs: action.payload}
        case BlogActionTypes.DELETE_BLOGS:
            return {error: '', blogs: action.payload}
        default:
            return state
    }
}