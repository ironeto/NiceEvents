import {FlatList, Alert} from 'react-native';
import {useState, useEffect} from 'react';
import type {StackScreenProps} from '@react-navigation/stack';
import type {ParamListBase} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Pressable, Center, Box, Spinner, Fab} from 'native-base';
import {EventPhotosCard, EventPhotosCardProps} from './EventPhotosCard';
import {useLazyQuery} from '../../utils/apolloClient';
import {queryGetEventsPhotos} from './queryGetEventsPhotos';
import {useAppDispatch, useAppSelector, eventActions, eventPhotosActions} from '../../app/appStore';
import screens from '../../screens.json';

const pageSize = 3;

export function EventPhotosListScreen({navigation}: StackScreenProps<ParamListBase>) {
  const [endReached, setEndReached] = useState(false);
  const [page, setPage] = useState(1);
  const eventPhotos = useAppSelector(state => state.eventPhotos.eventPhotos);
  const dispatch = useAppDispatch();
  const [getEventsPhotos, {loading}] = useLazyQuery(queryGetEventsPhotos, {
    fetchPolicy: 'no-cache',
  });

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      const nextPage = 1;

      const {data} = await getEventsPhotos({
        variables: {
          pageSize,
          page: nextPage,
        },
      });

      const eventsPhotos = eventPhotosDecoder(data);
      dispatch(eventPhotosActions.setEventPhotos({eventsPhotos}));
    });

    return unsubscribe;
  }, [navigation]);

  async function onEndReached() {
    if (loading || endReached) {
      return;
    }

    const nextPage = page + 1;

    const {data} = await getEventsPhotos({
      variables: {
        pageSize,
        page: nextPage,
      },
    });
    const eventPhotos = eventPhotosDecoder(data);

    if (eventPhotos.length < pageSize) {
      setEndReached(true);
    }

    setPage(nextPage);
    dispatch(eventPhotosActions.addEventPhotos({eventPhotos}));
  }

  return (
    <Center height="full">
      {eventPhotos.length > 0 && (
        <Box marginTop="4" flex="1">
          <FlatList
            data={eventPhotos}
            renderItem={({item}) => (
              <Pressable
                onPress={() => {
                  Alert.alert('', JSON.stringify(item, undefined, 2));
                }}>
                <EventPhotosCard {...item} />
              </Pressable>
            )}
            onEndReached={onEndReached}
          />
        </Box>
      )}
      {loading && (
        <Center marginBottom="4">
          <Spinner size="lg" color="white" />
        </Center>
      )}
      <Fab
        renderInPortal={false}
        padding="1.5"
        // onPress={() => navigation.navigate(screens.eventPhotos.add)}
        icon={<Icon name="add" size={32} />}
      />
    </Center>
  );
}

function eventPhotosDecoder(data: any): EventPhotosCardProps[] {
  if (data === undefined) {
    return [];
  }

  const {data: events} = data.niceEvents;
  const items = events.map(
    ({attributes: {EventName, Photo}}: any) => ({
      name : EventName,
      imageSrc: `https://webservices.jumpingcrab.com${Photo.data.attributes.url}`
    }),
  );

  return items;
}
