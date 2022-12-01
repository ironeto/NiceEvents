import {createContext} from 'react';
import {Coords, AppState} from '../app/types';

export const initialAppState: AppState = {
  isLoading: true,
  user: {
    id: '',
    name: '',
    coords: {
      latitude: 0,
      longitude: 0,
    },
  },
  events: [],
  myEvents: []
};

export const AppContext = createContext({
  appState: initialAppState,
  setAppState: (state: AppState) => {},
});