import React, {useState, useEffect, useRef} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Loader} from '../components/Loader';
import {AppContext, initialAppState} from './AppContext';
import {requestPermission} from '../geolocation/requestPermission';
import {getCoords} from '../geolocation/getCoords';
import {watchGeolocation} from '../geolocation/watchGeolocation';
import {AppNavigator} from './AppNavigator';
import {AppStorage} from './AppStorage';
import {NativeBaseProvider} from 'native-base';
import { AppStoreProvider } from './appStore';
import { AppEvents, AppState } from './types';
import { appStore } from './appStore';
import { eventInitialState } from './eventSlice';

async function init(): Promise<AppState> {
  const isPermissionGranted = await requestPermission();
  const coords = await getCoords();
  const storage = await AppStorage.getStorage();
  const user = {
    ...storage.user,
    coords: coords ?? storage.user.coords,
  };
  const isLoading = !isPermissionGranted;

  const appState = {
    ...storage,
    user,
    isLoading,
  };

  await AppStorage.setStorage(appState);

  return appState;
}

export function App() {
  const [appState, setAppState] = useState(initialAppState);
  const clearWatchIdRef = useRef(() => {});
  const clearWatchId = clearWatchIdRef.current;

  useEffect(() => {
    init().then(appState => {
      setAppState(appState);
      const watchResults = watchGeolocation({
        onPositionChange(coords) {

          let eventsArr = eventInitialState.map((val: any): AppEvents => ({
            id: val.id,
            name: val.name,
            type: val.type,
            imgUrl: val.imgUrl,
            coords: getRandomCoords(coords)
          }));

          setAppState({
            ...appState,
            user: {
              ...appState.user,
              coords,
            },
            events: eventsArr
          });

        },
      });

      clearWatchIdRef.current = watchResults.clearWatchId;
    });

    return () => {
      clearWatchId();
    };
  }, []);

  useEffect(() => {
    AppStorage.syncAppStorage(appState);
  }, [appState]);

  if (appState.isLoading) {
    return <Loader />;
  }

  return (
    <AppStoreProvider store={appStore}>
      <NativeBaseProvider>
        <NavigationContainer>
            <AppContext.Provider value={{appState, setAppState}}>
              <AppNavigator />
            </AppContext.Provider>
        </NavigationContainer>
      </NativeBaseProvider>
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