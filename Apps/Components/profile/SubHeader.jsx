import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useStoriesContext } from "../../../Context/StoriesContext";
import useCheckStoriesSeen from "../../../Hooks/useCheckStoriesSeen";
import { LinearGradient } from "expo-linear-gradient";
import { Entypo, Feather } from "@expo/vector-icons";
import { SIZES } from "../../../Utils/Constants"

const SubHeader = ({ navigation, currentUser, numberOfPosts }) => {
  const { stories, updatedStories } = useStoriesContext();
  const { checkStoriesSeen } = useCheckStoriesSeen();
  const [ownStory, setOwnStory] = useState(false);
  const [seenOwnStory, setSeenOwnStory] = useState(false);

  useEffect(() => {
    setOwnStory(
      stories.find((story) => {
        return story.username === currentUser.username;
      })
    );

    setSeenOwnStory(checkStoriesSeen(currentUser.username, currentUser.email));
  }, [updatedStories])

  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <View style={styles.userContainer}>
          <TouchableOpacity
            onPress={() =>
              ownStory
                ? navigation.navigate("Story", {
                    stories: stories.filter(
                      (story) => story.username === currentUser.username
                    ),
                    currentUser: currentUser,
                  })
                : navigation.navigate("MediaLibrary", {
                    initialSelectedType: "Add to story",
                    selectorAvailable: false,
                  })
            }
          >
            {!ownStory ? (
              <View>
                {
                currentUser.profile_picture?(<Image
                  source={{ uri: currentUser.profile_picture }}
                  style={styles.userImageWithoutStory}
                />):(<Image
                  source={require('../../../assets/images/profile_thumbnail.png')}
                  style={styles.userImageWithoutStory}
                />)
              }
                <View style={styles.plusBadgeContainer}>
                  <Entypo name="plus" size={18} color="#000" />
                </View>
              </View>
            ) : seenOwnStory ? (
              <View>
                <View style={styles.seenStoryBorder}>
                  {
                currentUser.profile_picture?(<Image
                  source={{ uri: currentUser.profile_picture }}
                  style={styles.userImage}
                />):(<Image
                  source={require('../../../assets/images/profile_thumbnail.png')}
                  style={styles.userImage}
                />)
              }
                </View>
              </View>
            ) : (
              <View>
                <LinearGradient start={[0.9, 0.45]}  end={[0.07, 1.03]}
                  colors={['#07f', '#82f', '#f0f']}
                  style={styles.unseenRainbowBorder}
                >
                 {
                currentUser.profile_picture?(<Image
                  source={{ uri: currentUser.profile_picture }}
                  style={styles.userImage}
                />):(<Image
                  source={require('../../../assets/images/profile_thumbnail.png')}
                  style={styles.userImage}
                />)
              }
                </LinearGradient>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.socialContainer}>
          <TouchableOpacity style={styles.socialColumn}>
            <Text style={styles.socialBoldText}>{numberOfPosts}</Text>
            <Text style={styles.socialText}>Posts</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Follow", { currentUser: currentUser })
            }
            style={styles.socialColumn}
          >
            <Text style={styles.socialBoldText}>
              {currentUser.followers.length > 0
                ? currentUser.followers.length
                : 0}
            </Text>
            <Text style={styles.socialText}>Followers</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Follow", { currentUser: currentUser })
            }
            style={styles.socialColumn}
          >
            <Text style={styles.socialBoldText}>
              {currentUser.following.length > 0
                ? currentUser.following.length
                : 0}
            </Text>
            <Text style={styles.socialText}>Following</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.usernameText}>{currentUser.username}</Text>
      {currentUser.bio && currentUser.bio.length > 0 &&<Text style={styles.bioText}>{currentUser.bio}</Text>}
      {currentUser.link&&currentUser.link.length > 0 &&<TouchableOpacity><Text style={styles.usernameText}><Feather name={'link'} color={'#07f'} size={16} /> {currentUser.link}</Text></TouchableOpacity>}
      <View style={styles.btnContainers}>
        <TouchableOpacity
          onPress={() => navigation.navigate("EditProfile")}
          style={styles.btnWrapper}
        >
          <Text style={styles.btnText}>Edit profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("ShareQR", { user: currentUser })}
          style={styles.btnWrapper}
        >
          <Text style={styles.btnText}>Share profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Chat")}
          style={styles.btnWrapper2}
        >
          <Feather name="user-plus" size={16} color={'#fff'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SubHeader;

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === "android" ? 15 : 8,
    marginHorizontal: 12,
    marginBottom: 5,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  userContainer: {
    alignItems: "flex-start",
    marginLeft: 6,
  },
  userImageWithoutStory: {
    height: 89,
    width: 89,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#444",
  },
  plusBadgeContainer: {
    position: "absolute",
    backgroundColor: "#fff",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#000",
    borderWidth: 3.5,
    right: -3,
    bottom: -3,
    height: 29,
    width: 29,
  },
  userImage: {
    height: 86,
    width: 86,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: "#000",
  },
  seenStoryBorder: {
    height: 91.5,
    width: 91.5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    borderWidth: 1.5,
    borderColor: "#666",
  },
  unseenRainbowBorder: {
    height: Platform.OS === "android" ? 91.5 : 91,
    width: Platform.OS === "android" ? 91.5 : 91,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
  },
  usernameText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    marginHorizontal: 6,
    marginTop: 10,
  },
  bioText: {
    color: "#aaa",
    fontSize: 14,
    fontWeight: "400",
    marginHorizontal: 6,
    marginTop: 4,
  },
  socialContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 5,
    marginRight: 8,
    gap: SIZES.Width*0.1,
  },
  socialColumn: {
    minWidth: 60,
    alignItems: "center",
  },
  socialBoldText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 24,
  },
  socialText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 13,
  },
  btnContainers: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    marginTop: 16,
    gap: 6,
  },
  btnWrapper: {
    backgroundColor: "#000",
    borderRadius: 10,
    flex: 1,
    borderWidth:1,
    borderColor: '#fff',
    alignItems: "center",
    justifyContent: "center",
    height: Platform.OS === "android" ? 34 : 32,
  },
  btnWrapper2: {
    backgroundColor: "#000",
    borderRadius: 10,
    flex: 0.2,
    borderWidth:1,
    borderColor: '#fff',
    alignItems: "center",
    justifyContent: "center",
    height: Platform.OS === "android" ? 34 : 32,
  },
  btnText: {
    color: "#fff",
    fontSize: 13.5,
    fontWeight: "600",
  },
});
