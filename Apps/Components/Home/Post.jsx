import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native'
import React, { useEffect, useRef } from "react";
import { Divider } from 'react-native-elements'
import { Image } from 'react-native'
import { MaterialCommunityIcons,Entypo, Feather, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient'
import { SIZES } from '../../../Utils/Constants';
import useLikeAnimation from '../../../Utils/useLikeAnimation';
import { GestureDetector } from 'react-native-gesture-handler';//Page like
import Animated from "react-native-reanimated";
import { TouchableWithoutFeedback } from 'react-native';
import { useState } from 'react';
import useTimeAgo from '../../../Utils/useTimeAgo'
import BottomSheetOptions from "./bottomSheets/BottomSheetOptions";
import useCheckStoriesSeen from "../../../Hooks/useCheckStoriesSeen";
import BottomSheetComments from "./bottomSheets/BottomSheetComments";
import useSharePost from "../../../Hooks/useSharePost";
import useSavePost from "../../../Hooks/useSavePost";
import useHandleLike from "../../../Hooks/useHandleLike";
import BottomSheetComment from "./bottomSheets/BottomSheetComment";
import useHandleFollow from "../../../Hooks/useHandleFollow";
import firebase from "firebase/compat";
import { ScrollView } from 'react-native';

export default function Post({post, navigation, currentUser, key}) {
  return (
    <View className="mb-8 mt-2" key={key}>
        {/* <Divider width={0.7} orientation='vertical' /> */}
        <PostHeader post={post} currentUser={currentUser} navigation={navigation} /> 
        <PostImage post={post} currentUser={currentUser} />
        <PostFooter currentUser={currentUser} navigation={navigation} post={post} />
        <Likes post={post} navigation={navigation} />
        <Caption post={post} />
        <Comments post={post} currentUser={currentUser} navigation={navigation} />
        <Date post={post} />
    </View>
  )
}

const PostHeader = ({post, currentUser, navigation}) =>{
  const { checkStoriesSeen } = useCheckStoriesSeen();
  const { handleFollow } = useHandleFollow();
  const bottomSheetRef = useRef(null);
  // const [user, setUser] = useState({});

  const handOptionsSheet = () => {
    bottomSheetRef.current.present();
  };

  // useEffect(() => {
  //   try {
  //     const unsubscribe = firebase
  //       .firestore()
  //       .collection("users")
  //       .doc(post.email)
  //       .onSnapshot((snapshot) => {
  //         setUser(snapshot.data());
  //       });

  //     return () => unsubscribe;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, []);


  const handlePostOwner = () => {
    if (currentUser.email == post.email) {
      navigation.navigate("Profile");
    } else {
      navigation.navigate("UserDetail", {
        email: post.email
      });
    }
  };
  return (
      <View >
        <View className="flex-row justify-between m-3 items-center">
        <TouchableOpacity
          className="flex-row items-center"
          onPress={() => handlePostOwner()}
        >
          {checkStoriesSeen(post.username, currentUser.email) ? (
            <View style={styles.rainbowBorder}>
              {
              post.profile_picture?
              <Image
                source={{uri:post.profile_picture}}
                style={styles.headerImageWithRainbow}
              />:
              <Image
                source={require('../../../assets/images/profile_thumbnail.png')}
                style={styles.headerImageWithRainbow}
              />}
            </View>
          ) : (
            <LinearGradient start={[0.9, 0.45]}  end={[0.07, 1.03]}
              colors={['#07f', '#82f', '#f0f']}
              style={styles.rainbowBorder}
            >{
              post.profile_picture?
              <Image
                source={{uri:post.profile_picture}}
                style={styles.headerImageWithRainbow}
              />:
              <Image
                source={require('../../../assets/images/profile_thumbnail.png')}
                style={styles.headerImageWithRainbow}
              />}
            </LinearGradient>
            )}
          <Text style={styles.headerText}>{post.username.toLowerCase()}</Text>
        </TouchableOpacity>
          <View className='flex flex-row justify-center gap-2 items-center'>
          {currentUser.email !== post.email &&
          currentUser.following &&
          !currentUser.following.includes(post.email) ? (
            <TouchableOpacity
              onPress={() => {
                handleFollow(post.email);
              }}
              style={styles.buttonContainer}
            >
              {currentUser.followingRequest &&
              !currentUser.followingRequest.includes(post.email) ? (
                !currentUser.following.includes(post.email)&&<Text style={styles.buttonText}>Follow</Text>
              ) : (
                <Text style={styles.buttonText}>Requested</Text>
              )}
            </TouchableOpacity>
          ) : null}
          <TouchableOpacity onPress={() => handOptionsSheet()} >
            <Entypo
              name="dots-three-vertical"
              size={15}
              color={"#fff"}
              style={styles.headerDots}
              />
          </TouchableOpacity>
              </View>
          </View>
      <BottomSheetOptions
        bottomSheetRef={bottomSheetRef}
        currentUser={currentUser}
        post={post}
        navigation={navigation}
      />
      </View>
)}

// const PostImage = ({ post, currentUser }) => {
//     const { handleDoubleTap, animatedStyles } = useLikeAnimation(
//       post,
//     currentUser
//     )
  
//     return (
//       <GestureDetector gesture={handleDoubleTap}>
//         <View>
//           <Image source={{uri:post.imageUrl[0]}} style={styles.postImage} />
//           <Animated.View style={[styles.likeContainer, animatedStyles]}>
//             <Ionicons name="heart" size={110} color="#f33" />
//           </Animated.View>
//         </View>
//       </GestureDetector>
//     );
//   };



const PostImage = ({ post, currentUser }) => {
  const { handleDoubleTap, animatedStyles } = useLikeAnimation(post, currentUser);
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




const PostFooter =({currentUser, navigation, post})=>{
  const { handlePostLike } = useHandleLike();
  const { sharePost } = useSharePost();
  const { savePost } = useSavePost();
  const bottomSheetRef = useRef(null);

  const handleViewComments = () => {
    bottomSheetRef.current.present();
  };
  
  return (
    <View className="flex-row justify-between items-center m-3">
      <View className="flex-row justify-between gap-4 items-center">
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
        <TouchableOpacity
        onPress={() => {
          handleViewComments();
        }}>
          <Ionicons
            name="chatbubble-outline"
            size={27}
            color={"#fff"}
            style={styles.chatIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
        onPress={() => sharePost(post)}>
          <Feather
            name="send"
            size={24}
            color={"#fff"}
            style={styles.sendIcon}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => savePost(post, currentUser)}>
          {currentUser.saved_posts &&
        currentUser.saved_posts.includes(post.created_at.seconds) ? (
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
      <BottomSheetComments
        bottomSheetRef={bottomSheetRef}
        currentUser={currentUser}
        post={post}
        navigation={navigation}
      />
    </View>
)}

export const Likes = ({post, navigation}) =>(
    <View>
        {post.likes_by_users.length < 1 ? null : post.likes_by_users.length == 1 ? (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Likes", {
            likesByEmail: post.likes_by_users,
          })
        }
      >
        <Text className="text-white mx-3 font-bold">1 like</Text>
      </TouchableOpacity>
    ) : (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Likes", {
            likesByEmail: post.likes_by_users,
          })
        }
      >
        <Text className="text-white mx-3 font-bold">
          <Text className="text-white mx-3 font-bold">
            {post.likes_by_users.length.toLocaleString("en")} likes
          </Text>
        </Text>
      </TouchableOpacity>
    )}
    </View>
)

