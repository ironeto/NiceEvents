import {configureStore} from '@reduxjs/toolkit';
import {useDispatch, useSelector, TypedUseSelectorHook} from 'react-redux';
import { appReducer } from './appSlice';
import { eventReducer } from './eventSlice';
import { myEventReducer } from './myEventsSlice';
import { userReducer } from './userSlice';
import {feedReducer} from '../app/feedSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

export {Provider as AppStoreProvider} from 'react-redux';
export {userActions} from '../app/userSlice';
export {appActions} from '../app/appSlice';
export {eventActions} from '../app/eventSlice';
export {myEventActions} from '../app/myEventsSlice';
export {feedActions} from '../app/feedSlice';

export {PersistGate as AppStorePersistGate} from 'redux-persist/integration/react';

const persistConfig = {
  storage: AsyncStorage,
};


const persistedFeedReducer = persistReducer(
  {
    ...persistConfig,
    key: 'feed',
  },
  feedReducer,
);

export const appStore = configureStore({
    reducer:{
        app:appReducer,
        user:userReducer,
        event:eventReducer,
        myEvents:myEventReducer,
        feed: persistedFeedReducer
    },
    devTools: process.env.NODE_ENV === 'development',
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const appPersistor = persistStore(appStore);
export type AppStore = ReturnType<typeof appStore.getState>;
export const useAppSelector: TypedUseSelectorHook<AppStore> = useSelector;
export const useAppDispatch: () => typeof appStore.dispatch = useDispatch;
