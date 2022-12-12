import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {FeedCardProps} from '../screens/feed/FeedCard';

const feedInitialState = {
  feed: [] as FeedCardProps[],
};

export const feedSlice = createSlice({
  name: 'feed',
  initialState: feedInitialState,
  reducers: {
    setFeed(state, action: PayloadAction<{feed: FeedCardProps[]}>) {
      state.feed = action.payload.feed;
    },
    addFeedPage(state, action: PayloadAction<{feed: FeedCardProps[]}>) {
      state.feed = [...state.feed, ...action.payload.feed];
    },
  },
});

export const feedActions = feedSlice.actions;
export const feedReducer = feedSlice.reducer;
