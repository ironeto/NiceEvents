import {EventImg} from './EventImg';
import styled from 'styled-components/native';
import {Box, Row, Column, Divider, FlatList, Pressable, Text} from 'native-base';

export type EventItemProps = {
  name: string;
  type: string;
  imgUrl: string;
};

export function EventItem({name, type, imgUrl}: EventItemProps) {
  return (
    <Row padding='8px' alignItems='center'>
      <Box marginLeft='12px'>
        <EventImg color="#000" source={{uri:imgUrl}}/>
      </Box>
      <Text fontSize='md' paddingLeft='10px'>{name} ({type})</Text>
    </Row>
  );
}
