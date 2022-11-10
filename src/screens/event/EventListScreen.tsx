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
  let events = [{name:'Event 1', type:'Music', imgUrl:'https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png', lat:111, long:111}]
  return (
    <EventListWrapper style={{flexDirection: isLandscape ? 'row' : 'column'}}>
      <EventList>
        {
        events.map(event => (
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