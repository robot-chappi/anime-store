export interface IComment {
    _id: string;
    userId: string;
    username: string;
    avatar: string;
    text: string;
    rating: number;
}

export interface IClothing {
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
    comments: IComment[];
}

export interface ClothingState {
    clothings: IClothing[];
    error: string;
}

export enum ClothingActionTypes {
    FETCH_CLOTHINGS = 'FETCH_CLOTHINGS',
    DELETE_CLOTHING = 'DELETE_CLOTHING',
    FETCH_CLOTHING_ERROR = 'FETCH_CLOTHING_ERROR'
}

interface FetchClothingAction {
    type: ClothingActionTypes.FETCH_CLOTHINGS;
    payload: IClothing[]
}

interface DeleteClothingAction {
    type: ClothingActionTypes.DELETE_CLOTHING;
    payload: IClothing[]
}

interface FetchClothingErrorAction {
    type: ClothingActionTypes.FETCH_CLOTHING_ERROR;
    payload: string
}

export type ClothingAction = FetchClothingAction | DeleteClothingAction | FetchClothingErrorAction
