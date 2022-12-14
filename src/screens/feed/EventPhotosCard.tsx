import {Box, Image, Text, Divider, AspectRatio} from 'native-base';


export type EventPhotosCardProps = {
  imageSrc: string;
  name: string;
};


export function EventPhotosCard({imageSrc, name}: EventPhotosCardProps) {
  return (
    <Box
      overflow="hidden"
      borderWidth="1"
      borderColor="dark.300"
      borderRadius="md"
      marginX="4"
      marginBottom="4"
      _dark={{
        bgColor: 'dark.100',
      }}
      _light={{
        bgColor: 'light.100',
      }}>
      <AspectRatio ratio={320 / 160} width="full">
        <Image src={imageSrc} alt="" resizeMode="cover" />
      </AspectRatio>
      <Box padding="4">
        <Divider />
        <Box marginTop="2">
          <Text fontSize="md">{name}</Text>
        </Box>
      </Box>
    </Box>
  );
}
