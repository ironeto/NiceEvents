  export type Coords = {
    latitude: number;
    longitude: number;
  };
  
  export type AppEvents = {
    id: number;
    name: string;
    type: string;
    imgUrl: string;
    coords: Coords;
  };

  export type Email ={
    value: string;
    validationMessage: string;
  };
  
  
  export type UserState = {
    id: string;
    name: string;
    coords: Coords;
  };
  
  export type AppState = {
    isLoading: boolean;
    isDarkTheme: boolean;
    user: UserState;
    events: AppEvents[];
    myEvents: AppEvents[];
  };