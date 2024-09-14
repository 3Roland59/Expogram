import { View, Text, Image, TouchableOpacity, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FontAwesome,  MaterialIcons, FontAwesome5, Feather, Ionicons } from '@expo/vector-icons'
import { StyleSheet } from 'react-native';
import { BlurView } from "expo-blur";
import ModalNotification from "../notifications/ModalNotification";
import { SIZES } from "../../../Utils/Constants";
import { Modal } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native';

export default function Header({navigation, currentUser}) {
    const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [notificationModal, setNotificationModal] = useState(false);

  useEffect(() => {
    if (currentUser?.event_notification > 0) {
      setNotificationModal(true);

      setTimeout(() => {
        setNotificationModal(false);
      }, 4000);
    } else {
      setNotificationModal(false);
    }
  }, [currentUser]);


  return (
    <View className="">
        <View className='justify-between items-center flex-row mx-5 my-1'>
        <TouchableOpacity className='flex flex-row justify-center items-center gap-1' onPress={() => setFilterModalVisible(true)}>
            <Image source={require('../../../assets/images/header.jpeg')} className="w-[130px] h-[50px] " resizeMode='contain' />
            <MaterialIcons
            name={"keyboard-arrow-down"}
            size={20}
            color={"#fff"}
          />
        </TouchableOpacity>
        <View className="flex-row items-center gap-4">
              <TouchableOpacity onPress={() => navigation.navigate("BrowserScreen")} >
                <Feather name='music' size={24} color={'white'} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("ImageBrowser")} >
                <Ionicons name='images-outline' size={24} color={'white'} />
              </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              navigation.navigate("Notifications", {
                currentUser: currentUser,
              });
            }} >
                {currentUser && currentUser.event_notification > 0 && (
              <View style={styles.unreadBadgeSmallContainer} />
            )}
                <FontAwesome name='heart-o' size={24} color={'white'} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Chat")} >
            {currentUser && currentUser.chat_notification > 0 && (
              <View className="bg-red-500 absolute pb-[2px] left-3 bottom-4 w-6  items-center justify-center z-50 rounded-3xl">
              <Text className="text-white text-xs">{currentUser.chat_notification}</Text>
          </View>
            )}
                <Image source={require('../../../assets/images/messenger-white.png')} className="w-[30px] h-[30px] " resizeMode='contain' />
            </TouchableOpacity>
        </View>
        </View>
      <Modal
        visible={filterModalVisible}
        animationType="fade"
        transparent={true}
      >
        <TouchableWithoutFeedback onPress={() => setFilterModalVisible(false)}>
          <View style={styles.modalBackdrop}>
            <BlurView intensity={70} style={styles.modalContainer}>
              <TouchableOpacity
                style={styles.modalRowContainer}
                onPress={() => {
                  navigation.navigate("Following");
                  setFilterModalVisible(false);
                }}
              >
                <Text style={styles.modalText}>Following</Text>
                <Feather name="users" size={26} color={"#fff"} />
              </TouchableOpacity>
              <View style={styles.modalDivider} />
              <TouchableOpacity
                style={styles.modalRowContainer}
                onPress={() => {
                  navigation.navigate("Favorites");
                  setFilterModalVisible(false);
                }}
              >
                <Text style={styles.modalText}>Favorites</Text>
                <Feather name="star" size={28} color={"#fff"} />
              </TouchableOpacity>
            </BlurView>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      {notificationModal && (
        <ModalNotification
          setNotificationModal={setNotificationModal}
          notificationCounter={currentUser.event_notification}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      marginTop: Platform.OS === "android" ? 24 : 22,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginRight: 20,
      zIndex: 1,
    },
    instagramContainer: {
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
      marginLeft: 14,
    },
    logo: {
      width: 128,
      height: 42,
      resizeMode: "cover",
    },
    iconsContainer: {
      flexDirection: "row",
      marginLeft: 15,
    },
    messenger: {
      marginTop: 1,
      width: 28,
      height: 27,
    },
    unreadBadgeSmallContainer: {
      backgroundColor: "#FF3250",
      position: "absolute",
      right: 0,
      top: 1,
      height: 9,
      width: 9,
      borderRadius: 10,
      zIndex: 2,
      justifyContent: "center",
      alignItems: "center",
    },
    unreadBadgeContainer: {
      backgroundColor: "#FF3250",
      position: "absolute",
      right: -5,
      top: -3,
      height: 16,
      width: 16,
      borderRadius: 10,
      zIndex: 2,
      justifyContent: "center",
      alignItems: "center",
    },
    unreadBadgeText: {
      fontWeight: "600",
      fontSize: 11,
      color: "white",
      paddingBottom: 1,
    },
    divider: {
      width: "100%",
      height: 0.5,
      backgroundColor: "#111",
    },
    modalBackdrop: {
      flex: 1,
      backgroundColor: "transparent",
    },
    modalContainer: {
      position: "absolute",
      top: Platform.OS === "ios" ? 100 : SIZES.Height * 0.07,
      left: 22,
      backgroundColor: "rgba(35,35,35,0.6)",
      borderRadius: 15,
      overflow: "hidden",
    },
    modalRowContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 15,
      marginRight: 15,
      height: 46,
    },
    modalText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "500",
      marginHorizontal: 15,
    },
    modalDivider: {
      width: "100%",
      height: 0.5,
      backgroundColor: "#fff",
    },
  });