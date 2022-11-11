import {useContext, useEffect, useState} from 'react';
import {StyleSheet, TouchableHighlight, View, Text, ScrollView, Button} from 'react-native';
import styled from 'styled-components/native';
import MapView, {Marker, Callout} from 'react-native-maps';
import {AppContext, AppEvents} from '../../app/AppContext';
import {MapEventItem} from '../../components/MapEventItem';

const delta = 0.1;

const MapContainer = styled.View`
  width: 100%;
  height: 100%;
`;


const movementIncrement = 0.01;

let generateEvents = true;

function generateBoolean() {
  return Math.random() > 0.5;
}

function generateInteger(max) {
  return Math.round(Math.random() * max);
}

function randomSingleCoordsPosition(singleCoords) {
  return parseFloat(
    (
      singleCoords +
      (generateBoolean() ? movementIncrement : -movementIncrement) *
        generateInteger(10)
    ).toFixed(7),
  );
}
 
function getRandomCoords(coords) {
  return {
    latitude: randomSingleCoordsPosition(coords.latitude),
    longitude: randomSingleCoordsPosition(coords.longitude),
  };
}

export function HomeScreen() {
  const {appState, setAppState} = useContext(AppContext);
  let events = appState.events;
  let user = appState.user;
  let myEvents = appState.myEvents;

  const [evs, setEvs] = useState([]);
  useEffect(() => {
      if(generateEvents == true){
        generateEvents = false;

        updateEventsCoords();

      }
  }, []);

  let updateEventsCoords = () =>{

    let eventsArr = events.map((val: any): AppEvents => ({
      id: val.id,
      name: val.name,
      type: val.type,
      imgUrl: val.imgUrl,
      coords: getRandomCoords(appState.user.coords)
    }));

    setEvs(eventsArr);
  };

  let onMapPress = (e) => {
      console.log(JSON.stringify(e.nativeEvent.coordinate));
  };

  let calloutPress = (id) => {
          let event = events.find(x => x.id === id);
    let myevent = myEvents.find(x => x.id === id);
    if(!myevent){
      appState.myEvents.push(event);
      setAppState({...appState});
      alert(`O Evento ${event?.name} foi adicionado à sua lista de interesses.`);
    }
    else
    {
      alert(`O Evento ${event?.name} já está na sua lista de interesses.`);
    }
};

  return (
    <MapContainer>
      <MapView
        showsUserLocation
        onPress={onMapPress}
        style={styles.map}
        region={{
          ...user.coords,
          latitudeDelta: delta,
          longitudeDelta: delta,
        }}>
        {
          evs.map(e => (
              <Marker
              key = {e.id}
              onPress={onMapPress}
              coordinate={e.coords}
              title={e.name}>
                          <Callout onPress={() => calloutPress(e.id)}>
                              <View style={styles.viewStyle}>
                                <View style={styles.viewStyleRow}>
                                  <MapEventItem name={e.name} type={e.type} imgUrl={e.imgUrl} />
                                </View>
                                <View style={styles.viewStyleRow}>
                                  <Button
                                      color='blue'
                                      title="Marcar interesse"/>
                                </View>
                              </View>
                          </Callout>
            </Marker>
          ))}
      </MapView>
    </MapContainer>
  );
}

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
    zIndex: 0
  },
  viewStyle: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: 200,
    height: 200,
    backgroundColor: "#fff",
    padding: 20
  },
});
