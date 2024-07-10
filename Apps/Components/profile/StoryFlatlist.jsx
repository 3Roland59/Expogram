import { StyleSheet, Text, View, FlatList, Platform } from "react-native";
import React from "react";
import useFetchUserPosts from "../../../Hooks/useFetchUserPosts";
import RenderItem from "../Shared/RenderItem";
import { SIZES } from "../../../Utils/Constants";
import Skeloton from "../Shared/Skeloton";
import { useUserContext } from "../../../Context/UserContext";
import { Ionicons } from "@expo/vector-icons";

export default function StoryFlatlist({navigation}) {
    const {currentUser} = useUserContext()
    const { posts, loader, fetchOlderPosts, refreshPosts } = useFetchUserPosts(
        currentUser.email
      );

      console.log('Post for profile:' ,posts)


  return (
    <View style={styles.container}>
      {currentUser.email &&(posts.length > 0||posts.id=='empty')  ? (
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            item.id === "empty" ? (<View className='bg-black flex-1 items-center justify-center h-[40vh]'>
              <View className='w-[120px] h-[120px] items-center justify-center rounded-full border-4 border-gray-400'>
                <Ionicons name="camera-outline" size={70} color={'rgb(156 163 175)'} />
              </View>
            <Text className='m-4 text-gray-400 font-extrabold text-3xl'>No Posts Yet</Text>
          </View>)
            :
            <RenderItem navigation={navigation} item={item} />
          )}
          numColumns={3}
          scrollEventThrottle={16}
          onEndReached={() => fetchOlderPosts}
          onEndReachedThreshold={1}
          initialNumToRender={10}
          onRefresh={() => refreshPosts()}
          refreshing={loader}
          ListFooterComponent={() => <View style={{ height: 50 }} />}
        />
      ) : (
        <FlatList
          style={{ flex: 1}}
          data={Array.from({ length: 30 }, (_, i) => i + 1)}
          numColumns={3}
          renderItem={() => <Skeloton />}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#000",
    },
    title: {
      color: "#fff",
      fontSize: 13,
      fontWeight: Platform.OS === "android" ? "600" : "700",
      marginHorizontal: 20,
      marginTop: Platform.OS === "android" ? 22 : 15,
      marginBottom: Platform.OS === "android" ? 12 : 8,
    },
  });
