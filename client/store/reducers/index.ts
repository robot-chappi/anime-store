import {combineReducers} from "redux";
import {HYDRATE} from "next-redux-wrapper";
import { clothingReducer } from "./clothingReducer";
import { blogReducer } from "./blogReducer";
import { basketReducer, favoriteReducer, userReducer } from "./userReducer";
import { communityReducer } from "./communitiesReducer";
import { adsReducer } from "./ads";


const rootReducer = combineReducers({
    clothing: clothingReducer,
    blog: blogReducer,
    user: userReducer,
    favorite: favoriteReducer,
    basket: basketReducer,
    community: communityReducer,
    ads: adsReducer
})

export const reducer = (state, action) => {
    if (action.type === HYDRATE) {
        const nextState = {
            ...state, // use previous state
            ...action.payload, // apply delta from hydration
        }
        if (state.count) nextState.count = state.count // preserve count value on client side navigation
        return nextState
    } else {
        return rootReducer(state, action)
    }
}

export type RootState = ReturnType<typeof rootReducer>