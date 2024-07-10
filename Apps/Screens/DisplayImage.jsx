import { View, Text, Image } from 'react-native'
import React from 'react'
import { StatusBar } from 'react-native'
import TitleBar from '../Components/Shared/TitleBar'
import useDownloadReel from '../../Hooks/useDownloadMedia'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  runOnJS,
  interpolateColor,
  FadeIn,
} from "react-native-reanimated";
import { GestureDetector, Gesture } from "react-native-gesture-handler";

export default function DisplayImage({navigation, route}) {


  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(1);
  const scale = useSharedValue(1);

  const gesture = Gesture.Pan()
    .onUpdate((value) => {
      translateX.value = value.translationX * 0.8;
      translateY.value = value.translationY * 0.8;
      const distance = Math.sqrt(
        value.translationX * value.translationX +
          value.translationY * value.translationY
      );
      const scaleValue = Math.min(Math.max(distance / 100, 1), 0.9);
      scale.value = withTiming(scaleValue, { duration: 100 });
    })
    .onEnd(() => {
      if (translateY.value > 75) {
        opacity.value = 0;
        runOnJS(navigation.goBack)();
      } else {
        translateX.value = withTiming(0, { duration: 300 });
        translateY.value = withTiming(0, { duration: 300 });
        scale.value = withTiming(1, { duration: 300 });
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
    backgroundColor: interpolateColor(
      opacity.value,
      [0, 1],
      ["transparent", "#000"]
    ),
    overflow: "hidden",
  }));


  const {downloadReel, downloading} = useDownloadReel()
    const {uri} = route.params
  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        style={[animatedStyle]}
        className='flex-1 bg-black relative'
        entering={FadeIn.delay(300).duration(200)}
      >
      <StatusBar barStyle={'light-content'} backgroundColor={'#000'}/>
      <View className='absolute left-0 right-0 top-0 z-10 bg-[#00000080]'>
        <TitleBar activity={downloading} name={'Image'} navigation={navigation} txt='Save' txtcolor='#fff' todo={()=>downloadReel(uri, 'Expogram')}  />
      </View>
      <Image source={{uri: uri}} className='flex-1' />
      </Animated.View>
    </GestureDetector>
  )
}