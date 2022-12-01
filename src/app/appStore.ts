import {configureStore} from '@reduxjs/toolkit';
import {useDispatch, useSelector, TypedUseSelectorHook} from 'react-redux';
import { appReducer } from './appSlice';

export {Provider as AppStoreProvider} from 'react-redux';


export const    appStore = configureStore({
    reducer:{
        app:appReducer
    },
    devTools: true
});

export type AppStore = ReturnType<typeof appStore.getState>

const useAppSelector : TypedUseSelectorHook<AppStore> = useSelector;
export const useAppDispatch : () => typeof appStore.dispatch = useDispatch;
