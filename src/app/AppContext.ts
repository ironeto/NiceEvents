import {createContext} from 'react';
import {Event} from '../models/event';

export type AppState = {
  isLoading: boolean;
  user: {
    id: string;
    name: string;
    color: string;
  };
  events: Event[];
};

export const initialAppState: AppState = {
  isLoading: true,
  user: {
    id: '',
    name: '',
    color: '',
  },
  events: [
    {name:'Event 1', type:'Music', imgUrl:'https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png', lat:111, long:111},
    {name:'Event 2', type:'Music', imgUrl:'https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png', lat:111, long:111},
    {name:'Event 3', type:'Music', imgUrl:'https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png', lat:111, long:111},
    {name:'Event 4', type:'Music', imgUrl:'https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png', lat:111, long:111},
    {name:'Event 5', type:'Music', imgUrl:'https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png', lat:111, long:111},
    {name:'Event 6', type:'Music', imgUrl:'https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png', lat:111, long:111},
    {name:'Event 7', type:'Music', imgUrl:'https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png', lat:111, long:111},
    {name:'Event 8', type:'Music', imgUrl:'https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png', lat:111, long:111},
    {name:'Event 9', type:'Music', imgUrl:'https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png', lat:111, long:111},
    {name:'Event 10', type:'Music', imgUrl:'https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png', lat:111, long:111},
    {name:'Event 11', type:'Music', imgUrl:'https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png', lat:111, long:111},
    {name:'Event 12', type:'Music', imgUrl:'https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png', lat:111, long:111}
  ],
};

export const AppContext = createContext({
  appState: initialAppState,
  setAppState: (state: AppState) => {},
});
