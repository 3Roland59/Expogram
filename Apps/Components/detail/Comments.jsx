import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
} from "react-native";
import React from "react";
import { Image } from "react-native";

const Comments = ({
  post,
  currentUser,
  bottomSheetRef,
  bottomSheetRefComment,
  setBottomSheetIndex,
  sharedIndex,
}) => {
  const handleShowComments = () => {
    setBottomSheetIndex(sharedIndex);
    bottomSheetRef.current.snapToIndex(0);
  };

  const handleWriteComment = () => {
    setBottomSheetIndex(sharedIndex);
    if (Platform.OS === "ios") {
      bottomSheetRefComment.current.snapToIndex(0);
      // bottomSheetRef.current.snapToIndex(0);
    } else {
      bottomSheetRef.current.snapToIndex(0);
    }
  };

  return (
    <View>
        {post?.comments.length <= 0 ? (
          null
        ) :(
          <View>
            <TouchableOpacity style={styles.container} onPress={() => {
            handleShowComments();
          }}>
              <Text className="text-gray-400 font-normal">
                {
                  post.comments.length>1?`View all ${post.comments.length} comments`:'View 1 comment'
                }
              </Text>
            </TouchableOpacity>
            <Text numberOfLines={1} className="text-white font-bold mx-3 w-2/3">
            {post.comments[0]?.username.toLowerCase() + " "}
            <Text className="ml-1 font-normal">{post.comments[0].comment}</Text>
          </Text>
          </View>

        )}
        <TouchableOpacity className='mt-2' onPress={() => handleWriteComment()}>
            <View style={styles.container}>
            {
              currentUser.profile_picture?
              <Image
                source={{uri:currentUser.profile_picture}}
                style={styles.image}
              />:
              <Image
                source={require('../../../assets/images/profile_thumbnail.png')}
                style={styles.image}
              />}
              <Text className="text-[15px] text-gray-400">Add a comment...</Text>
            </View>
          </TouchableOpacity>
      </View>
  );
};

export default Comments;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 12,
    marginVertical: 2,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  text: {
    color: "#aaa",
    fontSize: 14,
    fontWeight: "400",
  },
  image: {
    width: 26,
    height: 26,
    borderRadius: 100,
  },
});
