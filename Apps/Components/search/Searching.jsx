import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import SkeletonSearching from "./Skeletons/SkeletonSearching";
import { Image } from "react-native";
import firebase from "firebase/compat";

const Searching = ({ navigation, searchResult, currentUser, users }) => {
  const [visibleUsers, setVisibleUsers] = useState(searchResult);
  const [user, setUser] = useState({});

  useEffect(() => {
    setVisibleUsers(searchResult);
  }, [searchResult]);

  // const fetchUser = (email) => {
  //   try {
  //     const unsubscribe = firebase
  //       .firestore()
  //       .collection("users")
  //       .doc(email)
  //       .onSnapshot((snapshot) => {
  //         setUser(snapshot.data());
  //       });

  //     return () => unsubscribe;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  const handleNavigate = (email) =>{
    // fetchUser(email)
      navigation.navigate("UserDetail", {
        email, users
      });
  }

  const handleCloseUser = (key) => {
    const updatedUsers = visibleUsers.filter((item) => item.id !== key);
    setVisibleUsers(updatedUsers);
  };

  return (
    <View style={styles.container}>
      <View style={styles.divider} />
      <ScrollView keyboardShouldPersistTaps="handled">
        {visibleUsers.length > 0 ? (
          visibleUsers.map((item, index) => (
            <View style={styles.rowContainer} key={index}>
              <TouchableOpacity
                activeOpacity={1}
                onPress={()=>handleNavigate(item.email)}
                style={styles.userContainer}
              >
                {
                item.profile_picture?(<Image
                  source={{ uri: item.profile_picture }}
                  style={styles.image}
                />):(<Image
                  source={require('../../../assets/images/profile_thumbnail.png')}
                  style={styles.image}
                />)
              }
                <View style={styles.columnContainer}>
                  <Text style={styles.user}>{item.username}</Text>
                  <Text style={styles.name}>
                    {item.username}
                    {item.followers.includes(currentUser.email) &&
                      " • Following"}
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleCloseUser(item.id)}>
                <Ionicons
                  name="close"
                  size={20}
                  color={"#999"}
                  style={styles.closeIcon}
                />
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <View>
            {Array(9)
              .fill(<SkeletonSearching />)
              .map((skeleton, index) => (
                <SkeletonSearching key={index} />
              ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Searching;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  divider: {
    height: 0.7,
    width: "100%",
    backgroundColor: "#252525",
    marginTop: Platform.OS === "android" ? 50 : 44,
    marginBottom: Platform.OS === "android" ? 10 : 8,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  userContainer: {
    marginHorizontal: 15,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    minWidth: "75%",
    height: 50,
  },
  image: {
    width: 46,
    height: 46,
    borderRadius: 100,
  },
  columnContainer: {
    marginLeft: 15,
    gap: 2,
  },
  user: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  name: {
    color: "#aaa",
    fontSize: 12,
    paddingBottom: 4,
  },
  closeIcon: {
    marginRight: 15,
    paddingBottom: 20,
  },
});
