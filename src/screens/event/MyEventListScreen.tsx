import {useContext, useState} from 'react';
import {
  View,
  useWindowDimensions,
  Alert,
  Dimensions,
  Text,
  TouchableOpacity
} from 'react-native';

import {EventItem} from '../../components/EventItem';
import styled from 'styled-components/native';
import { Float } from 'react-native/Libraries/Types/CodegenTypes';
import { AppContext } from '../../app/AppContext';

const EventList = styled.ScrollView`
  flex: 1;
  background-color: white;
`;

const EventListWrapper = styled.View`
  height: 100%;
  background-color: white;
`;

export function MyEventListScreen() {
  const {width, height} = useWindowDimensions();
  const isLandscape = width > height;
  const {appState, setAppState} = useContext(AppContext);

  return (
    <EventListWrapper style={{flexDirection: isLandscape ? 'row' : 'column'}}>
      <EventList>
        {
        appState.myEvents.map(event => (
          <TouchableOpacity
            onPress={() => {
              Alert.alert('Name', `${event.name} - ${event.coords.latitude} ${event.coords.longitude}`);
            }}>
            <EventItem name={event.name} type={event.type} imgUrl={event.imgUrl} />
          </TouchableOpacity>
        ))}
      </EventList>
    </EventListWrapper>
  );
}