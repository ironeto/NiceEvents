import {View, Text, StyleSheet, Image, ImageProps} from 'react-native';

export type EventImgProps = {
  color: string;
  source?: ImageProps['source'];
};

let size = 50;

export function EventImg({color, source}: EventImgProps) {
  return (
    <View
      style={[
        styles.eventImgWrapper,
        {
          width: size,
          height: size,
          backgroundColor: color,
          borderRadius: size / 2,
        },
      ]}>
          <Image
            source={source}
            style={{width: size, height: size, borderRadius: size / 2}}
          />
    </View>
  );
}

const styles = StyleSheet.create({
  eventImgWrapper: {
    borderWidth: 5,
    borderColor: '#ccc',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

