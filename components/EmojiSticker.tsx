import { View } from 'react-native';
import { Image, type ImageSource } from 'expo-image';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

type Props = { imageSize:number; stickerSource: ImageSource; };

export default function EmojiSticker( {imageSize,stickerSource}:Props ) {
  const scaleImage = useSharedValue(imageSize);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onStart( () => {
      if (scaleImage.value !== imageSize * 2) {
        scaleImage.value = scaleImage.value * 2;
      } else {
        scaleImage.value = Math.round(scaleImage.value / 2);
      }
    } );

    const imageStyle = useAnimatedStyle( () => {
      return {
        width: withSpring(scaleImage.value),
        height: withSpring(scaleImage.value),
      };
    } );

    const drag = Gesture.Pan().onChange(event => {
      translateX.value += event.changeX;
      translateY.value += event.changeY;
    });

    const containerStyle = useAnimatedStyle( () => {
      return {
        transform: [
          {translateX: translateX.value,}, 
          {translateY: translateY.value,}, ],
      };
    } );

  return (
    <GestureDetector gesture={Gesture.Simultaneous(doubleTap, drag)}>

      {/* This means that the pickedEmoji positioned 350 units above 
          its default position within the parent container. */} 
      <Animated.View style={ [containerStyle, {top: -350} ] }> 

        <Animated.Image source={stickerSource} resizeMode='contain' 
          style={ [imageStyle, {width:imageSize, height:imageSize} ] } />

      </Animated.View>
    </GestureDetector>
  );
}