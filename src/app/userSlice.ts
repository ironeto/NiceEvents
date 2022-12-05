import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Coords } from "./types";

const userInitialState ={
    id: '1',
    name: 'Alvaro Augusto de Marco Neto',
    coords: {
    latitude: 0,
    longitude: 0,
    },
};

export const userSlice = createSlice({
    name: 'user',
    initialState: userInitialState,
    reducers: {
        setId(state,action: PayloadAction< {id: string} >){
            state.id = action.payload.id;
        },
        setName(state,action: PayloadAction< {name: string} >){
            state.name = action.payload.name;
        },
        setCoords(state,action: PayloadAction< {coords: Coords} >){
            state.coords = action.payload.coords;
        },
    },
});

export const userActions = userSlice.actions;
export const userReducer = userSlice.reducer;