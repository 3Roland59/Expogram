import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Animated,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  StatusBar,
} from "react-native";
import React, { useState } from "react";
import TitleBar from "../Components/Shared/TitleBar";
import SearchBar from "../Components/Shared/SearchBar";
import Followers from "../Components/follow/Followers";
import Requests from "../Components/follow/Requests";
import Following from "../Components/follow/Following";
import useFetchRequests from "../../Hooks/useFetchRequests";
import useFetchFollowers from "../../Hooks/useFetchFollowers";
import useFetchFollowing from "../../Hooks/useFetchFollowing";
import useTabSlideAnimation from "../../Utils/useTabSlideAnimation";
import { useUserContext } from "../../Context/UserContext";
import { SIZES } from "../../Utils/Constants";

const Follow = ({ navigation }) => {
  const { currentUser } = useUserContext();

  const [onSearch, setOnSearch] = useState(false);
  const [resetSearchBar, setResetSearchBar] = useState(0);
  const [filteredFollowers, setFilteredFollowers] = useState({});
  const [filteredFollowing, setFilteredFollowing] = useState({});

  const { requests } = useFetchRequests({ user: currentUser });
  const { followers } = useFetchFollowers({ user: currentUser });
  const { following } = useFetchFollowing({ user: currentUser });
  const { handleTabChange, translation, activeButton } = useTabSlideAnimation();

  const childPropChange = (searchKey) => {
    searchKey !== "" ? setOnSearch(true) : setOnSearch(false);
    if (activeButton === 0) {
      if (followers.length > 0) {
        const filteredData = followers.filter(
          (follower) =>
            follower.username.includes(searchKey)
        );
        setFilteredFollowers(filteredData);
      }
    } else {
      if (following.length > 0) {
        const filteredData = following.filter(
          (follow) =>
            follow.username.includes(searchKey)
        );
        setFilteredFollowing(filteredData);
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} disabled>
      <SafeAreaView style={styles.container}>
        <TitleBar navigation={navigation} name={currentUser.username} />
        <View style={styles.rowContainer}>
          <TouchableOpacity
              onPress={() => {
                setResetSearchBar(resetSearchBar + 1);
                handleTabChange(0);
              }}>
            <Text
              style={styles.textTitle}
            >
              {currentUser.followers.length > 0
                ? currentUser.followers.length + "  Followers"
                : "Followers"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
              onPress={() => {
                setResetSearchBar(resetSearchBar + 1);
                handleTabChange(1);
              }}>
            <Text
              style={styles.textTitle}
            >
              {currentUser.following.length > 0
                ? currentUser.following.length + "  Following"
                : "Following"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
              onPress={() => {
                setResetSearchBar(resetSearchBar + 1);
                handleTabChange(2);
              }}>
            <Text
              style={styles.textTitle}
            >
              {currentUser.followersRequset.length > 0
                ? currentUser.followersRequset.length + "  Requests"
                : "Requests"}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.lineContainer}>
          <View
            style={
              activeButton === 0 ? styles.highlightedOn : styles.highlightedOff
            }
          />
          <View
            style={
              activeButton === 1 ? styles.highlightedOn : styles.highlightedOff
            }
          />
          <View
            style={
              activeButton === 2 ? styles.highlightedOn : styles.highlightedOff
            }
          />
        </View>

        <Animated.View
          style={[
            styles.flatListContainer,
            { transform: [{ translateX: translation }] },
          ]}
        >
          <FlatList
            ListHeaderComponent={
              <SearchBar
                onPropChange={childPropChange}
                resetSearchBar={resetSearchBar}
              />
            }
            style={{ width: SIZES.Width }}
            data={onSearch ? filteredFollowers : followers}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <Followers
                user={item}
                currentUser={currentUser}
                navigation={navigation}
              />
            )}
          />

          <FlatList
            ListHeaderComponent={
              <SearchBar
                onPropChange={childPropChange}
                resetSearchBar={resetSearchBar}
              />
            }
            style={{ width: SIZES.Width }}
            data={onSearch ? filteredFollowing : following}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <Following
                user={item}
                currentUser={currentUser}
                navigation={navigation}
              />
            )}
          />

          <FlatList
            ListHeaderComponent={
              <Text style={styles.requestsText}>
                {requests.length > 0
                  ? "They want to start following you:"
                  : "No requests for now."}
              </Text>
            }
            style={{ width: SIZES.Width }}
            data={requests}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <Requests
                user={item}
                currentUser={currentUser}
                navigation={navigation}
              />
            )}
          />
        </Animated.View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default Follow;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingTop: Platform.OS === "android" ? 0 : 30,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 15,
    marginTop: 5,
    paddingHorizontal:10
  },
  textTitle: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  lineContainer: {
    flexDirection: "row",
    marginTop: 14,
  },
  highlightedOff: {
    flex: 1,
    backgroundColor: "#222",
    height: 1,
  },
  highlightedOn: {
    flex: 1,
    backgroundColor: "#ccc",
    height: 1,
  },
  flatListContainer: {
    flex: 1,
    flexDirection: "row",
    width: "300%",
  },
  requestsText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    marginTop: 15,
    marginHorizontal: 20,
  },
});
