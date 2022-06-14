import axios from "axios";
import { Dispatch } from "react";
import { IUser, UserAction, UserActionTypes, FavoriteAction, FavoriteActionTypes, BasketAction, BasketActionTypes } from "../../types/user";
import { LOCAL_NAME } from "../../utils/consts";

export const fetchUserData = (token: string) => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            const response = await axios.get(LOCAL_NAME + `api/user/me`, {headers: {Authorization: `Bearer ${token}`}})
            return dispatch({type: UserActionTypes.FETCH_USER, payload: response.data})
        } catch (e) {
            dispatch({
                type: UserActionTypes.FETCH_USER_ERROR,
                payload: 'An error occurred while loading user!'
            })
        }
    }
}

export const fetchUserFavorite = (token: string) => {
    return async (dispatch: Dispatch<FavoriteAction>) => {
        try {
            const response = await axios.get(LOCAL_NAME + `api/user/favorite`, {headers: {Authorization: `Bearer ${token}`}})
            return dispatch({type: FavoriteActionTypes.FETCH_FAVORITE, payload: response.data})
        } catch (e) {
            dispatch({
                type: FavoriteActionTypes.FETCH_FAVORITE_ERROR,
                payload: 'An error occurred while loading favorite of user!'
            })
        }
    }
}

export const fetchUserBasket = (token: string) => {
    return async (dispatch: Dispatch<BasketAction>) => {
        try {
            const response = await axios.get(LOCAL_NAME + `api/user/basket`, {headers: {Authorization: `Bearer ${token}`}})
            return dispatch({type: BasketActionTypes.FETCH_BASKET, payload: response.data})
        } catch (e) {
            dispatch({
                type: BasketActionTypes.FETCH_BASKET_ERROR,
                payload: 'An error occurred while loading basket!'
            })
        }
    }
}

export const setUserData = (data: IUser) => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            return dispatch({type: UserActionTypes.SET_USER_DATA, payload: data})
        } catch (e) {
            dispatch({
                type: UserActionTypes.FETCH_USER_ERROR,
                payload: 'An error occurred while set user!'
            })
        }
    }
}