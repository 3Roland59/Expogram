import { StyleSheet, Platform, View, StatusBar } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import React, { useState, useEffect, useRef } from "react";
import TitleBar from "../Components/Shared/TitleBar";
import { useUserContext } from "../../Context/UserContext";
import BottomSheetOptions from "../Components/detail/bottomSheets/BottomSheetOptions";
import BottomSheetComments from "../Components/detail/bottomSheets/BottomSheetComments";
import BottomSheetComment from "../Components/detail/bottomSheets/BottomSheetComment";
import useFetchUserPosts from "../../Hooks/useFetchUserPosts";
import RenderItem from "../Components/detail/RenderItem";
import PostsSkeleton from "../Components/Home/PostsSkeleton";
import { Divider } from "react-native-elements";

const Detail = ({ navigation, route }) => {
  const { item } = route.params || {};
  const { currentUser } = useUserContext();
  const { timeToReplaceData, onSnapshotData } = useFetchUserPosts(
    item.email
  );

  const [bottomSheetIndex, setBottomSheetIndex] = useState(0);
  const [layoutHeight, setLayoutHeight] = useState(0);
  const bottomSheetRefOptions = useRef(null);
  const bottomSheetRefComments = useRef(null);
  const bottomSheetRefComment = useRef(null);

  const [posts, setPosts] = useState([item]);

  useEffect(() => {
    if (timeToReplaceData > 0) {
      const moveItemToStart = (arr) => {
        const index = arr.findIndex((post) => item.id === post.id);
        if (index !== -1 || index !== 0) {
          const itemToMove = arr.splice(index, 1)[0];
          arr.unshift(itemToMove);
          setPosts(arr);
        } else {
          setPosts(arr);
        }
      };
      moveItemToStart(onSnapshotData);
    }
  }, [timeToReplaceData]);


  return (
    <View style={styles.container}>
        <TitleBar navigation={navigation} name="Detail" activity={false} />
        <Divider width={0.5} color={"#222"} />
        {posts.length > 0 ? (
        <FlatList
          data={posts}
          snapToInterval={layoutHeight - 10}
          snapToAlignment={"start"}
          decelerationRate={"fast"}
          renderItem={({ item, index }) => (
            <RenderItem
              navigation={navigation}
              post={item}
              currentUser={currentUser}
              bottomSheetRefComments={bottomSheetRefComments}
              bottomSheetRefComment={bottomSheetRefComment}
              bottomSheetRefOptions={bottomSheetRefOptions}
              setBottomSheetIndex={setBottomSheetIndex}
              sharedIndex={index}
              setLayoutHeight={setLayoutHeight}
            />
          )}
          ListFooterComponent={() => <View style={{ height: 40 }} />}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View >
          <FlatList
            data={["", "", "", "", "", ""]}
            renderItem={() => <PostsSkeleton />}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
        <BottomSheetOptions
          bottomSheetRef={bottomSheetRefOptions}
          navigation={navigation}
          post={posts[bottomSheetIndex]}
          currentUser={currentUser}
        />
        <BottomSheetComments
          bottomSheetRef={bottomSheetRefComments}
          post={posts[bottomSheetIndex]}
          currentUser={currentUser}
          navigation={navigation}
        />
        <BottomSheetComment
          bottomSheetRefComment={bottomSheetRefComment}
          post={posts[bottomSheetIndex]}
          currentUser={currentUser}
        />
      </View>
  );
};

export default Detail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingTop: Platform.OS=='ios'?30:0
  },
});
