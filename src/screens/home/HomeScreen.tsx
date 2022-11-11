  import {useContext, useEffect} from 'react';
import {StyleSheet, TouchableHighlight, View, Text, ScrollView, Button} from 'react-native';
import styled from 'styled-components/native';
import MapView, {Marker, Callout} from 'react-native-maps';
import {AppContext} from '../../app/AppContext';

const delta = 0.020;

const MapContainer = styled.View`
  width: 100%;
  height: 100%;
`;

export function HomeScreen() {
  const {
    appState: {user, events},
  } = useContext(AppContext);

  // useEffect(() => {
  //   setUsersPositions(positions);
  // }, [positions]);

  const positions = [];
  const positionsArray = Object.values(positions);

  let onMapPress = (e) => {
      console.log(JSON.stringify(e.nativeEvent.coordinate));
  };

  let calloutPress = (id) => {
    alert(id);
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
          events.map(e => (
              <Marker
              key = {e.id}
              onPress={onMapPress}
              coordinate={e.coords}
              title={e.name}>
                          <Callout onPress={() => calloutPress(e.id)}>
                              <View style={styles.viewStyle}>
                                <View style={styles.viewStyleRow}>
                                  <Text>Nome: {e.name}</Text>
                                </View>
                                <View style={styles.viewStyleRow}>
                                  <Text>Tipo: {e.type}</Text>
                                </View>
                                <View style={styles.viewStyleRow}>
                                  <Button
                                      color='blue'
                                      title="Marcar interesse"
                                      onPress={() => enrollEvent(e.id)}
                                    />
                                </View>
                              </View>
                          </Callout>
            </Marker>
          ))}

        {/* {positionsArray.map(position => (
          <Marker coordinate={position.coords} key={position.id} />
        ))} */}
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
  calloutText: {
    width: 140,
    height: 100,
    fontSize: 18,
  },
  viewStyle: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: 200,
    height: 100,
    backgroundColor: "#fff",
    padding: 20
  },
  calloutTitle: {
    fontSize: 17,
    marginBottom: 5,
    fontWeight: "bold",
    
},
calloutDescription: {
    fontSize: 14
}
});
