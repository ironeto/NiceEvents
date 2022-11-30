import {Image, ImageProps} from 'react-native';
import {Box} from 'native-base';

export type EventImgProps = {
  color: string;
  source?: ImageProps['source'];
};

let size = 50;

export function EventImg({color, source}: EventImgProps) {
  return (
    <Box width={size} height={size} backgroundColor={color} borderRadius={size/2}>
          <Image
            source={source}
            style={{width: size, height: size, borderRadius: size / 2}}
          />
    </Box>
  );
}