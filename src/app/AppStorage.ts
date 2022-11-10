import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppState} from './AppContext';
import {debounce} from '../utils/debouce';
import {generateRandomColor} from '../utils/generateRandomColor';
import {generateUserId} from '../utils/generateUserId';

const storagePath = 'app';
const writeUserToStorageInterval = 2000;

export class AppStorage {
  static async getStorage(): Promise<AppState> {
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
      isLoading: true,
      user: {
        id: generateUserId(),
        name: "User Teste",
        color: generateRandomColor(),
        coords: {
          latitude: 0,
          longitude: 0,
        },
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
  }

  static syncAppStorage = debounce(async (appState: AppState) => {
    if (appState.isLoading === true || appState.user.id.length === 0) {
      return;
    }

    await AppStorage.setStorage(appState);
  }, writeUserToStorageInterval);
}