export const Caption = ({ post }) => {
    const [showLongCaption, setShowLongCaption] = useState(false);
  
    return (
      <View className="flex-row mt-1 mx-3">
        {post.caption.length <= 0 ? null : post.caption.length < 82 ? (
          <Text className="text-white font-bold">
            {post.username.toLowerCase() + " "}
            <Text className="ml-1 font-normal">{post.caption}</Text>
          </Text>
        ) : (
          <TouchableWithoutFeedback
            onPress={() => setShowLongCaption(!showLongCaption)}
          >
            <Text className="text-white font-bold">
              {post.username.toLowerCase() + " "}
  
              {showLongCaption ? (
                <Text className="ml-1 font-normal">{post.caption}</Text>
              ) : (
                <Text className="ml-1 font-normal">
                  {post.caption.slice(0, 80)}
                  <Text className=" text-gray-400"> ...more</Text>
                </Text>
              )}
            </Text>
          </TouchableWithoutFeedback>
        )}
      </View>
    );
  };

  const Comments = ({ post, navigation, currentUser }) => {
    const bottomSheetRefComments = useRef(null);
  const bottomSheetRefComment = useRef(null);

  const handleViewComments = () => {
    bottomSheetRefComments.current.present();
  };

  const handleViewComment = () => {
    if (Platform.OS === "ios") {
      bottomSheetRefComment.current.present();
      // bottomSheetRefComments.current.present();
    } else {
      bottomSheetRefComments.current.present();
    }
  };
  
    return (
      <View>
        {post?.comments.length <= 0 ? (
          null
        ) :(
          <View>
            <TouchableOpacity style={styles.container} onPress={() => {
            handleViewComments();
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
        <TouchableOpacity className='mt-2' onPress={() => handleViewComment()}>
            <View style={styles.container}>
            {
              currentUser.profile_picture?
              <Image
                source={{uri:currentUser.profile_picture}}
                style={styles.headerImageWithRainbow}
              />:
              <Image
                source={require('../../../assets/images/profile_thumbnail.png')}
                style={styles.headerImageWithRainbow}
              />}
              <Text className="text-[15px] text-gray-400">Add a comment...</Text>
            </View>
          </TouchableOpacity>
          <BottomSheetComments
        bottomSheetRef={bottomSheetRefComments}
        currentUser={currentUser}
        post={post}
        navigation={navigation}
      />
      <BottomSheetComment
        bottomSheetRef={bottomSheetRefComment}
        currentUser={currentUser}
        post={post}
      />
      </View>
    );
  };

  export const Date = ({ post }) => {
    const { timeAgoLong } = useTimeAgo();
  
    return (
      <View className="mx-3 mt-1">
        <Text className="text-gray-400 text-[13px]">
          {post.created_at && timeAgoLong(post.created_at.seconds)}
        </Text>
      </View>
    );
  };
  

const styles = StyleSheet.create({
    headerImageWithRainbow: {
      height: 36.5,
      width: 36.5,
      resizeMode: "cover",
      borderRadius: 100,
      borderWidth: 2,
      borderColor: "#000",
    },
    rainbowBorder: {
      height: 39,
      width: 39,
      borderRadius: 100,
      justifyContent: "center",
      alignItems: "center",
    },
    headerText: {
      color: "#fff",
      fontWeight: "600",
      fontSize: 15,
      marginLeft: 10,
      marginBottom: Platform.OS === "android" ? 4 : 1,
    },
    headerDots: {
      transform: [{ scaleX: 1.1 }],
      marginRight: 6,
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
      container: {
        marginHorizontal: 12,
        marginVertical: 2,
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
      },
      buttonContainer: {
        backgroundColor: "#000",
        borderRadius: 10,
        height: Platform.OS === "android" ? 35 : 30,
        paddingHorizontal: 12,
        marginRight: 15,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor:'#fff'
      },
      buttonText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 13,
        marginBottom: Platform.OS === "android" ? 2 : 0,
      },
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
  });
