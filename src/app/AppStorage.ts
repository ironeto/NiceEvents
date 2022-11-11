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
      isLoading: false,
      user: {
        id: '1',
        name: 'Alvaro Neto',
        color: '#32a852',
        coords: {
          latitude: 0,
          longitude: 0,
        },
      },
      events: [
        {id: 1,name:'Event 1', type:'Music', imgUrl:'https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png',coords: {"longitude":-122.07908637821674,"latitude":37.41426211205346}},
        {id: 2,name:'Event 2', type:'Music', imgUrl:'https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png',coords: {"longitude":-122.07763127982615,"latitude":37.42026235458928}},
        {id: 3,name:'Event 3', type:'Music', imgUrl:'https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png',coords: {"longitude":-122.07703482359648,"latitude":37.427209977792295}},
        {id: 4,name:'Event 4', type:'Music', imgUrl:'https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png',coords: {"longitude":-122.09057662636043,"latitude":37.428661300750996}},
        {id: 5,name:'Event 5', type:'Music', imgUrl:'https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png',coords: {"longitude":-122.09313210099936,"latitude":37.42269208572032}},
        {id: 6,name:'Event 6', type:'Music', imgUrl:'https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png',coords: {"longitude":-122.09285248070957,"latitude":37.41574404330855}},
        {id: 7,name:'Event 7', type:'Music', imgUrl:'https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png',coords: {"longitude":-122.08779752254486,"latitude":37.412735945195095}},
        {id: 8,name:'Event 8', type:'Music', imgUrl:'https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png',coords: {"longitude":-122.08697676658632,"latitude":37.41802533461378}},
        {id: 9,name:'Event 9', type:'Music', imgUrl:'https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png',coords: {"longitude":-122.0652662962675,"latitude":37.41723925959228}},
        {id: 10,name:'Event 10', type:'Music', imgUrl:'https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png',coords: {"longitude":-122.0652662962675,"latitude":37.41571315339653}},
        {id: 11,name:'Event 11', type:'Music', imgUrl:'https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png',coords: {"longitude":-122.0645947381854,"latitude":37.412883210600974}},
        {id: 12,name:'Event 12', type:'Music', imgUrl:'https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png',coords: {"longitude":-122.0675515383482,"latitude":37.40806511152609}},
        {id: 13,name:'Event 13', type:'Music', imgUrl:'https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png',coords: {"longitude":-122.07667272537947,"latitude":37.4035460644434}},
        {id: 14,name:'Event 14', type:'Music', imgUrl:'https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png',coords: {"longitude":-122.09216751158237,"latitude":37.404338142489735}},
        {id: 15,name:'Event 15', type:'Music', imgUrl:'https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png',coords: {"longitude":-122.10236996412277,"latitude":37.40932958626689}},
        {id: 16,name:'Event 16', type:'Music', imgUrl:'https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png',coords: {"longitude":-122.1071634069085,"latitude":37.41490042458237}},
        {id: 17,name:'Event 17', type:'Music', imgUrl:'https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png',coords: {"longitude":-122.11212884634733,"latitude":37.42453117334294}},
        {id: 18,name:'Event 18', type:'Music', imgUrl:'https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png',coords: {"longitude":-122.11095403879882,"latitude":37.42833834322356}},
        {id: 19,name:'Event 19', type:'Music', imgUrl:'https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png',coords: {"longitude":-122.11414117366076,"latitude":37.43717910204528}},
        {id: 20,name:'Event 20', type:'Music', imgUrl:'https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png',coords: {"longitude":-122.11988043040037,"latitude":37.45026780093779}},
        {id: 21,name:'Event 21', type:'Music', imgUrl:'https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png',coords: {"longitude":-122.11463570594788,"latitude":37.45960843608383}}
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
