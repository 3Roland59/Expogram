import { StyleSheet, FlatList, View, Platform } from "react-native";
import React from "react";
import useFetchPosts from "../../../Hooks/useFetchPosts";
import Skeloton from "../Shared/Skeloton";
import RenderItem from "./RenderItem";

const DefaultPosts = ({ navigation, handleScroll }) => {
  const { posts, isLoading, fetchOlderPosts, refreshPosts } = useFetchPosts();

  return (
    <View style={styles.container}>
      {posts.length > 0 ? (
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <RenderItem navigation={navigation} item={item} />
          )}
          numColumns={3}
          scrollEventThrottle={16}
          onScroll={handleScroll}
          onEndReached={() => fetchOlderPosts()}
          onEndReachedThreshold={1}
          initialNumToRender={10}
          refreshing={isLoading}
          ListFooterComponent={() => <View style={{ height: 200 }} />}
          windowSize={10}
          style={{paddingTop: 80}}
        />
      ) : (
        <FlatList
          style={{ flex: 1, paddingTop: 80}}
          data={Array.from({ length: 30 }, (_, i) => i + 1)}
          numColumns={3}
          renderItem={() => <Skeloton />}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default DefaultPosts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
  },
});
