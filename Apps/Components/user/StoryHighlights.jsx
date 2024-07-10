import { StyleSheet, Text, View, FlatList, Platform } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import useFetchUserPosts from "../../../Hooks/useFetchUserPosts";
import { Divider } from "react-native-elements";
import SubHeader from "./SubHeader";
import { SIZES } from "../../../Utils/Constants";
import RenderItem from "../Shared/RenderItem";
import Skeloton from "../Shared/Skeloton";
import OtherUsers from "./OtherUsers";
import { Ionicons } from "@expo/vector-icons";
import useFindUsers from "../../../Hooks/useFindUsers";
import { useUserContext } from "../../../Context/UserContext";

const StoryHightlights = ({ navigation, user }) => {
  const { posts, loader, fetchOlderPosts, refreshPosts } = useFetchUserPosts(
    user.email
  );
  const [show, setShow] = useState(false)

  const { currentUser } = useUserContext()


  const { beginSearch, users } = useFindUsers({
    currentUser
  });
  
  const toggleShow = () => {
    setShow(!show);
  };

  useEffect(()=>{
    beginSearch()
  },[currentUser])
  
  const ListHeaderComponent =useMemo( () => (
    <View>
      <SubHeader
      show={show}
        setShow={toggleShow}
        user={user}
        navigation={navigation}
        numberOfPosts={posts[0]?.id==="empty"?0:posts.length}
      />
      <OtherUsers users={users} navigation={navigation} user={user} />
      <Text style={styles.title}>Post Highlights</Text>
      <Divider width={0.5} color="#222" />
      <View style={styles.gap} />
    </View>
  ), [navigation, user, posts]);

  return (
    <View className='flex-1'>
      {user.email &&(posts.length > 0||posts.id=='empty') ? (
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            item.id === "empty" ? (<View className='flex-1 justify-center items-center bg-black h-[40vh]'>
              <View className='w-[120px] h-[120px] items-center justify-center rounded-full border-4 border-gray-400'>
              <Ionicons name="camera-outline" size={70} color={'rgb(156 163 175)'} />
            </View>
            <Text className='m-4 mt-8 text-gray-400 font-extrabold text-3xl'>No Posts Yet</Text></View>)
            :
            <RenderItem item={item} navigation={navigation} />
          
          )}
          numColumns={3}
          ListHeaderComponent={ListHeaderComponent}
          scrollEventThrottle={16}
          onEndReached={() => fetchOlderPosts()}
          onEndReachedThreshold={1}
          initialNumToRender={10}
          onRefresh={() => refreshPosts()}
          refreshing={loader}
          ListFooterComponent={() => <View style={{ height: 50 }} />}
        />
      ) : (
        <View>
          <SubHeader
            user={user}
            navigation={navigation}
            numberOfPosts={posts.length||0}
          />
          {/* <OtherUsers users={users} navigation={navigation} user={user} /> */}
          <Text style={styles.title}>Post Highlights</Text>
          <Divider width={0.5} color="#222" />
          
          <FlatList
            data={Array.from({ length: 30 }, (_, i) => i + 1)}
            renderItem={() => <Skeloton/>}
            numColumns={3}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
    </View>
  );
};

export default StoryHightlights;

const styles = StyleSheet.create({
  title: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
    marginHorizontal: 20,
    marginTop: Platform.OS === "android" ? 20 : 15,
    marginBottom: 10,
  },
  imagesContainer: {
    width: SIZES.Width * 0.335,
    height: SIZES.Width * 0.335,
    margin: -0.4,
  },
  images: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderWidth: 1,
    zIndex: -1,
  },
  fastImages: {
    width: "100%",
    height: "100%",
    borderWidth: 1,
  },
});
