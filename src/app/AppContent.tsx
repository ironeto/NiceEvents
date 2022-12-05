import React, {useState, useEffect, useRef} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Loader} from '../components/Loader';
import {requestPermission} from '../geolocation/requestPermission';
import {getCoords} from '../geolocation/getCoords';
import {watchGeolocation} from '../geolocation/watchGeolocation';
import {AppNavigator} from './AppNavigator';
import {NativeBaseProvider} from 'native-base';
import { appActions, AppStoreProvider } from './appStore';
import { AppEvents, AppState } from './types';
import { appStore } from './appStore';
import { eventInitialState, fakeEvents } from './eventSlice';
import { useAppSelector,userActions,eventActions,useAppDispatch } from '../app/appStore';

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

  useEffect(() => {
    init().then(isPermissionGranted => {
      const watchResults = watchGeolocation({
        onPositionChange(coords) {

            if(!isFakeEventsLoaded){
                let eventsArr = fakeEvents.map((val: any): AppEvents => ({
                    id: val.id,
                    name: val.name,
                    type: val.type,
                    imgUrl: val.imgUrl,
                    coords: getRandomCoords(coords)
                    }));

                dispatch(eventActions.setEventRange(eventsArr));
                dispatch(appActions.setFakeEventLoaded({isFakeEventsLoaded:true}));
            }

            dispatch(appActions.setLoading({isLoading:false}));
            dispatch(userActions.setId({id:user.id}));
            dispatch(userActions.setCoords({coords:{latitude:coords.latitude, longitude:coords.longitude}}));
            dispatch(userActions.setName({name:user.name}));

        },
      });

      clearWatchIdRef.current = watchResults.clearWatchId;
    });

    return () => {
      clearWatchId();
    };
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <AppStoreProvider store={appStore}>
      <NativeBaseProvider>
        <NavigationContainer>
              <AppNavigator />
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