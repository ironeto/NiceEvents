import {useContext, useState} from 'react';
import {
  Alert,
} from 'react-native';

import {EventItem} from '../../components/EventItem';
import { AppContext } from '../../app/AppContext';
import {Box, Column, Divider, FlatList, Pressable} from 'native-base';

export function EventListScreen() {
  const {appState, setAppState} = useContext(AppContext);

  return (
    <Column height="full">
      <FlatList
      data={appState.events}
      ItemSeparatorComponent={Divider}
      renderItem={
        event => (
          <Pressable
            key = {event.item.id}
            _pressed={
              {bgColor: 'primary.100'}
            }
            onPress={() => {
              Alert.alert('Name', `${event.item.name} - ${event.item.coords.latitude} ${event.item.coords.longitude}`);
            }}>
            <EventItem name={event.item.name} type={event.item.type} imgUrl={event.item.imgUrl} />
          </Pressable>
        )
      }
      >
      </FlatList>
    </Column>
  );
}