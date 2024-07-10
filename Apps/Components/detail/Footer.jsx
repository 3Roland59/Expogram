import { StyleSheet, View, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons, Feather, Ionicons } from "@expo/vector-icons";
import React from "react";
import useSharePost from "../../../Hooks/useSharePost";
import useSavePost from "../../../Hooks/useSavePost";
import useHandleLike from "../../../Hooks/useHandleLike";

const Footer = ({
  post,
  currentUser,
  bottomSheetRef,
  setBottomSheetIndex,
  sharedIndex,
}) => {
  const { handlePostLike } = useHandleLike();
  const { sharePost } = useSharePost();
  const { savePost } = useSavePost();

  const handleCommentsSection = () => {
    setBottomSheetIndex(sharedIndex);
    bottomSheetRef.current.snapToIndex(0);
  };

  const handleSharePost = () => {
    sharePost(post);
  };

  const handleSavePost = () => {
    savePost(post, currentUser);
  };

  return (
    <View className="flex-row justify-between items-center m-3">
      <View className="flex-row justify-between items-center gap-4">
        <TouchableOpacity onPress={() => handlePostLike(post, currentUser)}>
          {post.likes_by_users.includes(currentUser.email) ? (
            <MaterialCommunityIcons
              name="cards-heart"
              size={27}
              color={"#f33"}
              style={styles.heartIcon}
            />
          ) : (
            <MaterialCommunityIcons
              name="cards-heart-outline"
              size={27}
              color={"#fff"}
              style={styles.heartIcon}
            />
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleCommentsSection()}>
        <Ionicons
            name="chatbubble-outline"
            size={27}
            color={"#fff"}
            style={styles.chatIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleSharePost()}>
          <Feather
            name="send"
            size={24}
            color={"#fff"}
            style={styles.sendIcon}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => handleSavePost()}>
        {currentUser.saved_posts && currentUser.saved_posts.includes(post.id) ? (
          <Ionicons
            name="bookmark"
            size={24}
            color={"#fff"}
            style={styles.bookmarkIcon}
          />
        ) : (
          <Feather
            name="bookmark"
            size={24}
            color={"#fff"}
            style={styles.bookmarkIcon}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  footerIconsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 12,
  },
  footerIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 13,
  },
  heartIcon: {
    transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }],
  },
  sendIcon: {
    transform: [{ rotate: "20deg" }, { scaleX: 0.95 }, { scaleY: 1.05 }],
    marginTop: -2,
  },
  chatIcon: {
    transform: [{ scaleX: -1 }],
  },
  bookmarkIcon: {
    transform: [{ scaleX: 1.15 }, { scaleY: 1.1 }],
  },
  headerIcons: {
    marginRight: 15,
  },
});
