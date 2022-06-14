import {CommunityAction, CommunityActionTypes, CommunityState} from "../../types/community";

const initialState: CommunityState = {
    communities: [],
    error: ''
}

export const communityReducer = (state = initialState, action: CommunityAction): CommunityState => {
    switch (action.type) {
        case CommunityActionTypes.FETCH_COMMUNITIES_ERROR:
            return {...state, error: action.payload}
        case CommunityActionTypes.FETCH_COMMUNITIES:
            return {error: '', communities: action.payload}
        case CommunityActionTypes.DELETE_COMMUNITIES:
            return {error: '', communities: action.payload}
        default:
            return state
    }
}