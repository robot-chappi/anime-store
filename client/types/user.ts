export interface IFavorite {
    _id: string;
    favoriteId: string;
    userId: string;
}

export interface IBasket {
    _id: string;
    clothingId: string;
    userId: string;
}

export interface IUser {
    _id: string;
    email: string;
    password: string;
    role: string;
    name: string;
    avatar: string;
    back: string;
    about: string;
    social: string;
    favorite: IFavorite[];
    basket: IBasket[];
}


export interface UserState {
    user: IUser;
    error: string;
}

export enum UserActionTypes {
    FETCH_USER = 'FETCH_USER',
    FETCH_USER_ERROR = 'FETCH_USER_ERROR',
    SET_USER_DATA = 'SET_USER_DATA'
}

interface FetchUserAction {
    type: UserActionTypes.FETCH_USER;
    payload: IUser;
}


interface SetUserData {
    type: UserActionTypes.SET_USER_DATA;
    payload: IUser;
}

interface FetchUserErrorAction {
    type: UserActionTypes.FETCH_USER_ERROR;
    payload: string
}



export type UserAction = FetchUserAction | FetchUserErrorAction | SetUserData;


export interface ICommentFavorite {
    _id: string;
    userId: string;
    username: string;
    avatar: string;
    text: string;
    rating: number;
}

export interface IClothingFavorite {
    _id: string;
    name: string;
    description: string;
    brand: string;
    type: number;
    delivery: string;
    care: string;
    price: number;
    color: string[];
    size: string[];
    picture: string;
    like: number;
    dislike: number;
    addOption: string;
    comments: ICommentFavorite[];
}

export interface FavoriteState {
    userFavorite: IClothingFavorite[];
    errorFavorite: string;
}

export enum FavoriteActionTypes {
    FETCH_FAVORITE = 'FETCH_FAVORITE',
    DELETE_FAVORITE = 'DELETE_FAVORITE',
    FETCH_FAVORITE_ERROR = 'FETCH_FAVORITE_ERROR'
}

interface FetchFavoriteAction {
    type: FavoriteActionTypes.FETCH_FAVORITE;
    payload: IClothingFavorite[]
}

interface DeleteFavoriteAction {
    type: FavoriteActionTypes.DELETE_FAVORITE;
    payload: IClothingFavorite[]
}

interface FetchFavoriteErrorAction {
    type: FavoriteActionTypes.FETCH_FAVORITE_ERROR;
    payload: string
}

export type FavoriteAction = FetchFavoriteAction | DeleteFavoriteAction | FetchFavoriteErrorAction


export interface ICommentBasket {
    _id: string;
    userId: string;
    username: string;
    avatar: string;
    text: string;
    rating: number;
}

export interface IClothingBasket {
    _id: string;
    name: string;
    description: string;
    brand: string;
    type: number;
    delivery: string;
    care: string;
    price: number;
    color: string[];
    size: string[];
    picture: string;
    like: number;
    dislike: number;
    addOption: string;
    comments: ICommentBasket[];
}

export interface BasketState {
    userBasket: IClothingBasket[];
    errorBasket: string;
}

export enum BasketActionTypes {
    FETCH_BASKET = 'FETCH_BASKET',
    DELETE_BASKET = 'DELETE_BASKET',
    FETCH_BASKET_ERROR = 'FETCH_BASKET_ERROR'
}

interface FetchBasketAction {
    type: BasketActionTypes.FETCH_BASKET;
    payload: IClothingBasket[]
}

interface DeleteBasketAction {
    type: BasketActionTypes.DELETE_BASKET;
    payload: IClothingBasket[]
}

interface FetchBasketErrorAction {
    type: BasketActionTypes.FETCH_BASKET_ERROR;
    payload: string
}

export type BasketAction = FetchBasketAction | DeleteBasketAction | FetchBasketErrorAction
