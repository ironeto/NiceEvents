import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppState} from './AppContext';
import {debounce} from '../utils/debouce';
import {generateRandomColor} from '../utils/generateRandomColor';
import {generateUserId} from '../utils/generateUserId';

const storagePath = 'app';
const writeUserToStorageInterval = 2000;

export class AppStorage {
  static async getStorage(): Promise<AppState> {
    await AsyncStorage.clear();
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
        {id: 1,name:'Indie Rock Show', type:'Music', imgUrl:'https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png',coords: {"longitude":-0,"latitude":0}},
        {id: 2,name:'Jazz Presentation', type:'Music', imgUrl:'https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png',coords: {"longitude":-0,"latitude":0}},
        {id: 3,name:'Concert', type:'Music', imgUrl:'https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png',coords: {"longitude":-0,"latitude":0}},
        {id: 4,name:'Iron Maiden Show', type:'Music', imgUrl:'https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png',coords: {"longitude":-0,"latitude":0}},
        {id: 5,name:'RHCP Show', type:'Music', imgUrl:'https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png',coords: {"longitude":-0,"latitude":0}},
        {id: 6,name:'Lady Gaga Show', type:'Music', imgUrl:'https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png',coords: {"longitude":-0,"latitude":0}},
        {id: 7,name:'Boi na brasa', type:'Gastronomia', imgUrl:'https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png',coords: {"longitude":-0,"latitude":0}},
        {id: 8,name:'Almoço Vegano', type:'Gastronomia', imgUrl:'https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png',coords: {"longitude":-0,"latitude":0}},
        {id: 9,name:'Japanese Food', type:'Gastronomia', imgUrl:'https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png',coords: {"longitude":-0,"latitude":0}},
        {id: 10,name:'Feijoada', type:'Gastronomia', imgUrl:'https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png',coords: {"longitude":-0,"latitude":0}},
        {id: 11,name:'Churrascão', type:'Gastronomia', imgUrl:'https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png',coords: {"longitude":-0,"latitude":0}},
        {id: 12,name:'Tech Event', type:'Tech', imgUrl:'https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png',coords: {"longitude":-0,"latitude":0}},
        {id: 13,name:'React Meetup', type:'Tech', imgUrl:'https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png',coords: {"longitude":-0,"latitude":0}},
        {id: 14,name:'The Tech Weekend', type:'Tech', imgUrl:'https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png',coords: {"longitude":-0,"latitude":0}},
        {id: 15,name:'Web Summit', type:'Tech', imgUrl:'https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png',coords: {"longitude":-0,"latitude":0}},
        {id: 16,name:'.Net Summit', type:'Tech', imgUrl:'https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png',coords: {"longitude":-0,"latitude":0}},
        {id: 17,name:'Google Event', type:'Tech', imgUrl:'https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png',coords: {"longitude":-0,"latitude":0}},
        {id: 18,name:'Mercedes Event', type:'Car', imgUrl:'https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png',coords: {"longitude":-0,"latitude":0}},
        {id: 19,name:'BMW Event', type:'Car', imgUrl:'https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png',coords: {"longitude":-0,"latitude":0}},
        {id: 20,name:'Ford Event', type:'Car', imgUrl:'https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png',coords: {"longitude":-0,"latitude":0}},
        {id: 21,name:'GM Event', type:'Car', imgUrl:'https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png',coords: {"longitude":-0,"latitude":0}}
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
