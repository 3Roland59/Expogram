import { //pages
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  Image,
} from "react-native";
import React, { useRef } from "react";
import { useUserContext } from "../../../Context/UserContext";
import { MaterialIcons, AntDesign, Feather } from "@expo/vector-icons";
import BottomSheetFollowing from "./bottomSheets/BottomSheetFollowing";
import useHandleFollow from "../../../Hooks/useHandleFollow";
import useChatAddUser from "../../../Hooks/useChatAddUser";
import { useStoriesContext } from "../../../Context/StoriesContext";
import useCheckStoriesSeen from "../../../Hooks/useCheckStoriesSeen";
import { LinearGradient } from "expo-linear-gradient";
import { SIZES } from "../../../Utils/Constants";

const SubHeader = ({ user, navigation, numberOfPosts,setShow }) => {
  const { currentUser } = useUserContext();
  const { stories, updatedStories } = useStoriesContext();
  const { handleFollow } = useHandleFollow();
  const { chatAddUser } = useChatAddUser();
  const bottomSheetRefFollowing = useRef(null);

  const { checkStoriesSeen } = useCheckStoriesSeen();

  const handleFollowingModal = () => {
    bottomSheetRefFollowing.current.present();
  };

  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <View style={styles.userContainer}>
          {checkStoriesSeen(user.username, currentUser.email) ? (
            <TouchableOpacity>
              {
                user.profile_picture?(<Image
                  source={{ uri: user.profile_picture }}
                  style={styles.userImage}
                />):(<Image
                  source={require('../../../assets/images/profile_thumbnail.png')}
                  style={styles.userImage}
                />)
              }
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Story", {
                  stories: stories.filter(
                    (eachStory) => user.username === eachStory.username
                  ),
                  currentUser: currentUser,
                });
              }}
            >
              <LinearGradient start={[0.9, 0.45]}  end={[0.07, 1.03]}
                colors={['#07f', '#82f', '#f0f']}
                style={styles.unseenRainbowBorder}
              >
                {
                user.profile_picture?(<Image
                  source={{ uri: user.profile_picture }}
                  style={styles.userImageWithRainbow}
                />):(<Image
                  source={require('../../../assets/images/profile_thumbnail.png')}
                  style={styles.userImageWithRainbow}
                />)
              }
              </LinearGradient>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.socialContainer}>
          <TouchableOpacity style={styles.socialColumn}>
            <Text style={styles.socialBoldText}>{numberOfPosts}</Text>
            <Text style={styles.socialText}>Posts</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("UserFollow", { user: user })}
            style={styles.socialColumn}
          >
            <Text style={styles.socialBoldText}>
              {user.followers && user.followers.length > 0
                ? user.followers.length
                : 0}
            </Text>
            <Text style={styles.socialText}>Followers</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("UserFollow", { user: user })}
            style={styles.socialColumn}
          >
            <Text style={styles.socialBoldText}>
              {user.following && user.following.length > 0
                ? user.following.length
                : 0}
            </Text>
            <Text style={styles.socialText}>Following</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.usernameText}>{user.username}</Text>
      {user.bio && user.bio.length > 0 && (
        <Text style={styles.bioText}>{user.bio}</Text>
      )}
      {user.link && user.link.length > 0 && (
        <TouchableOpacity>
        <Text style={styles.usernameText}><Feather name={'link'} color={'#07f'} size={16} />  {user.link}</Text>
        </TouchableOpacity>
      )}

      <View style={styles.btnContainers}>
        {currentUser.following && currentUser.following.includes(user.email) ? (
          <TouchableOpacity
            onPress={() => handleFollowingModal()}
            style={styles.btnWrapper}
          >
            <Text style={styles.btnText}>Following</Text>
            <MaterialIcons name="keyboard-arrow-down" size={22} color="#fff" />
          </TouchableOpacity>
        ) : currentUser.followingRequest &&
          currentUser.followingRequest.includes(user.email) ? (
          <TouchableOpacity
            onPress={() => handleFollow(user.email)}
            style={styles.btnWrapper}
          >
            <Text style={styles.btnText}>Requested</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => handleFollow(user.email)}
            style={styles.btnWrapperBlue}
          >
            <Text style={styles.btnTextblue}>Follow</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          onPress={() => {
            chatAddUser(user);
            navigation.navigate("Chating", { user: user });
          }}
          style={styles.btnWrapper}
        >
          <Text style={styles.btnText}>Message</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={()=>setShow}
          style={styles.btnAddUser}
        >
          <AntDesign name="adduser" size={14} color="#fff" />
        </TouchableOpacity>
      </View>
      <BottomSheetFollowing
        bottomSheetRef={bottomSheetRefFollowing}
        currentUser={currentUser}
        user={user}
        handleFollow={handleFollow}
      />
    </View>
  );
};

export default SubHeader;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  userContainer: {
    alignItems: "flex-start",
  },
  userImage: {
    height: 93,
    width: 93,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#777",
  },
  userImageWithRainbow: {
    height: 93,
    width: 93,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: "#000",
  },
  unseenRainbowBorder: {
    height: 99,
    width: 99,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
  },
  usernameText: {
    color: "#fff",
    fontSize: 14.5,
    fontWeight: "700",
    marginTop: 10,
  },
  bioText: {
    color: "#aaa",
    fontSize: 14.5,
    fontWeight: "400",
    marginTop: 4,
  },
  socialContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 5,
    marginRight: 8,
    gap: SIZES.Width*0.09,
  },
  socialColumn: {
    minWidth: 60,
    alignItems: "center",
  },
  socialBoldText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 17,
  },
  socialText: {
    color: "#fff",
    fontWeight: "500",
    fontSize: 15,
  },
  btnContainers: {
    marginTop: 24,
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    gap: 6,
  },
  btnWrapper: {
    flexDirection: "row",
    borderRadius: 10,
    borderWidth:1,
    borderColor: '#fff',
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: Platform.OS === "android" ? 34 : 32,
  },
  btnWrapperBlue: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: Platform.OS === "android" ? 34 : 32,
  },
  btnAddUser: {
    flexDirection: "row",
    borderWidth:1,
    borderColor: '#fff',
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    height: Platform.OS === "android" ? 34 : 32,
    width: 36,
  },
  btnText: {
    marginBottom: Platform.OS === "android" ? 4 : 0,
    color: "#fff",
    fontSize: 13.5,
    fontWeight: "600",
  },
  btnTextblue: {
    marginBottom: Platform.OS === "android" ? 4 : 0,
    color: "#000",
    fontSize: 13.5,
    fontWeight: "600",
  }
});
