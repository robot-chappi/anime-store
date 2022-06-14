export interface ICommentCommunity {
    _id: string;
    userId: string;
    username: string;
    avatar: string;
    text: string;
    rating: number;
}

export interface ICommunity {
    _id: string;
    userId: string;
    title: string;
    subtitle: string;
    description: string;
    art: string;
    socialAdd: string;
    hashtag: string;
    like: number;
    dislike: number;
    comments: ICommentCommunity[];
}

export interface CommunityState {
    communities: ICommunity[];
    error: string;
}

export enum CommunityActionTypes {
    FETCH_COMMUNITIES = 'FETCH_COMMUNITIES',
    DELETE_COMMUNITIES = 'DELETE_COMMUNITIES',
    FETCH_COMMUNITIES_ERROR = 'FETCH_COMMUNITIES_ERROR'
}

interface FetchCommunityAction {
    type: CommunityActionTypes.FETCH_COMMUNITIES;
    payload: ICommunity[]
}

interface DeleteCommunityAction {
    type: CommunityActionTypes.DELETE_COMMUNITIES;
    payload: ICommunity[]
}

interface FetchCommunityErrorAction {
    type: CommunityActionTypes.FETCH_COMMUNITIES_ERROR;
    payload: string
}

export type CommunityAction = FetchCommunityAction | DeleteCommunityAction | FetchCommunityErrorAction
