import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    Platform,
    SafeAreaView,
    TouchableOpacity,
    TouchableWithoutFeedback,
    TextInput,
    Keyboard,
    KeyboardAvoidingView,
    ActivityIndicator,
    Image,
  Modal,
    ImageBackground,
  } from "react-native";
  import React, { useState, useRef, useEffect } from "react";
  import { SIZES } from "../../Utils/Constants";
  import { MaterialIcons, Ionicons, Feather } from "@expo/vector-icons";
  import { useUserContext } from "../../Context/UserContext";
  import RenderDate from "../Components/chat/RenderDate";
  import RenderMessageA from "../Components/chat/RenderMessageA";
  import RenderMessageB from "../Components/chat/RenderMessageB";
  import { ScrollView } from "react-native-gesture-handler";
  import MessageModal, {
    handleFeatureNotImplemented,
  } from "../Components/Shared/modals/MessageModal";
import useFetchMessagesSelf from "../../Hooks/useFetchMessagesSelf";
import useChatSendMessageSelf from "../../Hooks/useChatSendMessagesSelf";
import RenderSelfProfile from "../Components/chat/RenderSelfProfile";
import * as ImagePicker from "expo-image-picker";
import CameraModule from "../Components/Shared/CameraModule";
import useUploadPicture from "../../Hooks/useUploadPicture";
  
  const ChatingSelf = ({ navigation }) => {
    const { currentUser } = useUserContext();
    const { messages } = useFetchMessagesSelf({ currentUser });
    const { chatSendMessage, textMessage,selectedImage, setSelectedImage, setTextMessage } =
      useChatSendMessageSelf({ currentUser });
    const scrollViewRef = useRef();
    const [messageModalVisible, setMessageModalVisible] = useState(false);
  const [cameraModalVisible, setCameraModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const {uploadPicture} = useUploadPicture()
  
  const ChooseImageFromGallery = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [3, 4],
        quality: 1,
      });

      if (!result.canceled) {
        const imageUrl = result.assets[0].uri;

        setSelectedImage(imageUrl);
      }
    } catch (error) {
      console.error("Error picking image:", error);
    }
  };
  
  const setCapturedPhoto = (photo) => {
      setSelectedImage(photo);
  };
  
  const handleSend = async()=>{
    setLoading(true)
    let imageUrl = null;
    if (selectedImage) {
      imageUrl = await uploadPicture(selectedImage, 'Chat', currentUser.username, 'image');
      console.log("imgurl: ", imageUrl);
    }
  chatSendMessage(imageUrl)
  setLoading(false)
  }

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);
  
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    <ImageBackground source={require('../../assets/images/bg.png')} className='flex-1'>
        <SafeAreaView style={styles.container}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.chatContainer}
          >
            <View style={styles.titleContainer}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.rowContainer}
              >
                <MaterialIcons name="arrow-back-ios" size={28} color={"#fff"} />
        {currentUser?.profile_picture?<Image
            source={{uri: currentUser?.profile_picture}}
            style={styles.profilePicture}
          />:
      <Image source={require('../../assets/images/profile_thumbnail.png')} style={styles.profilePicture} />}
                <View>
                  <Text style={styles.textTitle}>You</Text>
                  <Text style={styles.subtitle}>Personal messages</Text>
                </View>
              </TouchableOpacity>
              <View style={[styles.rowContainer, { gap: 20 }]}>
                {/* <TouchableOpacity
                  onPress={() =>
                    handleFeatureNotImplemented(setMessageModalVisible)
                  }
                >
                  <Feather name="phone" size={25} color={"#fff"} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    handleFeatureNotImplemented(setMessageModalVisible)
                  }
                >
                  <Feather
                    name="video"
                    size={25}
                    color={"#fff"}
                    style={{ transform: [{ scaleY: 1.1 }] }}
                  />
                </TouchableOpacity> */}
              </View>
            </View>
            <ScrollView
              snapToAlignment="end"
  onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
              ref={scrollViewRef}
              style={styles.scrollView}
            >
              <RenderSelfProfile currentUser={currentUser} />
              {messages.map((message, index) =>
                message.who === "timestamp" ? (
                  <View key={index}>
                    <RenderDate item={message} />
                  </View>
                ) : message.who === "Ai" ? (
                  <View style={styles.userContainer} key={index}>
        <Image source={require('../../assets/images/profile_thumbnail.png')} style={styles.littleProfilePicture} />
                    <RenderMessageA item={message} />
                  </View>
                ) : (
                  <View key={index} style={styles.currentUserContainer}>
                    <RenderMessageB item={message} />
                  </View>
                )
              )}
            </ScrollView>
            <View>
            {selectedImage&& <View className='relative ml-4 p-2 w-[158px] h-[158px]'>
            <TouchableOpacity onPress={() => setSelectedImage(null)} className='absolute top-4 right-3 z-10 bg-[#000000d0] items-center justify-center rounded-full w-[30px] h-[30px]'>
              <Ionicons name="close" size={24} color="#fff" />
            </TouchableOpacity><Image source={{uri: selectedImage}} className='rounded-lg w-[150px] h-[150px] ' /></View>}
            <View style={styles.searchWrapper}>
              <View style={styles.rowContainer}>
                <TouchableOpacity
                  onPress={
                    () => setCameraModalVisible(true)
                  }
                  style={styles.cameraWrapper}
                >
                  <Ionicons
                    name="camera"
                    size={20}
                    color={"#fff"}
                    style={styles.searchIcon}
                  />
                </TouchableOpacity>
  
                <TextInput
                  value={textMessage}
                  onChangeText={setTextMessage}
                  maxLength={255}
                  autoCapitalize="sentences"
                  autoCorrect={true}
                  placeholder="Message..."
                  placeholderTextColor={"#999"}
                  style={styles.searchInput}
                  enterKeyHint="search"
                  onFocus={() =>
                    setTimeout(() => {
                      scrollViewRef.current.scrollToEnd({ animated: true });
                    }, 100)
                  }
                  multiline
                />
              </View>
              {loading ? (
              <ActivityIndicator color={'#fff'} style={{ marginRight: 14 }} />
            ) : textMessage.length > 0 || selectedImage != ''? (
              <TouchableOpacity
                onPress={() => {
                  (textMessage != ""||selectedImage!='') && handleSend();
                }}
                style={styles.rowContainer}
              >
                <Text style={styles.sendText}>Send</Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.rowContainer}>
                <TouchableOpacity
                  onPress={() =>
                    ChooseImageFromGallery()
                  }
                  style={{ marginRight: 12 }}
                >
                  <Ionicons name="image-outline" size={22} color={"#fff"} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    handleFeatureNotImplemented(setMessageModalVisible)
                  }
                  style={{ marginRight: 20 }}
                >
                  <Feather name="mic" size={19} color={"#fff"} />
                </TouchableOpacity>
              </View>
            )}
            </View>
          </View>
          </KeyboardAvoidingView>
          <MessageModal
            messageModalVisible={messageModalVisible}
            message={"This feature is not yet implemented."}
            height={70}
          />
          <Modal
        animationType="slide"
        transparent={false}
        visible={cameraModalVisible}
      >
        <CameraModule
          setCameraModalVisible={setCameraModalVisible}
          setCapturedPhoto={setCapturedPhoto}
          // setSelectedType={setSelectedType}
          // selectedType={selectedType}
          options={false}
        />
      </Modal>
        </SafeAreaView>
        </ImageBackground>
      </TouchableWithoutFeedback>
    );
  };
  
  export default ChatingSelf;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#000000a0",
      paddingTop: Platform.OS === "android" ? 0 : 30,
    },
    chatContainer: {
      flex: 1,
      justifyContent: "space-between",
    },
    rowContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    profilePicture: {
      height: 44,
      width: 44,
      borderRadius: 100,
      borderWidth: 4,
      borderColor: "#000",
      marginHorizontal: 5,
    },
    titleContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: 20,
      paddingTop: 9,
      backgroundColor:'#000'
    },
    textTitle: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "700",
    },
    subtitle: {
      color: "#bbb",
      fontSize: 12,
      fontWeight: "300",
      marginBottom: 6,
    },
    searchWrapper: {
      marginTop: 10,
      paddingVertical: 3,
      marginLeft: 12,
      marginRight: 12,
      backgroundColor: "#252525",
      minHeight: 46,
      borderRadius: 50,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 10,
    },
    searchInput: {
      color: "#fff",
      height: "100%",
      fontSize: 17,
      marginBottom: 4,
      marginLeft: 10,
      width: SIZES.Width * 0.6,
    },
    cameraWrapper: {
      marginLeft: 8,
      height: 34,
      width: 34,
      borderRadius: 100,
      backgroundColor: "#07f",
      alignItems: "center",
      justifyContent: "center",
    },
    sendText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "700",
      marginRight: 15,
    },
    scrollView: {
      flex: 1,
      marginHorizontal: 15,
    },
    userContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 10,
    },
    littleProfilePicture: {
      height: 30,
      width: 30,
      borderRadius: 100,
    },
    currentUserContainer: {
      alignItems: "flex-end",
      justifyContent: "center",
      marginBottom: 10,
    },
  });
  
