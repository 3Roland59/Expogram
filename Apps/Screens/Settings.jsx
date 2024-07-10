import { View, Text, TouchableOpacity, Platform } from 'react-native'
import React, { useRef, useState } from 'react'
import Tile from '../Components/Shared/Tile'
import { Ionicons,Entypo, SimpleLineIcons, FontAwesome, Feather, EvilIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import BottomSheetLogout from '../Components/profile/bottomSheets/BottomSheetLogout';
import { Divider } from 'react-native-elements';
import TitleBar from '../Components/Shared/TitleBar';
import MessageModal, {
  handleFeatureNotImplemented,
} from "../Components/Shared/modals/MessageModal";

export default function Settings({navigation}) {
    const bottomSheetRefLogout = useRef(null);
    const [messageModalVisible, setMessageModalVisible] = useState(false);
  return (
    <View className="flex-1 bg-[#000000]" style={{paddingTop:Platform.OS=='ios'?30:0}}>
        <TitleBar navigation={navigation} name={'Settings'} />
      <View className="px-5">
          <Tile icon={<MaterialCommunityIcons name="pencil-outline" size={24} color={'#fff'} />} text={'Edit Profile'} todo={() => navigation.navigate("EditProfile")} />
            <Divider width={0.3} color='#aaa' />
          <Tile icon={<Ionicons name="people-outline" size={24} color={'#fff'} />} text={'InviteFriends'} todo={()=>navigation.navigate('InviteFriends')} />
            <Divider width={0.3} color='#aaa' />
          <Tile icon={<Ionicons name="help-outline" size={24} color={'#fff'} />} text={'Visit the Help Center'} todo={() => {handleFeatureNotImplemented(setMessageModalVisible)}} />
            <Divider width={0.3} color='#aaa' />
          <Tile icon={<Ionicons name="lock-closed-outline" size={24} color={'#fff'} />} text={'Privacy Policy'} todo={() => {handleFeatureNotImplemented(setMessageModalVisible)}} />
            <Divider width={0.3} color='#aaa' />
          <Tile  icon={<SimpleLineIcons name="book-open" size={20} color={'#fff'} />} text={'Terms of Service'} todo={() => {handleFeatureNotImplemented(setMessageModalVisible)}} />
            <Divider width={0.3} color='#aaa' />
          <Tile icon={<Feather name="log-out" size={24} color={'#fff'} />} text={'Log out'} todo={() => bottomSheetRefLogout.current.present()} />
            <Divider width={0.3} color='#aaa' />
        </View>
        <BottomSheetLogout
        bottomSheetRef={bottomSheetRefLogout}
        navigation={navigation}
      />
      <MessageModal
        messageModalVisible={messageModalVisible}
        message={"This feature is not yet implemented."}
      />
      <Text className="text-[14px] mt-10 text-center text-gray-400">Version 1.0.0</Text>
    </View>
  )
}