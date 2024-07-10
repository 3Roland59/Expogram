import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Platform,
} from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import "firebase/compat/storage";
import useCheckStoriesSeen from "../../../Hooks/useCheckStoriesSeen";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "react-native";

const Header = ({
  navigation,
  post,
  currentUser,
  bottomSheetRef,
  setBottomSheetIndex,
  sharedIndex,
}) => {
  const { checkStoriesSeen } = useCheckStoriesSeen();


  const handlePostOwner = () => {
    if (currentUser.email === post.email) {
      navigation.navigate("Profile");
    } else {
      navigation.popToTop();
      navigation.navigate("UserDetail", {
        email: post.email,
      });
    }
  };

  return (
    <View>
      <View className="flex-row justify-between m-3 items-center">
        <TouchableOpacity
          onPress={() => handlePostOwner()}
          className="flex-row items-center"
        >
          {checkStoriesSeen(post.username, currentUser.email) ? (
              post.profile_picture?
              <Image
                source={{uri:post.profile_picture}}
                style={styles.headerImage}
              />:
              <Image
                source={require('../../../assets/images/profile_thumbnail.png')}
                style={styles.headerImage}
              />
          ) : (
            <LinearGradient start={[0.9, 0.45]}  end={[0.07, 1.03]}
            colors={['#07f', '#82f', '#f0f']}
              style={styles.unseenRainbowBorder}
            >
              {
              post.profile_picture?
              <Image
                source={{uri:post.profile_picture}}
                style={styles.headerImage}
              />:
              <Image
                source={require('../../../assets/images/profile_thumbnail.png')}
                style={styles.headerImage}
              />}
            </LinearGradient>
          )}
          <Text style={styles.headerText}>{post.username.toLowerCase()}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setBottomSheetIndex(sharedIndex);
            bottomSheetRef.current.expand();
          }}
        >
          <Entypo
            name="dots-three-vertical"
            size={15}
            color={"#fff"}
            style={styles.headerDots}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 6,
    marginHorizontal: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerUserContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerImage: {
    height: 37,
    width: 37,
    resizeMode: "cover",
    borderWidth: 2,
    borderRadius: 100,
  },
  unseenRainbowBorder: {
    height: 41,
    width: 41,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 15,
    marginLeft: 9,
    marginBottom: 4,
  },
  headerDots: {
    marginRight: 6,
  },
});
