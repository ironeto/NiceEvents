import {EventImg} from './EventImg';
import styled from 'styled-components/native';
import {Box, Column, Text} from 'native-base';

export type EventItemProps = {
  name: string;
  type: string;
  imgUrl: string;
};

export function MapEventItem({name, type, imgUrl}: EventItemProps) {
  return (
    <Column padding='8px' alignItems='center'>
      <Box marginLeft='12px'>
        <EventImg color="#000" source={{uri:imgUrl}}/>
      </Box>
      <Box alignContent='center' justifyContent='center'>
        <Text fontSize='md' alignContent='center' justifyContent='center'>{name} ({type})</Text>
      </Box>      
    </Column>
  );
}
