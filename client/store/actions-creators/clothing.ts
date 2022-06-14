import axios from "axios";
import { Dispatch } from "react";
import { ClothingAction, ClothingActionTypes } from "../../types/clothing";
import { LOCAL_NAME } from "../../utils/consts";

export const fetchClothing = (type:number, count:number, offset:number) => {
    return async (dispatch: Dispatch<ClothingAction>) => {
        try {
            if(!type) {
                const response = await axios.get(LOCAL_NAME + `api/clothing?count=${count}&offset=${offset}`)
                return dispatch({type: ClothingActionTypes.FETCH_CLOTHINGS, payload: response.data})
            }
            const response = await axios.get(LOCAL_NAME + `api/clothing?count=${count}&offset=${offset}&type=${type}`)
            return dispatch({type: ClothingActionTypes.FETCH_CLOTHINGS, payload: response.data})
        } catch (e) {
            dispatch({
                type: ClothingActionTypes.FETCH_CLOTHING_ERROR,
                payload: 'An error occurred while loading clothes!'
            })
        }
    }
}

export const searchClothing = (query: string) => {
    return async (dispatch: Dispatch<ClothingAction>) => {
        try {
            const response = await axios.get(LOCAL_NAME + 'api/clothing/search/item?query='+query)
            dispatch({type: ClothingActionTypes.FETCH_CLOTHINGS, payload: response.data})
        } catch (e) {
            dispatch({
                type: ClothingActionTypes.FETCH_CLOTHING_ERROR,
                payload: 'An error occurred while loading clothes!'
            })
        }
    }
}

export const deleteClothing = (id: string) => {
    return async (dispatch: Dispatch<ClothingAction>) => {
        try {
            const response = await axios.delete(LOCAL_NAME + 'api/clothing/'+id)
            dispatch({type: ClothingActionTypes.DELETE_CLOTHING, payload: response.data})
        } catch (e) {
            dispatch({
                type: ClothingActionTypes.FETCH_CLOTHING_ERROR,
                payload: 'Something went wrong!'
            })
        }
    }
}