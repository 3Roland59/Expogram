import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  StatusBar,
  Alert,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import Animated, { FadeIn, FadeOut, ZoomInDown } from "react-native-reanimated";
import { SIZES } from "../../Utils/Constants";
import {
  MaterialIcons,
  Ionicons,
  Feather,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useUserContext } from "../../Context/UserContext";
import useUploadStory from "../../Hooks/useUploadStory";
import useResizePictures from "../../Hooks/useResizePictures";
import { Video, ResizeMode } from "expo-av";
import MessageModal, {
  handleFeatureNotImplemented,
} from "../Components/Shared/modals/MessageModal";
import { TextInput } from "react-native";
import useUploadReel from "../../Hooks/useUploadReel";

const NewReel = ({ navigation, route }) => {
  const { selectedImage } = route.params || {};
  const { currentUser } = useUserContext();
  const {UploadReel} = useUploadReel()

  const [opacity, setOpacity] = useState(0);
  const video = useRef(null);
  const [status, setStatus] = useState({});
  const [messageModalVisible, setMessageModalVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [caption, setCaption] = useState('');

  useEffect(() => {
    setTimeout(() => {
      setOpacity(1);
    }, 400);
  }, []);

  const handleSubmitButton = async () => {
    setLoading(true)
    try {
    await UploadReel(selectedImage.uri, caption, currentUser)
    setLoading(false)
    navigation.navigate("Main Screen");
  } catch (error) {
    console.log(error)
  }finally{
    setLoading(false)
  }
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      video.current.pauseAsync();
    } else {
      video.current.playAsync();
    }
    setIsPlaying(!isPlaying);
  };


  return (
    <View style={[styles.container, { opacity: opacity }]}>
      <View style={styles.imageContainer}>
        <Animated.View
          style={styles.topButtonsContainer}
          entering={ZoomInDown.duration(550)}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButtonContainer}
          >
            <MaterialIcons
              name="arrow-back-ios"
              size={24}
              color={"#fff"}
              style={styles.buttonIcon}
            />
          </TouchableOpacity>
          <View style={styles.modButtonsContainer}>
            <TouchableOpacity
              onPress={() =>
                handleFeatureNotImplemented(setMessageModalVisible)
              }
              style={styles.modButtonContainer}
            >
              <Feather name="volume-2" size={28} color={"#fff"} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                handleFeatureNotImplemented(setMessageModalVisible)
              }
              style={styles.modButtonContainer}
            >
              <Text style={styles.modButtonText}>Aa</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                handleFeatureNotImplemented(setMessageModalVisible)
              }
              style={styles.modButtonContainer}
            >
              <MaterialCommunityIcons
                name="sticker-emoji"
                size={27}
                color={"#fff"}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                handleFeatureNotImplemented(setMessageModalVisible)
              }
              style={styles.modButtonContainer}
            >
              <MaterialCommunityIcons
                name="dots-horizontal"
                size={27}
                color={"#fff"}
              />
            </TouchableOpacity>
          </View>
        </Animated.View>

        {Platform.OS === "ios" ? (
          <Animated.Image
            source={{ uri: selectedImage.uri }}
            style={styles.image}
            sharedTransitionTag={selectedImage.id.toString()}
          />
        ) : (
          <Animated.Image
            source={{ uri: selectedImage.uri }}
            style={styles.image}
          />
        )}
        <Video
          ref={video}
          style={styles.video}
          source={{
            uri: selectedImage.uri,
          }}
          resizeMode={ResizeMode.COVER}
          isLooping
          isMuted={false}
          onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        />
        <TouchableOpacity
          onPress={handlePlayPause}
          style={styles.playButtonContainer}
        >
          {!isPlaying && (
            <Animated.View
              entering={FadeIn.duration(1000)}
              exiting={FadeOut.duration(1000)}
            >
              <Ionicons name="play" size={70} color="white" />
            </Animated.View>
          )}
        </TouchableOpacity>
      </View>
      <Animated.View
      className='absolute bottom-0 left-0 right-0 z-50'
        entering={FadeIn.duration(1000)}
      >
       <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder={`Add a caption...`}
            placeholderTextColor={"#858585"}
            style={styles.textInput}
            defaultValue={caption}
            onChangeText={(text) => setCaption(text)}
            autoCapitalize="sentences"
            autoCorrect={true}
            maxLength={255}
            multiline
          />
          {!loading ? (
            <TouchableOpacity
              onPress={() => handleSubmitButton()}
            >
              <Text style={styles.postBtn}>Post</Text>
            </TouchableOpacity>
          ) : (
            <ActivityIndicator color={'#fff'} style={styles.activityIndicator} />
          )}
        </View>
    </View>
      </Animated.View>
      <MessageModal
        messageModalVisible={messageModalVisible}
        message={"This feature is not yet implemented."}
        height={80}
      />
    </View>
  );
};

export default NewReel;

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "ios" ? 30 : 10,
    backgroundColor: "#000",
    flex: 1,
  },
  topButtonsContainer: {
    zIndex: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    position: "relative",
    marginTop: -50,
    top: 56,
    marginHorizontal: 12,
  },
  modButtonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  modButtonContainer: {
    height: 44,
    width: 44,
    borderRadius: 100,
    backgroundColor: "#00000080",
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.92,
  },
  modButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 18,
    marginBottom: 8,
    transform: [{ scaleY: 1.1 }],
  },
  image: {
    position: "absolute",
    top: -5,
    width: "100%",
    height:
      Platform.OS === "android" ? SIZES.Height -100 : SIZES.Height * 0.85,
    resizeMode: "cover",
    borderRadius: 25,
    zIndex: -1,
  },
  video: {
    width: "100%",
    height:
      Platform.OS === "android" ? SIZES.Height -100 : SIZES.Height * 0.85,
    borderRadius: 25,
  },
  backButtonContainer: {
    height: 45,
    width: 45,
    borderRadius: 100,
    zIndex: 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00000080",
    opacity: 0.99,
  },
  buttonIcon: {
    paddingLeft: 10,
  },
  nextButtonContainer: {
    backgroundColor: "#fff",
    height: 45,
    width: 45,
    borderRadius: 100,
    zIndex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  playButtonContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    height: "100%",
    zIndex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
    backgroundColor: "#000",
  },
  inputWrapper: {
    width: SIZES.Width*0.9,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#fff",
    justifyContent: "center",
    paddingLeft: 20,
    paddingRight:15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
    paddingVertical: 8,
    marginBottom: 8,
  },
  textInput: {
    fontSize: 16,
    flex: 1,
    fontWeight: "400",
    color: "#fff",
    maxWidth: "78%",
  },
  postBtn: {
    color: "#07f",
    fontSize: 18,
    fontWeight: "700",
    paddingRight: 12,
  },
  activityIndicator: {
    marginRight: 20,
  },
});
