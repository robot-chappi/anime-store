import {ClothingAction, ClothingActionTypes, ClothingState} from "../../types/clothing";

const initialState: ClothingState = {
    clothings: [],
    error: ''
}

export const clothingReducer = (state = initialState, action: ClothingAction): ClothingState => {
    switch (action.type) {
        case ClothingActionTypes.FETCH_CLOTHING_ERROR:
            return {...state, error: action.payload}
        case ClothingActionTypes.FETCH_CLOTHINGS:
            return {error: '', clothings: action.payload}
        case ClothingActionTypes.DELETE_CLOTHING:
            return {error: '', clothings: action.payload}
        default:
            return state
    }
}