import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeScreen} from '../screens/home/HomeScreen';
import {EventListScreen} from '../screens/event/EventListScreen';
import {MyEventListScreen} from '../screens/event/MyEventListScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import screens from '../screens.json';
import {EventPhotosListScreen} from '../screens/feed/EventPhotosListScreen';

const Tab = createBottomTabNavigator();

export function AppNavigator() {
  return (
    <Tab.Navigator
      backBehavior="initialRoute"
      initialRouteName={screens.home}
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen
        name={screens.myEventList}
        component={MyEventListScreen}
        options={{
          tabBarIcon({color, size}) {
            return <Icon name="check" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name={screens.eventList}
        component={EventListScreen}
        options={{
          tabBarIcon({color, size}) {
            return <Icon name="list" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name={screens.home}
        component={HomeScreen}
        options={{
          tabBarIcon({color, size}) {
            return <Icon name="home" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name={screens.eventPhotos}
        component={EventPhotosListScreen}
        options={{
          tabBarIcon({color, size}) {
            return <Icon name="rss-feed" size={size} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
}
