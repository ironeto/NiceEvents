import {useState, useEffect, useRef} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Loader} from '../components/Loader';
import {AppContext, initialAppState} from './AppContext';
import {requestPermission} from '../geolocation/requestPermission';
import {getCoords} from '../geolocation/getCoords';
import {watchGeolocation} from '../geolocation/watchGeolocation';
import {AppState} from './AppContext';
import {AppNavigator} from './AppNavigator';
import {AppStorage} from './AppStorage';
import {NativeBaseProvider} from 'native-base';
import { appStore, AppStoreProvider } from './appStore';

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
          setAppState({
            ...appState,
            user: {
              ...appState.user,
              coords,
            },
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
