import React, {useState, useEffect, useRef} from 'react';
import {NavigationContainer, DefaultTheme, DarkTheme} from '@react-navigation/native';
import {Loader} from '../components/Loader';
import {requestPermission} from '../geolocation/requestPermission';
import {getCoords} from '../geolocation/getCoords';
import {watchGeolocation} from '../geolocation/watchGeolocation';
import {AppNavigator} from './AppNavigator';
import {NativeBaseProvider,extendTheme} from 'native-base';
import { appActions, AppStoreProvider } from './appStore';
import { AppEvents, AppState } from './types';
import { appStore } from './appStore';
import { eventInitialState, fakeEvents } from './eventSlice';
import { useAppSelector,userActions,eventActions,useAppDispatch,AppStorePersistGate, appPersistor } from '../app/appStore';
import {apolloClient, ApolloProvider} from '../utils/apolloClient';
import messaging from '@react-native-firebase/messaging';

async function init(): Promise<boolean> {
  return await requestPermission();
}

export function AppContent() {
  const clearWatchIdRef = useRef(() => {});
  const clearWatchId = clearWatchIdRef.current;
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(state => state.app.isLoading);
  const isFakeEventsLoaded = useAppSelector(state => state.app.isFakeEventsLoaded);
  let user = useAppSelector(state => state.user);
  let events = useAppSelector(state => state.event);
  const isDarkTheme = useAppSelector(state => state.app.isDarkTheme);
  const baseNavigationTheme = isDarkTheme ? DarkTheme : DefaultTheme;

  const nativeBaseTheme = extendTheme({
    config: {
      initialColorMode: isDarkTheme ? 'dark' : 'light',
    },
  });

  const navigationTheme = {
    ...baseNavigationTheme,
    colors: {
      ...baseNavigationTheme.colors,
      primary: nativeBaseTheme.colors.primary[600],
    },
  };

  useEffect(() => {
    messaging().getToken().then(console.log);
    init().then(isPermissionGranted => {
      const watchResults = watchGeolocation({
        onPositionChange(coords) {

            if(events.length <= 0){
                let eventsArr = fakeEvents.map((val: any): AppEvents => ({
                    id: val.id,
                    name: val.name,
                    type: val.type,
                    imgUrl: val.imgUrl,
                    coords: getRandomCoords(coords)
                    }));

                dispatch(eventActions.setEventRange(eventsArr));
            }
            
            dispatch(appActions.setLoading({isLoading:!isPermissionGranted}));
            dispatch(userActions.setCoords({coords:{latitude:coords.latitude, longitude:coords.longitude}}));
        },
      });

      clearWatchIdRef.current = watchResults.clearWatchId;
    });

    return () => {
      clearWatchId();
    };
  }, []);

  if (isLoading) {
    return <Loader dark={isDarkTheme} />;
  }

  return (
    <AppStoreProvider store={appStore}>
      <AppStorePersistGate persistor={appPersistor}>
      <ApolloProvider client={apolloClient}>
        <NativeBaseProvider theme={nativeBaseTheme}>
          <NavigationContainer theme={navigationTheme}>
            <AppNavigator />
          </NavigationContainer>
        </NativeBaseProvider>
      </ApolloProvider>
      </AppStorePersistGate>
    </AppStoreProvider>
  );
}

const movementIncrement = 0.01;

function generateBoolean() {
  return Math.random() > 0.5;
}

function generateInteger(max) {
  return Math.round(Math.random() * max);
}

function randomSingleCoordsPosition(singleCoords) {
  return parseFloat(
    (
      singleCoords +
      (generateBoolean() ? movementIncrement : -movementIncrement) *
        generateInteger(10)
    ).toFixed(7),
  );
}
 
function getRandomCoords(coords) {
  return {
    latitude: randomSingleCoordsPosition(coords.latitude),
    longitude: randomSingleCoordsPosition(coords.longitude),
  };
}