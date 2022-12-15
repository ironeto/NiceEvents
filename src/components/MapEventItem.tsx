import {EventImg} from './EventImg';
import styled from 'styled-components/native';
import {Box, Column, Text} from 'native-base';
import { color } from 'native-base/lib/typescript/theme/styled-system';
import { useAppSelector } from '../app/appStore';

export type EventItemProps = {
  name: string;
  type: string;
  imgUrl: string;
};

export function MapEventItem({name, type, imgUrl}: EventItemProps) {
  const isDarkTheme = useAppSelector(state => state.app.isDarkTheme);

  return (
    <Column padding='8px' alignItems='center'>
      <Box marginLeft='12px'>
        <EventImg source={{uri:imgUrl}}/>
      </Box>

      
      <Box alignContent='center' justifyContent='center' style={{backgroundColor: isDarkTheme? '	#2F4F4F' : '#ffffff'}}>
        <Text fontSize='md' alignContent='center' justifyContent='center' style={{color: isDarkTheme? '#101010' : '#000000'}}>{name} ({type})</Text>
      </Box>      
    </Column>
  );
}
