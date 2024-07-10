import 'react-native-url-polyfill/auto';
import { View, Text, StatusBar, ActivityIndicator, Animated } from 'react-native'
import React, { useEffect, useState } from 'react'
import HomeScreen from './Apps/Screens/HomeScreen'
import { COLORS } from './Utils/Constants'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import BottomTab from './Apps/Navigations/BottomTab'
import { NavigationContainer } from '@react-navigation/native'
import SignedInStack from './Apps/Navigations/SignedInStack'
import Login from './Apps/Screens/Login'
import SignedOutStack from './Apps/Navigations/SignedOutStack'
import { AppRegistry } from 'react-native'
import AuthNavigation from './Apps/Navigations/AuthNavigation';
import * as Font from 'expo-font';
import { MaterialIcons, AntDesign, Entypo, EvilIcons, Feather,FontAwesome,FontAwesome5,Ionicons,MaterialCommunityIcons,Octicons,Fontisto } from '@expo/vector-icons';
import { AppLoading } from 'expo';
import LottieView from 'lottie-react-native';
import { useNetInfo } from '@react-native-community/netinfo';

AppRegistry.registerComponent('main', () => App);

export default function App() {

  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        ...MaterialIcons.font,
        ...AntDesign.font,
        ...Entypo.font,
        ...EvilIcons.font,
        ...Feather.font,
        ...FontAwesome.font,
        ...FontAwesome5.font,
        ...Ionicons.font,
        ...MaterialCommunityIcons.font,
        ...Octicons.font,
        ...Fontisto.font,
      });
      setFontLoaded(true);
    }

    loadFonts();
  }, []);

  const netInfo = useNetInfo()
  const [connected, setConnected] = useState()
  const [show, setShow] = useState(false)

  useEffect(()=>{
    setConnected(netInfo?.isConnected)
    !netInfo.isConnected?setShow(true):setShow(false)
  }, [netInfo.isConnected])

  show && setTimeout(()=>{
    setShow(false)
  }, 3000)

  if (!fontLoaded) {
    return <View className='flex-1 bg-black justify-center items-center' >
      <StatusBar barStyle={'light-content'} backgroundColor={'#000'} />
      <LottieView source={require('./assets/lottie.json')} style={{width:300,height:300}} autoPlay loop />
    </View>;
  }


  return (
    <GestureHandlerRootView className="flex-1" style={{ backgroundColor: COLORS.black}}>
      {/* <SignedInStack /> */}
      {/* <SignedOutStack /> */}
      <AuthNavigation />
      {
            show &&
          <View className="absolute bottom-20 z-50 w-full items-center">
            <Text style={{elevation: 9}} className="text-center text-[14px] rounded-full w-[180px] text-white p-3 px-4 bg-[#333] "><Feather name='wifi-off' size={20} color={"red"} />     You are offline</Text>
          </View>
          }
    </GestureHandlerRootView>
  )
}