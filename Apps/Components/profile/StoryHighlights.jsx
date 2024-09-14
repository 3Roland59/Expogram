import { StyleSheet, Text, View, FlatList, Platform } from "react-native";
import React from "react";
import useFetchUserPosts from "../../../Hooks/useFetchUserPosts";
import SubHeader from "./SubHeader";
import { Divider } from "react-native-elements";
// import SkeletonDefaultPosts from "../search/Skeletons/SkeletonDefaultPosts";
import RenderItem from "../Shared/RenderItem";
import { SIZES } from "../../../Utils/Constants";
import Skeloton from "../Shared/Skeloton";
import PostTab from "./PostTab";

const StoryHighlights = ({ navigation, currentUser }) => {
  const { posts, loader, fetchOlderPosts, refreshPosts } = useFetchUserPosts(
    currentUser.email
  );

  return (
    <View className='flex-1'>
    <View>
    <SubHeader
      navigation={navigation}
      currentUser={currentUser}
      numberOfPosts={posts[0]?.id==="empty"?0:posts.length}
    />
    <View style={{marginVertical:10}} />
  </View>
  <PostTab />
  </View>
  );
};

export default StoryHighlights;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
});
