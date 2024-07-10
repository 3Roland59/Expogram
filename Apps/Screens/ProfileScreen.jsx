import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { onLogout } from '../../dist/authservices/auth'
import MessageModal from '../Components/Shared/MessageModal'
import { StyleSheet } from 'react-native'
import { Platform } from 'react-native'

export default function ProfileScreen() {
  const [messageModalVisible, setMessageModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleDataError = (message) => {
    setErrorMessage(message);
    setMessageModalVisible(true);
    setTimeout(() => {
      setMessageModalVisible(false);
    }, 3500);
  };

  const logout =async()=>{
    try {
      await onLogout()
    } catch (error) {
      handleDataError('Error Logging out, check connection and try again')
    }
  }

  return (
    <View style={styles.container} className="flex-1 justify-center items-center">
      <TouchableOpacity onPress={logout} className="mx-5 items-center justify-center mt-4 p-4" >
        <Text className="text-center text-[16px] text-[#07f] font-bold">Log Out</Text>
       </TouchableOpacity>

       <MessageModal
          messageModalVisible={messageModalVisible}
          message={errorMessage}
          height={70}
          icon="wrong"
        />
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    paddingTop: Platform.OS=='ios'?30:0
  }
})