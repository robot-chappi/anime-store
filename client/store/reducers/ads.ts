import {AdsAction, AdsActionTypes, AdsState} from "../../types/ads";

const initialState: AdsState = {
    ads: [],
    errorAds: ''
}

export const adsReducer = (state = initialState, action: AdsAction): AdsState => {
    switch (action.type) {
        case AdsActionTypes.FETCH_ADS_ERROR:
            return {...state, errorAds: action.payload}
        case AdsActionTypes.FETCH_ADS:
            return {errorAds: '', ads: action.payload}
        case AdsActionTypes.DELETE_ADS:
            return {errorAds: '', ads: action.payload}
        default:
            return state
    }
}