import {FlatList, Alert} from 'react-native';
import {Pressable} from 'native-base';
import {FeedCard, FeedCardProps} from '../../app/FeedCard';
import {MapEventItem} from '../../app/FeedCard';

const cardList: Array<FeedCardProps> = Array.from({length: 10}, (_, index) => ({
  color: '#FFF',
  content: `Content with a long text ${index}`,
  coords: {
    latitude: 0,
    longitude: 0,
  },
  id: `user-${index}`,
  imageSrc: `https://loremflickr.com/320/160?param=${Math.random()}`,
  name: `User ${index}`,
}));

export function FeedScreen() {
  return (
    <FlatList
      data={cardList}
      renderItem={({item}) => (
        <Pressable
          onPress={() => {
            Alert.alert('', JSON.stringify(item, undefined, 2));
          }}>
          <FeedCard {...item} />
        </Pressable>
      )}
    />
  );
}
