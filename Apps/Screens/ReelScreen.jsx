import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  FlatList,
  TouchableWithoutFeedback,
  Platform,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import React, { useState, useRef } from "react";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { Video } from "expo-av";
import { SIZES } from "../../Utils/Constants";
import {
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
  Feather,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useUserContext } from "../../Context/UserContext";
import { useIsFocused } from "@react-navigation/native";
import * as Progress from "react-native-progress";
import useFetchReels from "../../Hooks/useFetchReels";
import usePlayReels from "../../Hooks/usePlayReels";
import firebase from "firebase/compat";
import Skeleton from "../Components/reels/Skeleton";
import MessageModal, {
  handleFeatureNotImplemented,
} from "../Components/Shared/modals/MessageModal";
import { Image } from "react-native";
import useHandleFollow from "../../Hooks/useHandleFollow";
import useDownloadReel from "../../Hooks/useDownloadMedia";

const ReelScreen = ({ navigation }) => {
  const videoRefs = useRef([]);
  const flatListRef = useRef(null);
  const focusedScreen = useIsFocused();
  const [messageModalVisible, setMessageModalVisible] = useState(false);
  const { handleFollow } = useHandleFollow();
  const { downloadReel, downloading } = useDownloadReel();

  const { currentUser } = useUserContext();
  const { videos } = useFetchReels();
  const {
    playingVideo,
    setCurrentIndex,
    progressBarValue,
    muteButtonVisible,
    isMuted,
    handleLongPress,
    handlePressOut,
    handlePress,
  } = usePlayReels({ videoRefs, focusedScreen });

  const handleLike = (item) => {
    firebase
      .firestore()
      .collection("users")
      .doc(item.email)
      .collection("reels")
      .doc(item.id)
      .update({
        likes_by_users: item.likes_by_users.includes(currentUser.email)
          ? firebase.firestore.FieldValue.arrayRemove(currentUser.email)
          : firebase.firestore.FieldValue.arrayUnion(currentUser.email),
      });
  };

  const renderItem = ({ item, index }) => {
    const handleUserProfile = () => {
      if (currentUser.email === item.email) {
        navigation.navigate("Profile");
      } else {
        navigation.navigate("UserDetail", {
          email: item.email,
        });
      }
    };

    return (
      <View>
        <TouchableWithoutFeedback
          delayLongPress={200}
          onLongPress={handleLongPress}
          onPressOut={handlePressOut}
          onPress={handlePress}
        >
          <View>
            <Video
              ref={(ref) => (videoRefs.current[index] = ref)}
              style={styles.video}
              source={{
                uri: item.videoUrl,
              }}
              resizeMode="cover"
              onLoad={() => {
                if (index === 0) {
                  setCurrentIndex(0);
                  videoRefs.current[index].playAsync();
                }
              }}
              isLooping
            />
          </View>
        </TouchableWithoutFeedback>

        <View style={styles.sideContainer}>
          <TouchableOpacity
            onPress={() => handleLike(item)}
            style={styles.touchableOpacity}
          >
            {item.likes_by_users.includes(currentUser.email) ? (
              <MaterialCommunityIcons
                name="cards-heart"
                size={30}
                color="#f00"
                style={styles.heartIcon}
              />
            ) : (
              <MaterialCommunityIcons
                name="cards-heart-outline"
                size={30}
                color="#fff"
                style={styles.heartIcon}
              />
            )}
            <Text style={styles.sideText}>{item.likes_by_users.length}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleFeatureNotImplemented(setMessageModalVisible)}
            style={styles.touchableOpacity}
          >
            <Ionicons
            name="chatbubble-outline"
            size={30}
            color={"#fff"}
            style={styles.chatIcon}
          />
            <Text style={styles.sideText}>{item.comments.length}</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            onPress={() => handleFeatureNotImplemented(setMessageModalVisible)}
            style={styles.touchableOpacity}
          >
            <Feather
              name="send"
              size={26}
              color="#fff"
              style={styles.sendIcon}
            />
          </TouchableOpacity> */}
          <TouchableOpacity className='mb-6'
            onPress={
              () => downloadReel(item.videoUrl, item.username)
              // () => handleFeatureNotImplemented(setMessageModalVisible)
            }
            style={styles.touchableOpacity}
          >
            {!downloading ? <Feather name="download" size={26} color="#fff" /> : <ActivityIndicator color={'#fff'} size={'large'} />}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleFeatureNotImplemented(setMessageModalVisible)}
            style={styles.touchableOpacity}
          >
            <MaterialCommunityIcons
              name="music-box-outline"
              size={30}
              color="#fff"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.userContainer}>
          <View style={styles.rowContainer}>
            <TouchableOpacity
              onPress={handleUserProfile}
              style={styles.profileContainer}
            >
              <LinearGradient start={[0.9, 0.45]}  end={[0.07, 1.03]}
                colors={['#07f', '#82f', '#f0f']}
                style={styles.rainbowBorder}
              >
                {item.profile_picture?(<Image
                  source={{
                    uri: item.profile_picture,
                  }}
                  style={styles.profilePicture}
                />):(<Image
                  source={require('../../assets/images/profile_thumbnail.png')}
                  style={styles.profilePicture}
                />)}
              </LinearGradient>
              <Text style={styles.profileUsername}>{item.username}</Text>
              <MaterialCommunityIcons
                name="check-decagram"
                size={12}
                color="#fff"
              />
            </TouchableOpacity>
            {currentUser.email !== item.email &&
          currentUser.following &&
          !currentUser.following.includes(item.email) ? (
            <TouchableOpacity
              onPress={() => {
                handleFollow(item.email);
              }}
              style={styles.touchableOpacity}
            >
              <View style={styles.followContainer}>
              {currentUser.followingRequest &&
              !currentUser.followingRequest.includes(item.email) ? (
                <Text style={styles.followText}>Follow</Text>
              ) : (
                <Text style={styles.followText}>Requested</Text>
              )}
              </View>
            </TouchableOpacity>
          ) : (<TouchableOpacity
            style={styles.touchableOpacity}
          >
            <View style={styles.followContainer}>
              <Text style={styles.followText}>Following</Text>
            </View>
          </TouchableOpacity>)}
          </View>
          <Text style={styles.captionText}>{item.caption}</Text>
          <View className='bg-[#222] flex flex-row px-3 py-1 rounded-full mt-1 items-center'><MaterialCommunityIcons name="music-circle-outline" size={28} color={'#fff'} /><Text className='text-white'>   Original - <Text className='text-white font-bold'>{currentUser.username}</Text></Text></View>
        </View>
        <View>
          <Progress.Bar
            progress={progressBarValue}
            width={SIZES.Width}
            height={1.2}
            useNativeDriver={true}
            color="#fff"
            style={styles.progressBar}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#000', 'transparent']} style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => handleFeatureNotImplemented(setMessageModalVisible)}
          style={styles.titleContainer}
        >
          <Text style={styles.titleText}>Reels</Text>
          <MaterialIcons
            name="keyboard-arrow-down"
            size={22}
            color="#fff"
            style={{ marginTop: 6 }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("MediaLibrary", {
              initialSelectedType: "New reel",
            });
          }}
        >
          <Ionicons
            name="camera-outline"
            size={32}
            color="#fff"
            style={{ marginTop: 6 }}
          />
        </TouchableOpacity>
      </LinearGradient>

      {muteButtonVisible && (
        <Animated.View
          style={styles.muteContainer}
          entering={FadeIn}
          exiting={FadeOut}
        >
          <Ionicons
            name={isMuted ? "volume-mute" : "volume-high"}
            size={24}
            color="#fff"
          />
        </Animated.View>
      )}

      {videos.length > 0 ? (
        <FlatList
          ref={flatListRef}
          data={videos}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          initialNumToRender={3}
          maxToRenderPerBatch={3}
          windowSize={5}
          pagingEnabled={true}
          onMomentumScrollEnd={(event) => {
            const newIndex = Math.round(
              event.nativeEvent.contentOffset.y /
                event.nativeEvent.layoutMeasurement.height
            );

            if (videoRefs.current[newIndex - 1]) {
              videoRefs.current[newIndex - 1].pauseAsync();
            }
            if (videoRefs.current[newIndex + 1]) {
              videoRefs.current[newIndex + 1].pauseAsync();
            }
            if (playingVideo) {
              if (videoRefs.current[newIndex]) {
                videoRefs.current[newIndex].playAsync();
                setCurrentIndex(newIndex);
              }
            }
          }}
        />
      ) : (
        <View style={{ flex: 1, marginTop: 0 }}>
          <Skeleton />
        </View>
      )}
      <MessageModal
        messageModalVisible={messageModalVisible}
        message={"This feature is not yet implemented."}
        height={20}
      />
    </View>
  );
};

