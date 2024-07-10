import {
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Platform,
  StatusBar,
} from "react-native";
import React, { useState } from "react";
import TitleBar from "../Components/Shared/TitleBar";
import SearchBar from "../Components/Shared/SearchBar";
import useFetchLikes from "../../Hooks/useFetchLikes";
import LikedBy from "../Components/likes/LikedBy";
import { useUserContext } from "../../Context/UserContext";

const Likes = ({ navigation, route }) => {
  const { likesByEmail } = route.params;
  const { currentUser } = useUserContext();
  const { likesByUsers, loader } = useFetchLikes({ likesByEmail });

  const [onSearch, setOnSearch] = useState(false);
  const [filteredLikes, setFilteredLikes] = useState({});

  const childPropChange = (searchKey) => {
    if (likesByUsers.length > 0) {
      setOnSearch(true);
      const filteredData = likesByUsers.filter(
        (userLike) =>
          userLike.username.includes(searchKey) 
      );
      setFilteredLikes(filteredData);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <TitleBar navigation={navigation} name="Likes" activity={loader} />
      <View style={styles.divider} />
      <FlatList
        ListHeaderComponent={<SearchBar onPropChange={childPropChange} />}
        data={onSearch === true ? filteredLikes : likesByUsers}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <LikedBy
            navigation={navigation}
            user={item}
            currentUser={currentUser}
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Likes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingTop: Platform.OS === "android" ? 0 : 30,
  },
  divider: {
    height: 0.5,
    backgroundColor: "#222",
  },
});
