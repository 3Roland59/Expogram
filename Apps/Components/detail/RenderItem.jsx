import { StyleSheet, View, Platform } from "react-native";
import React from "react";
import Header from "./Header";
import PostImage from "./PostImage";
import Footer from "./Footer";
import {Likes} from "../Home/Post";
import {Caption }from "../Home/Post";
import {Date} from "../Home/Post";
import Comments from "./Comments";
import { SIZES } from "../../../Utils/Constants";
import Animated from "react-native-reanimated";

const RenderItem = ({
  navigation,
  post,
  currentUser,
  bottomSheetRefComments,
  bottomSheetRefComment,
  bottomSheetRefOptions,
  setBottomSheetIndex,
  sharedIndex,
  setLayoutHeight,
}) => {
  const findHeight = (layout) => {
    let { x, y, width, height } = layout;
    setLayoutHeight(height);
  };

  return (
    <View
      style={styles.container}
      onLayout={(event) => {
        findHeight(event.nativeEvent.layout);
      }}
    >
      <Header
        navigation={navigation}
        post={post}
        currentUser={currentUser}
        bottomSheetRef={bottomSheetRefOptions}
        setBottomSheetIndex={setBottomSheetIndex}
        sharedIndex={sharedIndex}
      />
      {Platform.OS === "ios" && sharedIndex === 0 && (
        <Animated.Image
          source={{ uri: post.imageUrl[0] }}
          style={styles.imageContainer}
          sharedTransitionTag={post.id.toString()}
        />
      )}
      <PostImage post={post} currentUser={currentUser} />
      <Footer
        post={post}
        currentUser={currentUser}
        bottomSheetRef={bottomSheetRefComments}
        setBottomSheetIndex={setBottomSheetIndex}
        sharedIndex={sharedIndex}
      />

      <Likes post={post} navigation={navigation} />

      <Caption post={post} />
      <Comments
        post={post}
        currentUser={currentUser}
        bottomSheetRef={bottomSheetRefComments}
        bottomSheetRefComment={bottomSheetRefComment}
        setBottomSheetIndex={setBottomSheetIndex}
        sharedIndex={sharedIndex}
      />
      <Date post={post} />
      <View style={{ height: 60 }}></View>
    </View>
  );
};

export default RenderItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 600,
  },
  imageContainer: {
    top: 60,
    position: "absolute",
    minHeight: SIZES.Width,
    minWidth: SIZES.Width,
    zIndex: -1,
  },
  fastImage: {
    marginVertical: 12,
    height: SIZES.Width,
    width: SIZES.Width,
  },
});
