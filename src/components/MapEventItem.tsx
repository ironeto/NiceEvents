import {EventImg} from './EventImg';
import styled from 'styled-components/native';

const EventItemWrapper = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px;
`;

const EventImgWrapper = styled.View`
  margin-right: 12px;
`;

const NameText = styled.Text`
  font-size: 18px;
`;

export type EventItemProps = {
  name: string;
  type: string;
  imgUrl: string;
};

export function MapEventItem({name, type, imgUrl}: EventItemProps) {
  return (
    <EventItemWrapper>
      <EventImgWrapper>
        <EventImg color="#000" source={{uri:imgUrl}}/>
      </EventImgWrapper>
      <NameText>{name} ({type})</NameText>
    </EventItemWrapper>
  );
}
