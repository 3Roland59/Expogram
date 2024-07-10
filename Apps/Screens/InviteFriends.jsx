import { View, Text, Share, Linking, Platform } from 'react-native'
import React from 'react'
import Tile from '../Components/Shared/Tile'
import { Ionicons,Entypo, AntDesign, FontAwesome, FontAwesome5, Fontisto } from "@expo/vector-icons";
import { Divider } from 'react-native-elements';
import TitleBar from '../Components/Shared/TitleBar';

export default function InviteFriends({navigation}) {

    const shareApp =()=>{
        const content = {
            message: 'Hi, I use expogram to connect with all my friends. Install the and experience a whole new world with your friends.\n'+'https://expogram.com'
        }
        Share.share(content).then(resp=>{
            // console.log(resp)
        },(error)=>{
            // console.log(error)
        })
    }

    const shareByEmail = () =>{ 
        const subject = 'Install Expogram'
        const body = 'Hi, I use expogram to connect with all my friends. Install the and experience a whole new world with your friends.\n'+'https://expogram.com'
        Linking.openURL('mailto:?subject='+subject+'&body='+body)
    }

    const shareByWhatsapp = () =>{ 
        const body = 'Hi, I use expogram to connect with all my friends. Install the and experience a whole new world with your friends.\n'+'https://expogram.com'
        Linking.openURL("whatsapp://send?text="+body)
    }

    const shareBySMS = () =>{ 
        const body = 'Hi, I use expogram to connect with all my friends. Install the and experience a whole new world with your friends.\n'+'https://expogram.com'
        Linking.openURL(`sms:${Platform.OS == 'ios'?'&':'?'}body=`+body)
    }


  return (
    <View className="flex-1 bg-[#000000]" style={{paddingTop:Platform.OS=='ios'?30:0}}>
      <TitleBar navigation={navigation} name={'Invite friends'} />
      <View className="px-5">
          <Tile icon={<FontAwesome name="whatsapp" size={24} color={'#fff'} />} text={'Invite friends by Whatsapp'} todo={()=>shareByWhatsapp()} />
            <Divider width={0.3} color='#aaa' />
          <Tile icon={<Fontisto name="email" size={24} color={'#fff'} />} text={'Invite friends by email'} todo={()=>shareByEmail()} />
            <Divider width={0.3} color='#aaa' />
          <Tile icon={<AntDesign name="message1" size={24} color={'#fff'} />} text={'Invite friends by SMS'} todo={()=>shareBySMS()} />
            <Divider width={0.3} color='#aaa' />
          <Tile icon={<Ionicons name='share-social-sharp' size={24} color={'#fff'} />} text={'Invite friends by ...'} todo={()=>shareApp()} />
            <Divider width={0.3} color='#aaa' />
            </View>
    </View>
  )
}