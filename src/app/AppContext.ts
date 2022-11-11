import {createContext} from 'react';

export type Coords = {
  latitude: number;
  longitude: number;
};

export interface AppEvents {
  id: number;
  name: string;
  type: string;
  imgUrl: string;
  coords: Coords;
};

export type UserState = {
  id: string;
  name: string;
  coords: Coords;
};

export type AppState = {
  isLoading: boolean;
  user: UserState;
  events: AppEvents[];
  myEvents: AppEvents[];
};

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