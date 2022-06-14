import axios from "axios";
import { Dispatch } from "react";
import { BlogAction, BlogActionTypes } from "../../types/blog";
import { LOCAL_NAME } from "../../utils/consts";

export const fetchBlogs = (count:number, offset:number) => {
    return async (dispatch: Dispatch<BlogAction>) => {
        try {
            const response = await axios.get(LOCAL_NAME + `api/blog?count=${count}&offset=${offset}`)
            return dispatch({type: BlogActionTypes.FETCH_BLOGS, payload: response.data})
        } catch (e) {
            dispatch({
                type: BlogActionTypes.FETCH_BLOGS_ERROR,
                payload: 'An error occurred while loading blogs!'
            })
        }
    }
}

export const searchBlogs = (query: string) => {
    return async (dispatch: Dispatch<BlogAction>) => {
        try {
            const response = await axios.get(LOCAL_NAME + 'api/blog/search/item?query='+query)
            dispatch({type: BlogActionTypes.FETCH_BLOGS, payload: response.data})
        } catch (e) {
            dispatch({
                type: BlogActionTypes.FETCH_BLOGS_ERROR,
                payload: 'An error occurred while loading blogs!'
            })
        }
    }
}

export const deleteBlogs = (id: string) => {
    return async (dispatch: Dispatch<BlogAction>) => {
        try {
            const response = await axios.delete(LOCAL_NAME + 'api/blog/'+id)
            dispatch({type: BlogActionTypes.DELETE_BLOGS, payload: response.data})
        } catch (e) {
            dispatch({
                type: BlogActionTypes.FETCH_BLOGS_ERROR,
                payload: 'Something went wrong!'
            })
        }
    }
}