import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppState} from './AppContext';
import {debounce} from '../utils/debouce';
import {generateRandomColor} from '../utils/generateRandomColor';
import {generateUserId} from '../utils/generateUserId';

const storagePath = 'app';
const writeUserToStorageInterval = 2000;

export class AppStorage {
  static async getStorage(): Promise<AppState> {
    //await AsyncStorage.clear();
    const storage = await AsyncStorage.getItem(storagePath);
    if (storage) {
      return JSON.parse(storage);
    }

    const initialState = await AppStorage.getInitialState();
    await AppStorage.setStorage(initialState);
    return initialState;
  }

  static async setStorage(state: AppState) {
    return AsyncStorage.setItem(storagePath, JSON.stringify(state));
  }

  static getInitialState(): AppState {
    return {
      isLoading: false,
      user: {
        id: '1',
        name: 'Alvaro Neto',
        coords: {
          latitude: 0,
          longitude: 0,
        },
      },
      events: [
        {id: 1,name:'Event 1', type:'Music', imgUrl:'https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png',coords: {"longitude":-0,"latitude":0}},
        {id: 2,name:'Event 2', type:'Music', imgUrl:'https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png',coords: {"longitude":-0,"latitude":0}},
        {id: 3,name:'Event 3', type:'Music', imgUrl:'https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png',coords: {"longitude":-0,"latitude":0}},
        {id: 4,name:'Event 4', type:'Music', imgUrl:'https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png',coords: {"longitude":-0,"latitude":0}},
        {id: 5,name:'Event 5', type:'Music', imgUrl:'https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png',coords: {"longitude":-0,"latitude":0}},
        {id: 6,name:'Event 6', type:'Music', imgUrl:'https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png',coords: {"longitude":-0,"latitude":0}},
        {id: 7,name:'Event 7', type:'Music', imgUrl:'https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png',coords: {"longitude":-0,"latitude":0}},
        {id: 8,name:'Event 8', type:'Music', imgUrl:'https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png',coords: {"longitude":-0,"latitude":0}},
        {id: 9,name:'Event 9', type:'Music', imgUrl:'https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png',coords: {"longitude":-0,"latitude":0}},
        {id: 10,name:'Event 10', type:'Music', imgUrl:'https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png',coords: {"longitude":-0,"latitude":0}},
        {id: 11,name:'Event 11', type:'Music', imgUrl:'https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png',coords: {"longitude":-0,"latitude":0}},
        {id: 12,name:'Event 12', type:'Music', imgUrl:'https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png',coords: {"longitude":-0,"latitude":0}},
        {id: 13,name:'Event 13', type:'Music', imgUrl:'https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png',coords: {"longitude":-0,"latitude":0}},
        {id: 14,name:'Event 14', type:'Music', imgUrl:'https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png',coords: {"longitude":-0,"latitude":0}},
        {id: 15,name:'Event 15', type:'Music', imgUrl:'https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png',coords: {"longitude":-0,"latitude":0}},
        {id: 16,name:'Event 16', type:'Music', imgUrl:'https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png',coords: {"longitude":-0,"latitude":0}},
        {id: 17,name:'Event 17', type:'Music', imgUrl:'https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png',coords: {"longitude":-0,"latitude":0}},
        {id: 18,name:'Event 18', type:'Music', imgUrl:'https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png',coords: {"longitude":-0,"latitude":0}},
        {id: 19,name:'Event 19', type:'Music', imgUrl:'https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png',coords: {"longitude":-0,"latitude":0}},
        {id: 20,name:'Event 20', type:'Music', imgUrl:'https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png',coords: {"longitude":-0,"latitude":0}},
        {id: 21,name:'Event 21', type:'Music', imgUrl:'https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png',coords: {"longitude":-0,"latitude":0}}
      ],
      myEvents: []
    };
  }
  
  static syncAppStorage = debounce(async (appState: AppState) => {
    if (appState.isLoading === true || appState.user.id.length === 0) {
      return;
    }

    await AppStorage.setStorage(appState);
  }, writeUserToStorageInterval);
}
