import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Platform,
  StatusBar,
} from "react-native";
import React from "react";
import { MaterialIcons, AntDesign, FontAwesome } from "@expo/vector-icons";
import { useUserContext } from "../../Context/UserContext";
import useFilterPosts from "../../Hooks/useFilterPosts";
import Post from "../Components/Home/Post";
import PostsSkeleton from "../Components/Home/PostsSkeleton";
import { LinearGradient } from "expo-linear-gradient";

const SavedPosts = ({ navigation }) => {
  const { currentUser } = useUserContext();
  const { filteredPosts, isLoading, fetchOlderPosts, refreshPosts } =
    useFilterPosts("created_at",currentUser.saved_posts);

  const renderPostItem = ({ item }) => {
    return (
      <View key={item.id}>
        <Post navigation={navigation} post={item} currentUser={currentUser} />
      </View>
    );
  };

  const ListFooterComponent = () => {
    return (
      <View style={styles.footerContainer}>
        <LinearGradient start={[0.9, 0.45]}  end={[0.07, 1.03]}
          colors={['#07f', '#82f', '#f0f']}
          style={styles.rainbowBorder}
        >
          <AntDesign name="checkcircle" size={56} color={"#000"} />
        </LinearGradient>
        <Text style={styles.title}>End of saved posts</Text>
        <Text style={styles.text}>
          There are no more saved posts.
        </Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.button}>Back to home</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.titleContainer}
        onPress={() => navigation.goBack()}
      >
        <MaterialIcons name="arrow-back-ios" size={28} color={"#fff"} />
        <Text style={styles.textTitle}>Saved Posts</Text>
      </TouchableOpacity>
      <View style={styles.divider} />

      {filteredPosts[0]?.id === "empty" ? (
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIcon}>
            <FontAwesome name="star-o" size={64} color={"#fff"} />
          </View>
          <Text style={styles.emptyTitle}>
            Save posts you want to see later
          </Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.emptyButton}>Back to home</Text>
          </TouchableOpacity>
        </View>
      ) : filteredPosts.length > 0 ? (
        <FlatList
          data={filteredPosts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderPostItem}
          scrollEventThrottle={16}
          onEndReached={() => fetchOlderPosts()}
          onEndReachedThreshold={1}
          initialNumToRender={10}
          onRefresh={() => refreshPosts()}
          refreshing={isLoading}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={ListFooterComponent}
          windowSize={10}
        />
      ) : (
        <View >
          <FlatList
            data={["", "", "", "", ""]}
            renderItem={() => <PostsSkeleton />}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default SavedPosts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginHorizontal: 20,
    marginTop: Platform.OS === "android" ? 9 : 0,
    marginBottom: Platform.OS === "android" ? 14 : 10,
  },
  textTitle: {
    marginTop: 5,
    color: "#fff",
    fontSize: 24,
    fontWeight: "700",
  },
  divider: {
    height: 0.5,
    width: "100%",
    backgroundColor: "#333",
  },
  footerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 60,
    gap: 10,
  },
  rainbowBorder: {
    padding: 3,
    height: 63.5,
    width: 63.5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },
  text: {
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
  },
  button: {
    color: "#09f",
    fontSize: 16,
    fontWeight: "700",
  },
  emptyContainer: {
    height: "75%",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 24,
    marginTop: 20,
    marginBottom: 60,
    gap: 15,
  },
  emptyIcon: {
    borderWidth: 4,
    borderColor: "#fff",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    height: 94,
    width: 94,
  },
  emptyTitle: {
    textAlign: "center",
    color: "#fff",
    fontSize: 28,
    fontWeight: "700",
  },
  emptyText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
  },
  emptyButton: {
    color: "#09f",
    fontSize: 16,
    fontWeight: "700",
  },
});
