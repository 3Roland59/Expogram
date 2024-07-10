import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  ActivityIndicator,
  Platform,
  StatusBar,
  Image,
} from "react-native";
import React, { useState, useRef } from "react";
import { Ionicons, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import * as Progress from "react-native-progress";
import { SIZES } from "../../Utils/Constants";
import useProgressBarTimer from "../../Utils/useProgressBarTimer";
import useSeenStory from "../../Hooks/useSeenStory";
import useSharePost from "../../Hooks/useSharePost";
import useHandleLike from "../../Hooks/useHandleLike";
import useChatSendMessage from "../../Hooks/useChatSendMessage";
import BottomSheetOptions from "../Components/story/BottomSheetOptions";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  runOnJS,
  interpolateColor,
  FadeIn,
} from "react-native-reanimated";
import { GestureDetector, Gesture } from "react-native-gesture-handler";

const Story = ({ navigation, route }) => {



  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(1);
  const scale = useSharedValue(1);

  const gesture = Gesture.Pan()
    .onUpdate((value) => {
      translateX.value = value.translationX * 0.8;
      translateY.value = value.translationY * 0.8;
      const distance = Math.sqrt(
        value.translationX * value.translationX +
          value.translationY * value.translationY
      );
      const scaleValue = Math.min(Math.max(distance / 100, 1), 0.9);
      scale.value = withTiming(scaleValue, { duration: 100 });
    })
    .onEnd(() => {
      if (translateY.value > 75) {
        opacity.value = 0;
        runOnJS(navigation.goBack)();
      } else {
        translateX.value = withTiming(0, { duration: 300 });
        translateY.value = withTiming(0, { duration: 300 });
        scale.value = withTiming(1, { duration: 300 });
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
    backgroundColor: interpolateColor(
      opacity.value,
      [0, 1],
      ["transparent", "#000"]
    ),
    overflow: "hidden",
  }));



  const { stories, currentUser } = route.params || {};
  const { handleResume, handlePause, currentStoryIndex, progressBar } =
    useProgressBarTimer({ stories, navigation });
  useSeenStory({ stories, currentUser, currentStoryIndex });
  const { shareStory } = useSharePost();
  const { handleStoryLike } = useHandleLike();

  const [focusedBar, setFocusedBar] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [isLiked, setIsLiked] = useState({
    [currentStoryIndex]: !!stories[currentStoryIndex].likes_by_users.includes(
      currentUser.email
    ),
  });
  const user = {
    email: stories[currentStoryIndex].user_email,
    username: stories[currentStoryIndex].username,
    name: stories[currentStoryIndex].name,
    profile_picture: stories[currentStoryIndex].profile_picture,
  };
  const { chatSendMessage, loading, textMessage, setTextMessage } =
    useChatSendMessage({ user, currentUser });
  const bottomSheetRef = useRef(null);

  const handleToggleLike = () => {
    handleStoryLike(stories[currentStoryIndex], currentUser);
    setIsLiked({ [currentStoryIndex]: !isLiked[currentStoryIndex] });
  };

  const handleOnSubmit = async () => {
    await chatSendMessage();

    if (keyboardVisible) {
      Keyboard.dismiss();
      handleResume();
    }
  };

  const handleStoryShare = async () => {
    handlePause();
    await shareStory(stories[currentStoryIndex]);
    handleResume();
  };

  const handleOptionsSheet = () => {
    handlePause();
    bottomSheetRef.current.present();
  };

  const handleViewProfile = () => {
    handlePause();
    if (stories[currentStoryIndex].user_email === currentUser.email) {
      navigation.navigate("Profile");
    } else {
      navigation.navigate("UserDetail", {
        email: stories[currentStoryIndex].user_email,
      });
    }
  };

  const handleOnFocus = () => {
    setKeyboardVisible(true);
    setFocusedBar(true);
    handlePause();
  };

  const handleOnBlur = () => {
    setKeyboardVisible(false);
    setFocusedBar(false)
  };

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        style={[animatedStyle, styles.container]}
        className='flex-1 bg-black relative'
        entering={FadeIn.delay(300).duration(200)}
      >
      <Image
        source={{ uri: stories[currentStoryIndex].imageUrl }}
        style={styles.image}
      />
      <TouchableWithoutFeedback
        onPressIn={() => {
          handlePause();
          Keyboard.dismiss();
        }}
        onPressOut={() => handleResume()}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardAvoidingView}
        >
          <View style={styles.headerContainer}>
            <View style={styles.loadeingBarContainer}>
              <Progress.Bar
                progress={progressBar}
                width={SIZES.Width * 0.95}
                height={1}
                color="#fff"
              />
            </View>

            <View style={styles.subheaderContent}>
              <TouchableOpacity
                onPress={() => handleViewProfile()}
                style={styles.rowContainer}
              >
                <Image
                  source={{ uri: stories[0].profile_picture }}
                  style={styles.profilePicture}
                />

                <Text style={styles.usernameText}>
                  {stories[0].username === currentUser.username
                    ? "Your story"
                    : stories[0].username}
                </Text>
              </TouchableOpacity>

              <View style={styles.rowContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Ionicons
                    name="close-outline"
                    size={44}
                    color={"#fff"}
                    style={styles.closeIcon}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {stories[currentStoryIndex].user_email !== currentUser.email ? (
            <View style={styles.inputContainer}>
              <View style={styles.inputWrapper}>
                <TextInput
                  placeholder="Send message"
                  placeholderTextColor={"#fff"}
                  style={styles.textInput}
                  onFocus={() => handleOnFocus()}
                  onBlur={() => handleOnBlur()}
                  value={textMessage}
                  onChangeText={(text) => setTextMessage(text)}
                  autoCapitalize="sentences"
                  autoCorrect={true}
                  maxLength={255}
                  multiline
                />
                {focusedBar &&
                  textMessage !== "" &&
                  (loading ? (
                    <ActivityIndicator color={'#fff'} />
                  ) : (
                    <TouchableOpacity onPress={() => handleOnSubmit()}>
                      <Text style={styles.sendBtn}>Send</Text>
                    </TouchableOpacity>
                  ))}
              </View>

              {!focusedBar && (
                <View style={styles.iconContainer}>
                  <TouchableOpacity onPress={() => handleToggleLike()}>
                    {isLiked[currentStoryIndex] ? (
                      <Ionicons name="heart" size={30} color={"#f00"} />
                    ) : (
                      <Ionicons name="heart-outline" size={30} color={"#fff"} />
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleStoryShare()}>
                    <Feather
                      name="send"
                      size={27}
                      color={"#fff"}
                      style={styles.headerSendIcon}
                    />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          ) : (
            <View style={styles.currentIconContainer}>
              <TouchableOpacity
                onPress={() => handleStoryShare()}
                style={styles.verticalIconContainer}
              >
                <Feather
                  name="send"
                  size={20}
                  color={"#fff"}
                  style={styles.headerSendIcon}
                />
                <Text style={styles.currentIconText}>Send</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleOptionsSheet()}
                style={styles.verticalIconContainer}
              >
                <MaterialCommunityIcons
                  name="dots-horizontal"
                  size={20}
                  color={"#fff"}
                />
                <Text style={styles.currentIconText}>More</Text>
              </TouchableOpacity>
            </View>
          )}
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
      <BottomSheetOptions
        bottomSheetRef={bottomSheetRef}
        story={stories[currentStoryIndex]}
        handleResume={handleResume}
        navigation={navigation}
      />
      </Animated.View>
    </GestureDetector>
  );
};

export default Story;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingTop: Platform.OS=='ios'?40:0
  },
  image: {
    position: "absolute",
    top: 0,
    height:
      Platform.OS === "android" ? SIZES.Height - 100 : SIZES.Height - 100,
    width: "100%",
    borderRadius: 15,
  },
  keyboardAvoidingView: {
    flex: 1,
    justifyContent: "space-between",
  },
  headerContainer: {
    position: "relative",
    marginTop: -110,
    top: 110,
    height: 100,
    zIndex: 1,
  },
  loadeingBarContainer: {
    marginTop: 10,
    alignItems: "center",
  },
  subheaderContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: Platform.OS === "android" ? 15 : 10,
    marginHorizontal: 15,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  profilePicture: {
    height: 40,
    width: 40,
    borderRadius: 100,
  },
  usernameText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
    paddingBottom: 4,
  },
  closeIcon: {
    margin: -11,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  inputWrapper: {
    flex: 1,
    minHeight: 40,
    borderWidth: 0.5,
    borderColor: "#fff",
    borderRadius: 20,
    marginHorizontal: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 3,
    paddingBottom: 8,
    backgroundColor:'#000',
    paddingHorizontal: 15,
  },
  textInput: {
    color: "#fff",
    fontSize: 19,
    // fontWeight: "500",
    maxWidth: SIZES.Width * 0.7,
    minWidth: SIZES.Width * 0.6,
  },
  sendBtn: {
    color: "#fff",
    fontSize: 19,
    fontWeight: "800",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
    gap: 10,
  },
  headerSendIcon: {
    marginRight: 5,
    transform: [{ rotate: "20deg" }],
    marginTop: -2,
  },
  currentIconContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginHorizontal: 30,
    gap: 30,
  },
  verticalIconContainer: {
    marginBottom: 10,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
  },
  currentIconText: {
    color: "#fff",
    fontSize: 10,
    textAlign: "center",
  },
});
