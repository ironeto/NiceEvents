import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {EventPhotosCardProps} from '../screens/eventPhotos/EventPhotosCard';

const eventPhotosInitialState = {
  eventPhotos: [] as EventPhotosCardProps[],
};

export const eventPhotosSlice = createSlice({
  name: 'eventPhotos',
  initialState: eventPhotosInitialState,
  reducers: {
    setEventPhotos(state, action: PayloadAction<{eventsPhotos: EventPhotosCardProps[]}>) {
      state.eventPhotos = action.payload.eventsPhotos;
    },
    addEventPhotos(state, action: PayloadAction<{eventPhotos: EventPhotosCardProps[]}>) {
      state.eventPhotos = [...state.eventPhotos, ...action.payload.eventPhotos];
    },
  },
});

export const eventPhotosActions = eventPhotosSlice.actions;
export const eventPhotosReducer = eventPhotosSlice.reducer;
