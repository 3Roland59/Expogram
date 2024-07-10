import { View, Text, Image, TouchableOpacity, StyleSheet, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native'
import { useCurrentUser } from '../../../Hooks/useCurrentUser'
import useHandleFollow from '../../../Hooks/useHandleFollow'

export default function OtherUsers({users, navigation, user}) {

    const [suggested, setSuggested] = useState([]);
    const [followed, setFollowed] = useState(null);
    const {currentUser} = useCurrentUser()
    const { handleFollow } = useHandleFollow();
    useEffect(()=>{
        const touse = users.filter((item)=>{
            return item.username != user.username
        })
        setSuggested(touse)
    }, [])

    console.log(users)

  return (
    <View className='mt-2 mb-0'>
        <Text style={styles.title}>Suggested for you</Text>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} className='pl-2'>
     {users&&suggested.map((item, index)=>(
        <TouchableOpacity key={index} onPress={()=> {navigation.navigate('UserDetail', {email:item.email,users}); console.log('other')}} className='h-[230px] border-[0.5px] border-white rounded-2xl w-[180px] m-2 flex flex-col justify-around items-center py-3'>
            <View className='w-[100] h-[100] rounded-full border-2 border-[] overflow-hidden'>
            {
                item.profile_picture?
                <Image source={{uri: item.profile_picture}} className='w-[100] h-[100] rounded-full' />:<Image className='w-[100] h-[100] rounded-full' source={require('../../../assets/images/profile_thumbnail.png')} />
            }
            </View>
            <View>
            <Text className='text-center font-bold text-[16px] text-white'>{item.username}</Text>
            <Text className='text-center text-[#aaa] text-[12px]'>{item.username}</Text>
            </View>
            {
               item.followers.includes(currentUser.email)? (
                <TouchableOpacity
            style={styles.btnWrapperBlue}
          >
                <Text style={styles.btnTextblue}>Following</Text>
          </TouchableOpacity>
               ):(
                <TouchableOpacity
            onPress={() => {handleFollow(item.email); setFollowed(!followed)}}
            style={styles.btnWrapperBlue}
          >
            {item.followersRequset.includes(currentUser.email)||followed?
                <Text style={styles.btnTextblue}>Requested</Text>:<Text style={styles.btnTextblue}>Follow</Text>
                }
          </TouchableOpacity>
               )
            }
        </TouchableOpacity>
     ))}
    </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
    title: {
      color: "#fff",
      fontSize: 15,
      fontWeight: "700",
      marginHorizontal: 20,
      marginTop: Platform.OS === "android" ? 20 : 15,
      marginBottom: 10,
    },
    btnWrapperBlue: {
      backgroundColor: "#fff",
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center",
      height: Platform.OS === "android" ? 34 : 32,
      width: 140
    },
    btnTextblue: {
      marginBottom: Platform.OS === "android" ? 4 : 0,
      color: "#000",
      fontSize: 13.5,
      fontWeight: "600",
    }
})