export default ReelScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    width: SIZES.Width,
    height:  Platform.OS === "ios" ? SIZES.Height: SIZES.Height * 0.987,
  },
  video: {
    width: SIZES.Width,
    height:  Platform.OS === "ios" ? SIZES.Height: SIZES.Height * 0.987,
  },
  muteContainer: {
    position: "absolute",
    top: SIZES.Height * 0.42,
    left: SIZES.Width * 0.42,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#666",
    borderRadius: 100,
    padding: 20,
    zIndex: 3,
  },
  headerContainer: {
    position: "absolute",
    top: Platform.OS === "ios" ? 30 : 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "ios" ? 15 : 10,
    zIndex: 1,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  titleText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 23,
  },
  sideContainer: {
    position: "absolute",
    bottom: 50,
    right: 0,
    marginBottom: 15,
    marginRight: 15,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 26,
  },
  touchableOpacity: {
    alignItems: "center",
    gap: 3,
  },
  sideText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 12,
    marginBottom: 26,
  },
  heartIcon: {
    transform: [{ scaleY: 1.1 }, { scaleX: 1.1 }],
  },
  chatIcon: {
    transform: [{ scaleX: -1 },],
  },
  sendIcon: {
    transform: [{ rotate: "20deg" }, { scaleY: 1.05 }, { scaleX: 0.95 }],
  },
  userContainer: {
    position: "absolute",
    bottom: 70,
    left: 0,
    marginBottom: 15,
    marginLeft: 15,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  rainbowBorder: {
    height: 42,
    width: 42,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  profilePicture: {
    height: 39,
    width: 39,
    borderWidth: 2,
    borderColor: "#666",
    borderRadius: 100,
  },
  profileUsername: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
    marginLeft: 3,
    marginBottom: 4,
  },
  followContainer: {
    borderWidth: 0.7,
    borderColor: "#bbb",
    backgroundColor: "transparent",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    marginLeft: 20,
  },
  followText: {
    color: "#fff",
    fontWeight: "700",
    fontSize:12
  },
  captionText: {
    color: "#fff",
    fontWeight: "400",
    fontSize: 14,
    marginTop: 4,
    maxWidth: SIZES.Width * 0.8,
    marginBottom: 14,
  },
  progressBar: {
    position: "absolute",
    bottom: 0,
    zIndex: 1,
    marginBottom: SIZES.Height * 0.006,
  },
});
