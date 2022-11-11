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
import {Event} from '../../models/event';
import { AppContext } from '../../app/AppContext';

const EventList = styled.ScrollView`
  flex: 1;
  background-color: white;
`;

const EventListWrapper = styled.View`
  height: 100%;
  background-color: white;
`;

export function EventListScreen() {
  const {width, height} = useWindowDimensions();
  const isLandscape = width > height;
  const {appState, setAppState} = useContext(AppContext);

  return (
    <EventListWrapper style={{flexDirection: isLandscape ? 'row' : 'column'}}>
      <EventList>
        {
        appState.events.map(event => (
          <TouchableOpacity
            onPress={() => {
              Alert.alert('Name', `${event.name} - ${event.lat} ${event.long}`);
            }}>
            <EventItem name={event.name} type={event.type} imgUrl={event.imgUrl} />
          </TouchableOpacity>
        ))}
      </EventList>
    </EventListWrapper>
  );
}