import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Animated,
  View,
  SafeAreaView,
  Keyboard,
  Platform,
  StatusBar,
  Image,
  ScrollView,
  RefreshControl,
} from "react-native";
import React, { useCallback, useState } from "react";
import { SIZES } from "../../Utils/Constants";
import { useUserContext } from "../../Context/UserContext";
import useSlideOnKeyboard from "../../Utils/useSlideOnKeyboard";
import useHeaderScrollAnim from "../../Utils/useHeaderScrollAnim";
import useFadeInOutAnim from "../../Utils/useFadeInOutAnim";
import DefaultPosts from "../Components/search/DefaultPosts";
import useFindUsers from "../../Hooks/useFindUsers";
import Searching from "../Components/search/Searching";

const SearchScreen = ({ navigation }) => {
  const { currentUser } = useUserContext();
  const { headerTranslate, headerOpacity, scrollY } = useHeaderScrollAnim(43);
  const [searchKey, setSearchKey] = useState("");
  const [focus, setFocus] = useState(false);
  const { beginSearch, users, searchResult } = useFindUsers({
    currentUser,
    searchKey,
  });

    const [refreshing, setRefreshing] = useState(false)
    const onRefresh = useCallback(()=>{
        setRefreshing(true)
        setRefreshing(false)
    },[])

  const [focusedBar, setFocusedBar] = useState(false);
  const [inputWidth, setInputWidth] = useState(SIZES.Width / 0.9);
  const [searching, setSearching] = useState(false);
  const { fadeEffect } = useFadeInOutAnim({ focusedBar });

  const { slideAnimation, forceSlideAnimation } = useSlideOnKeyboard(
    SIZES.Width * 0.75,
    SIZES.Width * 0.9
  );

  const handleFocus = () => {
    beginSearch();
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

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: false }
  );

  const arr = [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  ];

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.header(70),
          {
            // transform: [{ translateY: headerTranslate }],
          },
        ]}
      >
        <View style={styles.searchBar}>
        <Animated.View style={[{ width: slideAnimation },{ opacity: 1 },]} className=' bg-[#3d3d3d] m-5 rounded-full p-2 px-3 flex flex-row items-center shadow-xl shadow-black'>
         <Image source={require('../../assets/images/search.png')} className='w-[25px] h-[25px] mr-2' />
         <TextInput
              value={searchKey}
              onChangeText={(item)=>setSearchKey(item)}
              maxLength={30}
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Search"
              placeholderTextColor={"#999"}
              style={[styles.searchInput, { width: inputWidth }]}
              enterKeyHint="search"
              onFocus={() => handleFocus()}
              className='text-[16px]'
            />
       </Animated.View>
          {focusedBar && (
            <TouchableOpacity onPress={() => handleCancel()}>
              <Text style={styles.cancelBtn}>Cancel</Text>
            </TouchableOpacity>
          )}
        </View>
      </Animated.View>
      <View style={styles.result}>
        <DefaultPosts navigation={navigation} handleScroll={handleScroll} />

        {searching && (
          <Animated.View
            style={[
              styles.searchingContainer,
              {
                opacity: fadeEffect,
              },
            ]}
          >
            <Searching
              navigation={navigation}
              searchResult={searchKey.length > 0 ? searchResult : users}
              currentUser={currentUser}
              users={users}
            />
          </Animated.View>
        )}
      </View>
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingTop: Platform.OS=='ios'? 30: 0
  },
  header: (ContainerHeight) => ({
    position: "absolute",
    left: 0,
    right: 0,
    top: Platform.OS=='ios'? 30: 0,
    height: ContainerHeight,
    zIndex: 1,
  }),
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchInput: {
    color: "#fff",
    height: "100%",
  },
  cancelBtn: {
    color: "#fff",
    fontWeight: "500",
    fontSize: 16,
    marginLeft:-7
  },
  result: {
    flex: 1,
    // paddingTop:20
  },
  searchingContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#000",
    paddingTop:20
  },
});
