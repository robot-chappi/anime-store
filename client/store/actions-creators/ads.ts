import axios from "axios";
import { Dispatch } from "react";
import { AdsAction, AdsActionTypes } from "../../types/ads";
import { LOCAL_NAME } from "../../utils/consts";

export const fetchAds = (count:number, offset:number) => {
    return async (dispatch: Dispatch<AdsAction>) => {
        try {
            const response = await axios.get(LOCAL_NAME + `api/ads?count=${count}&offset=${offset}`)
            return dispatch({type: AdsActionTypes.FETCH_ADS, payload: response.data})
        } catch (e) {
            dispatch({
                type: AdsActionTypes.FETCH_ADS_ERROR,
                payload: 'An error occurred while loading ads!'
            })
        }
    }
}


export const deleteAds = (id: string) => {
    return async (dispatch: Dispatch<AdsAction>) => {
        try {
            const response = await axios.delete(LOCAL_NAME + 'api/ads/'+id)
            dispatch({type: AdsActionTypes.DELETE_ADS, payload: response.data})
        } catch (e) {
            dispatch({
                type: AdsActionTypes.FETCH_ADS_ERROR,
                payload: 'Something went wrong!'
            })
        }
    }
}