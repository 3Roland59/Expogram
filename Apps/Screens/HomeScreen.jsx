import {
  StyleSheet,
  SafeAreaView,
  Animated,
  FlatList,
  View,
  Platform,
  StatusBar,
  RefreshControl,
  ScrollView
} from "react-native";
import React, { useCallback, useState, useMemo } from "react";
import { useUserContext } from "../../Context/UserContext";
import useHeaderScrollAnim from "../../Utils/useHeaderScrollAnim";
import useFetchPosts from "../../Hooks/useFetchPosts";
import Header from "../Components/Home/Header";
import Stories from "../Components/Home/Stories";
import Posts from "../Components/Home/Post";
import PostsSkeleton from "../Components/Home/PostsSkeleton";
import { useCurrentUser } from "../../Hooks/useCurrentUser";

const Home = ({ navigation }) => {
  const { currentUser } = useUserContext();
  const { refetch } = useCurrentUser();
  const { headerTranslate, headerOpacity, scrollY } = useHeaderScrollAnim(42);
  const { posts, isLoading, fetchOlderPosts, refreshPosts } = useFetchPosts();

  const renderPostItem = useCallback(
    ({ item }) => (
      <Posts navigation={navigation} post={item} currentUser={currentUser} />
    ),
    [navigation, currentUser]
  );

  const renderHeaderComponent = useMemo(
    () => <Stories navigation={navigation} currentUser={currentUser} />,
    [navigation, currentUser]
  );

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch();
    refreshPosts();
    setRefreshing(false);
  }, [refetch, refreshPosts]);

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <StatusBar backgroundColor={"#000"} barStyle={"light-content"} />
      <Header
        navigation={navigation}
        headerOpacity={headerOpacity}
        currentUser={currentUser}
      />

      {posts.length > 0 ? (
        <FlatList
          data={posts}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderPostItem}
          ListHeaderComponent={renderHeaderComponent}
          contentContainerStyle={styles.contentContainer(10)}
          onEndReached={() => fetchOlderPosts()}
          onEndReachedThreshold={0.5}
          initialNumToRender={20}
          onRefresh={() => refreshPosts()}
          refreshing={isLoading}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={() => <View style={{ height: 100 }} />}
        />
      ) : (
        <View>
          <FlatList
            data={["", "", "", "", "", ""]}
            ListHeaderComponent={renderHeaderComponent}
            renderItem={() => <PostsSkeleton />}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    flex: 1,
    paddingTop: Platform.OS == "ios" ? 40 : 0,
  },
  contentContainer: (ContainerHeight) => ({
    paddingTop: ContainerHeight,
  }),
});
