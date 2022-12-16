import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Coords,Email } from "./types";

const userInitialState ={
    id: '1',
    name: 'Alvaro Augusto de Marco Neto',
    email: {
        value:'',
        validationMessage:''
    },
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
        setEmail(state,action: PayloadAction< {email: Email} >){
            state.email = action.payload.email;
        },
        setCoords(state,action: PayloadAction< {coords: Coords} >){
            state.coords = action.payload.coords;
        },
    },
});

export const userActions = userSlice.actions;
export const userReducer = userSlice.reducer;