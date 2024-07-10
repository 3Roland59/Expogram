import { Image, StyleSheet, View } from "react-native";
import React, { useRef, useState } from "react";
import Animated from "react-native-reanimated";
import { SIZES } from "../../../Utils/Constants";
import { GestureDetector } from "react-native-gesture-handler";
import useLikeAnimation from "../../../Utils/useLikeAnimation";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView } from "react-native";
import { Text } from "react-native";

const PostImage = ({ post, currentUser }) => {
  const { handleDoubleTap, animatedStyles } = useLikeAnimation(
    post,
    currentUser
  );

  const [activeSlide, setActiveSlide] = useState(0);
  const scrollViewRef = useRef(null);
  const onScroll = (event) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / SIZES.Width);
    setActiveSlide(index);
  };

  return (
    <View>
    {
      post.imageUrl.length>1
      &&
      (<View className='absolute top-3 right-3 z-50 p-2 px-3 bg-[#00000090] rounded-2xl'>
      <Text className='text-white text-[12px]'>{activeSlide+1} / {post.imageUrl.length}</Text>
      </View>)
    }
  <GestureDetector gesture={handleDoubleTap}>
  <ScrollView
    ref={scrollViewRef}
    horizontal
    pagingEnabled
    showsHorizontalScrollIndicator={false}
    onScroll={onScroll}
    scrollEventThrottle={16}
  >
    {post.imageUrl.map((image, index) => (
        <View style={styles.imageContainer} key={index}>
          <Image source={{ uri: image }} style={styles.postImage} />
          <Animated.View style={[styles.likeContainer, animatedStyles]}>
            <Ionicons name="heart" size={110} color="#f33" />
          </Animated.View>
        </View>
    ))}
  </ScrollView>
  </GestureDetector>
  {
      post.imageUrl.length>1
      &&
 ( <View style={styles.paginationContainer}>
    {post.imageUrl.map((_, index) => (
      <View
        key={index}
        style={[
          styles.dot,
          { backgroundColor: index === activeSlide ? '#fff' : 'rgba(255, 255, 255, 0.5)' },
        ]}
      />
    ))}
  </View>)}
</View>
  );
};

export default PostImage;

const styles = StyleSheet.create({
  imageContainer: {
    height: SIZES.Width * 1.1,
    width: SIZES.Width,
  },
  paginationContainer: {
    position: 'absolute',
    bottom: -30,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex:50
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 5,
    marginHorizontal: 4,
  },
  postImage: {
    height: SIZES.Width * 1.1,
    width: SIZES.Width,
    resizeMode: "cover",
  },
  likeContainer: {
    position: "absolute",
    top: SIZES.Width * 0.35,
    left: SIZES.Width * 0.35,
    opacity: 0,
  },
});
