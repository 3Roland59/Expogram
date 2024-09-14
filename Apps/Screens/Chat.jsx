import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  Platform,
  SafeAreaView,
  FlatList,
  TextInput,
  Keyboard,
  Animated,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useUserContext } from "../../Context/UserContext";
import RenderUser from "../Components/chat/RenderUser";
import useFindUsers from "../../Hooks/useFindUsers";
import { SIZES } from "../../Utils/Constants";
import useSlideOnKeyboard from "../../Utils/useSlideOnKeyboard";
import useFetchContactList from "../../Hooks/useFetchContactList";
import firebase from "firebase/compat";
import MessageModal, {
  handleFeatureNotImplemented,
} from "../Components/Shared/modals/MessageModal";
import RenderAi from "../Components/chat/RenderAi";
import RenderSelf from "../Components/chat/RenderSelf";
import LottieView from "lottie-react-native";

const Chat = ({ navigation }) => {
  const [searchKey, setSearchKey] = useState("");
  const { currentUser } = useUserContext();
  const { chatUsers } = useFetchContactList();
  const { beginSearch, users, searchResult } = useFindUsers({
    currentUser,
    searchKey,
  });
  const { slideAnimation, forceSlideAnimation } = useSlideOnKeyboard(
    SIZES.Width * 0.75,
    SIZES.Width * 0.9
  );

  const [inputWidth, setInputWidth] = useState(SIZES.Width / 0.9);
  const [focusedBar, setFocusedBar] = useState(false);
  const [searching, setSearching] = useState(false);
  const [messageModalVisible, setMessageModalVisible] = useState(false);

  useEffect(() => {
    beginSearch();

    if (currentUser.chat_notification > 0) {
      try {
        firebase.firestore().collection("users").doc(currentUser.email).update({
          chat_notification: 0,
        });
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  const handleFocus = () => {
    forceSlideAnimation(true);
    clearTimeout();
    setFocusedBar(true);
    setSearching(true);
    setInputWidth(SIZES.Width * 0.7);
  };

  const handleCancel = () => {
    forceSlideAnimation(false);
    setFocusedBar(false);
    setSearching(false);
    Keyboard.dismiss();
    setInputWidth(SIZES.Width * 0.8);
  };

  const handleCamera = () => {
    handleFeatureNotImplemented(setMessageModalVisible);
  };

  const renderHeaderComponent = () => (
  <>
    <RenderSelf navigation={navigation} currentUser={currentUser} handleCamera={()=>handleCamera()} />
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.rowContainer}
        >
          <MaterialIcons name="arrow-back-ios" size={26} color={"#fff"} />
          <Text style={styles.textTitle}>{currentUser.username}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleFocus()}
        >
          <Feather name="edit" size={26} color={"#fff"} />
        </TouchableOpacity>
      </View>

      <View style={styles.searchBar}>
        <Animated.View
        className=' bg-[#3d3d3d] mt-3 ml-5 rounded-full p-[6px] px-3 flex flex-row items-center shadow-xl shadow-black'
          style={{ width: slideAnimation }}
        >
          <Ionicons
            name="search"
            size={20}
            color={"#999"}
            style={styles.searchIcon}
          />

          <TextInput
            value={searchKey}
            onChangeText={(text) => setSearchKey(text)}
            maxLength={30}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Search"
            placeholderTextColor={"#999"}
            style={[styles.searchInput, { width: inputWidth }]}
            enterKeyHint="search"
            onFocus={() => handleFocus()}
          />
        </Animated.View>
        {focusedBar && (
          <TouchableOpacity className='flex-1 pt-2' onPress={() => handleCancel()}>
            <Text style={styles.cancelBtn}>Cancel</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.result}>
        {searching ? (
          <View>
            <Text style={styles.subtitle}>
              {searchKey.length > 0 ? "Search result:" : "Suggested"}
            </Text>
            <FlatList
              data={searchKey.length > 0 ? searchResult : users}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <RenderUser navigation={navigation} user={item} />
              )}
              initialNumToRender={20}
              ListFooterComponent={<View className='mb-20' ></View>}
            />
          </View>
        ) : (
          <View className='flex-1 relative'>
            <Text style={styles.subtitle}>Messages</Text>
            <FlatList
              data={chatUsers}
              keyExtractor={(item, index) => index.toString()}
              ListHeaderComponent={renderHeaderComponent}
              renderItem={({ item }) => (
                <RenderUser
                  navigation={navigation}
                  user={item}
                  currentUser={currentUser}
                  handleCamera={()=>handleCamera()}
                />
              )}
              initialNumToRender={20}
            />
            <View className='absolute bottom-3 right-3 z-30'>
              <View className='relative'>
              <View className='absolute bottom-0 right-0 z-40'>
              <LottieView source={require('../../assets/lottie5.json')} style={{width:150,height:150}} autoPlay loop />
              </View>
              <View className='absolute bottom-11 right-11 z-50'>
              <RenderAi navigation={navigation}/>
              </View>
              </View>
            </View>
          </View>
        )}
      </View>
      <MessageModal
        messageModalVisible={messageModalVisible}
        message={"This feature is not yet implemented."}
      />
    </SafeAreaView>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingTop: Platform.OS === "ios" ? 30 : 10,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginTop:  4,
  },
  textTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "800",
    marginBottom: Platform.OS === "android" ? 6 : 1,
    transform: [{ scaleY: 1.05 }],
  },
  subtitle: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
    marginVertical: 14,
    marginLeft: 15,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchWrapper: {
    marginTop: 10,
    marginLeft: SIZES.Width * 0.04,
    backgroundColor: "#252525",
    height: Platform.OS === "android" ? 42 : 38,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  searchIcon: {
    marginLeft: 12,
    marginRight:10
  },
  searchInput: {
    color: "#fff",
    height: "150%",
    fontSize: 16,
    marginBottom: Platform.OS === "android" ? 3 : 0,
    flex: 1,
    marginLeft: 5,
  },
  cancelBtn: {
    color: "#fff",
    fontWeight: "500",
    fontSize: 15,
    marginLeft: 15,
  },
  result: {
    flex: 1,
  },
  searchingContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#000",
  },
});
