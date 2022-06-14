import axios from "axios";
import { Dispatch } from "react";
import { CommunityAction, CommunityActionTypes } from "../../types/community";
import { LOCAL_NAME } from "../../utils/consts";

export const fetchCommunities = (count:number, offset:number) => {
    return async (dispatch: Dispatch<CommunityAction>) => {
        try {
            const response = await axios.get(LOCAL_NAME + `api/community?count=${count}&offset=${offset}`)
            return dispatch({type: CommunityActionTypes.FETCH_COMMUNITIES, payload: response.data})
        } catch (e) {
            dispatch({
                type: CommunityActionTypes.FETCH_COMMUNITIES_ERROR,
                payload: 'An error occurred while loading communities!'
            })
        }
    }
}

export const searchCommunities = (query: string) => {
    return async (dispatch: Dispatch<CommunityAction>) => {
        try {
            const response = await axios.get(LOCAL_NAME + 'api/community/search/item?query='+query)
            dispatch({type: CommunityActionTypes.FETCH_COMMUNITIES, payload: response.data})
        } catch (e) {
            dispatch({
                type: CommunityActionTypes.FETCH_COMMUNITIES_ERROR,
                payload: 'An error occurred while loading communities!'
            })
        }
    }
}

export const deleteCommunities = (id: string) => {
    return async (dispatch: Dispatch<CommunityAction>) => {
        try {
            const response = await axios.delete(LOCAL_NAME + 'api/community/'+id)
            dispatch({type: CommunityActionTypes.DELETE_COMMUNITIES, payload: response.data})
        } catch (e) {
            dispatch({
                type: CommunityActionTypes.FETCH_COMMUNITIES_ERROR,
                payload: 'Something went wrong!'
            })
        }
    }
}