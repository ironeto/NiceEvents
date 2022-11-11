import {createContext} from 'react';

export type Coords = {
  latitude: number;
  longitude: number;
};

export interface Event {
  id: number;
  name: string;
  type: string;
  imgUrl: string;
  coords: Coords;
};

export type UserState = {
  id: string;
  name: string;
  color: string;
  coords: Coords;
};

export type AppState = {
  isLoading: boolean;
  user: UserState;
  events: Event[];
  myEvents: Event[];
};

export const initialAppState: AppState = {
  isLoading: true,
  user: {
    id: '',
    name: '',
    color: '',
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