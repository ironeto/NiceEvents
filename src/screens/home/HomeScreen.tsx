import {useContext, useEffect, useState} from 'react';
import {StyleSheet, TouchableHighlight, View, Text, ScrollView, Button} from 'react-native';
import styled from 'styled-components/native';
import MapView, {Marker, Callout} from 'react-native-maps';
import {MapEventItem} from '../../components/MapEventItem';
import { Box, Row } from 'native-base';
import { AppEvents } from '../../app/types';
import { useAppSelector,useAppDispatch, eventActions, myEventActions  } from '../../app/appStore';
import mapStyleDark from './mapStyleDark.json';
import mapStyleLight from './mapStyleLight.json';

const delta = 0.1;

export function HomeScreen() {

  const dispatch = useAppDispatch();
  let events = useAppSelector(state => state.event);
  let user = useAppSelector(state => state.user);
  let myEvents = useAppSelector(state => state.myEvents.myEvents);
  let eventPhotos = useAppSelector(state => state.eventPhotos);
  let onMapPress = (e) => {
      console.log(JSON.stringify(e.nativeEvent.coordinate));
  };
  const isDarkMap = useAppSelector(state => state.app.isDarkTheme);
  const mapStyle = isDarkMap ? mapStyleDark : mapStyleLight;

  let calloutPress = (id) => {
    let event = events.find(x => x.id === id);
    let myevent = myEvents.find(x => x.id === id);
    if(!myevent){
      dispatch(myEventActions.addEventToInterest(event));
      alert(`O Evento ${event?.name} foi adicionado à sua lista de interesses.`);
    }
    else
    {
      alert(`O Evento ${event?.name} já está na sua lista de interesses.`);
    }
};

  return (
    <Box width='full' height='full'>
      <MapView
        showsUserLocation
        onPress={onMapPress}
        style={styles.map}
        customMapStyle={mapStyle}
        region={{
          ...user.coords,
          latitudeDelta: delta,
          longitudeDelta: delta,
        }}>
        {
          events.map(e => (
              <Marker
              key = {e.id}
              onPress={onMapPress}
              coordinate={e.coords}
              title={e.name}>
                          <Callout onPress={() => calloutPress(e.id)}>
                              <Row flexWrap="wrap" width="200" height="200" alignContent="center" justifyContent="center">
                                <Row>
                                  <MapEventItem name={e.name} type={e.type} imgUrl={e.imgUrl} />
                                </Row>
                                <Row>
                                  <Button
                                      color='blue'
                                      title="Marcar interesse"/>
                                </Row>
                              </Row>
                          </Callout>
            </Marker>
          ))}
      </MapView>
    </Box>
  );
}

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
    zIndex: 0
  }
});
