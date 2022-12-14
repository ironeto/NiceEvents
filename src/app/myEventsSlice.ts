import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppEvents } from "./types";

const myEventsInitialState = {
    myEvents: [] as AppEvents[],
};

export const myEventsSlice = createSlice({
    name: 'myEvents',
    initialState: myEventsInitialState,
    reducers: {
        addEventToInterest(state,action: PayloadAction<AppEvents>){
            state.myEvents.push(action.payload);
        }
    },
});

export const myEventActions = myEventsSlice.actions;
export const myEventReducer = myEventsSlice.reducer;