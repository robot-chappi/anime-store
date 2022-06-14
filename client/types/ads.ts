
export interface IAds {
    _id: string;
    name: string;
    type: number;
    image: string;
    time: Date;
}

export interface AdsState {
    ads: IAds[];
    errorAds: string;
}

export enum AdsActionTypes {
    FETCH_ADS = 'FETCH_ADS',
    DELETE_ADS = 'DELETE_ADS',
    FETCH_ADS_ERROR = 'FETCH_ADS_ERROR'
}

interface FetchAdsAction {
    type: AdsActionTypes.FETCH_ADS;
    payload: IAds[]
}

interface DeleteAdsAction {
    type: AdsActionTypes.DELETE_ADS;
    payload: IAds[]
}

interface FetchAdsErrorAction {
    type: AdsActionTypes.FETCH_ADS_ERROR;
    payload: string
}

export type AdsAction = FetchAdsAction | DeleteAdsAction | FetchAdsErrorAction
