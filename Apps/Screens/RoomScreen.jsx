import React, { useEffect, useState } from "react";
import { Text, View, TextInput, TouchableOpacity, Alert, ImageBackground, StyleSheet } from "react-native";

import { db } from "../../dist/firebaseconfig/firebase"; 
import {
  addDoc,
  collection,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  onSnapshot,
  deleteField,
} from "firebase/firestore";
import { Platform } from "react-native";
import useChatSendMessage from "../../Hooks/useChatSendMessage";
import { useUserContext } from "../../Context/UserContext";

export default function RoomScreen({ setScreen, screens, setRoomId, roomId, user }) {
  const onCallOrJoin = (screen) => {
    if (roomId.length > 0) {
      setScreen(screen);
    }
  };

  const {currentUser} = useUserContext()

  const { chatSendMessage } =
    useChatSendMessage({ user, currentUser});

    const handleSend = ()=>{
    chatSendMessage(null,'call', null)
    }

  //generate random room id
  useEffect(() => {
    const generateRandomId = () => {
      const characters = "abcdefghijklmnopqrstuvwxyz";
      let result = "";
      for (let i = 0; i < 7; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
      }
      return setRoomId(result);
    };
    generateRandomId();
  }, []);

  //checks if room is existing
  const checkMeeting = async () => {

    if (roomId) {
      const roomRef = doc(db, "room", roomId);
      const roomSnapshot = await getDoc(roomRef);

      // console.log(roomSnapshot.data());

      if (!roomSnapshot.exists() || roomId === "") {
        // console.log(`Room ${roomId} does not exist.`);
        Alert.alert("Wait for your instructor to start the meeting.");
        return;
      } else {
        onCallOrJoin(screens.JOIN);
      }
    } else {
      Alert.alert("Provide a valid Room ID.");
    }
  };



  return (
    <ImageBackground source={require('../../assets/images/bg1.jpg')} className='flex-1'>
    <View className='flex-1 justify-center bg-[#00000080]'>
      <Text className="text-3xl font-bold text-center text-white">Enter Room ID:</Text>
      <Text className="text-[18px] mb-4 mt-2 text-center mx-2 text-slate-400">Make sure you share the room id to your friend before you start the call</Text>
      <TextInput
        className="border-white text-white text-[17px]  border-2 mx-5 my-3  p-3 rounded-md"
        value={roomId}
        onChangeText={setRoomId}
      />
      <View className="justify-around flex flex-row mx-5 mt-4">

        <TouchableOpacity onPress={() => checkMeeting()} >
                <View style={styles.btnContainer1} className='w-[150px]'>
                  <Text style={styles.btnText1}>Join Call</Text>
                </View>
              </TouchableOpacity>
        <TouchableOpacity onPress={() => {onCallOrJoin(screens.CALL); handleSend()}} className='w-[150px]'>
                <View style={styles.btnContainer}>
                  <Text style={styles.btnText}>Start Call</Text>
                </View>
              </TouchableOpacity>

      </View>
    </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  btnContainer: {
    // marginTop: 35,
    alignItems: "center",
    backgroundColor: "#07f",
    // opacity: isValid ? 1 : 0.6,
    // marginHorizontal: 20,
    justifyContent: "center",
    alignContent: "center",
    height: Platform.OS === "android" ? 56 : 54,
    borderRadius: 10,
  },
  btnContainer1: {
    // marginTop: 35,
    alignItems: "center",
    // backgroundColor: "#07f",
    // opacity: isValid ? 1 : 0.6,
    // marginHorizontal: 20,
    borderWidth:2,
    borderColor:'#09f',
    justifyContent: "center",
    alignContent: "center",
    height: Platform.OS === "android" ? 56 : 54,
    borderRadius: 10,
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "800",
    alignItems: 'center',
    justifyContent:'center'
  },
  btnText1: {
    color: "#09f",
    fontSize: 16,
    fontWeight: "800",
    alignItems: 'center',
    justifyContent:'center'
  },
})