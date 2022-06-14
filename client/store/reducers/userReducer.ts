import {UserAction, UserActionTypes, UserState, IUser, FavoriteAction, FavoriteActionTypes, FavoriteState, BasketAction, BasketActionTypes, BasketState} from "../../types/user";

const initialState: UserState = {
    user: {},
    error: ''
}

const initialStateFavorite: FavoriteState = {
    userFavorite: [],
    errorFavorite: ''
}

const initialStateBasket: BasketState = {
    userBasket: [],
    errorBasket: ''
}

export const userReducer = (state = initialState, action: UserAction): UserState => {
    switch (action.type) {
        case UserActionTypes.FETCH_USER_ERROR:
            return {...state, error: action.payload}
        case UserActionTypes.FETCH_USER:
            return {error: '', user: action.payload}
        case UserActionTypes.SET_USER_DATA:
            return {error: '', user: action.payload}
        default:
            return state
    }
}

export const favoriteReducer = (state = initialStateFavorite, action: FavoriteAction): FavoriteState => {
    switch (action.type) {
        case FavoriteActionTypes.FETCH_FAVORITE_ERROR:
            return {...state, errorFavorite: action.payload}
        case FavoriteActionTypes.FETCH_FAVORITE:
            return {errorFavorite: '', userFavorite: action.payload}
        case FavoriteActionTypes.DELETE_FAVORITE:
            return {errorFavorite: '', userFavorite: action.payload}
        default:
            return state
    }
}

export const basketReducer = (state = initialStateBasket, action: BasketAction): BasketState => {
    switch (action.type) {
        case BasketActionTypes.FETCH_BASKET_ERROR:
            return {...state, errorBasket: action.payload}
        case BasketActionTypes.FETCH_BASKET:
            return {errorBasket: '', userBasket: action.payload}
        case BasketActionTypes.DELETE_BASKET:
            return {errorBasket: '', userBasket: action.payload}
        default:
            return state
    }
}

