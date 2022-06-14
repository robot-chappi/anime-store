import React, {Component, FC} from 'react';
import {AppProps} from 'next/app';
import {NextThunkDispatch, wrapper} from "../store";
import "../styles/layout.css"
import { parseCookies } from 'nookies';
import { fetchUserBasket, fetchUserData, fetchUserFavorite } from '../store/actions-creators/user';

const WrappedApp: FC<AppProps> = ({Component, pageProps}) => (
  <Component {...pageProps} />
);

WrappedApp.getInitialProps = wrapper.getInitialAppProps((store) => async ({ctx, Component}) => {
  try {
    const { animeToken } = parseCookies(ctx)
    const dispatch = store.dispatch as NextThunkDispatch 
    await dispatch(await fetchUserData(animeToken))
    await dispatch(await fetchUserFavorite(animeToken))
    await dispatch(await fetchUserBasket(animeToken))
  }
   catch (e) {
     return console.log(e)
   }
   return {
    pageProps: 
        Component.getInitialProps ? await Component.getInitialProps({...ctx, store}): {}   };
})

export default wrapper.withRedux(WrappedApp);
