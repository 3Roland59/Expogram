import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Platform,
  StatusBar,
} from "react-native";
import React, { useEffect, useState } from "react";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import Requests from "../Components/follow/Requests";
import Interaction from "../Components/notifications/Interaction";
import useFetchRequests from "../../Hooks/useFetchRequests";
import useFetchUserPosts from "../../Hooks/useFetchUserPosts";
import { LinearGradient } from "expo-linear-gradient";
import { SIZES } from "../../Utils/Constants";
import firebase from "firebase/compat";
import ContentLoader, { Rect, Circle } from 'react-content-loader/native';

const NotificationSkeleton = () => (
  <View style={styles.container}>
    <ContentLoader 
      speed={1}
      width={'100%'}
      height={500}
      backgroundColor="#222"
      foregroundColor="#444"
      style={styles.loader}
    >
      {/* Back button */}
      <Rect x="20" y="14" rx="4" ry="4" width="20" height="20" /> 
      <Rect x="50" y="14" rx="4" ry="4" width="150" height="20" />

      {/* Title */}
      <Rect x="20" y="60" rx="4" ry="4" width="150" height="20" /> 

      {/* Request List Item */}
      <Circle cx="30" cy="110" r="20" />
      <Rect x="60" y="95" rx="4" ry="4" width="200" height="20" />
      <Rect x="60" y="120" rx="4" ry="4" width="100" height="20" />

      {/* Interaction List Items */}
      {Array.from({ length: 4 }).map((_, index) => (
        <React.Fragment key={index}>
          <Circle cx="30" cy={180 + index * 80} r="20" />
          <Rect x="60" y={165 + index * 80} rx="4" ry="4" width="200" height="20" />
          <Rect x="60" y={190 + index * 80} rx="4" ry="4" width="100" height="20" />
        </React.Fragment>
      ))}

      {/* Footer message */}
      <Circle cx="50%" cy="420" r="30" />
      <Rect x="20" y="460" rx="4" ry="4" width="300" height="20" />
      <Rect x="20" y="490" rx="4" ry="4" width="200" height="20" />
      <Rect x="20" y="520" rx="4" ry="4" width="100" height="20" />
    </ContentLoader>
  </View>
);

const Notifications = ({ navigation, route }) => {
  const { currentUser } = route.params;
  const { posts, loader } = useFetchUserPosts(currentUser.email);
  const { requests, loading } = useFetchRequests({ user: currentUser });
  const [notificationCounter, setNotificationCounter] = useState(0);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  //console.log('noti:', currentUser)

  useEffect(() => {
    if (currentUser.event_notification > 0) {
      try {
        firebase.firestore().collection("users").doc(currentUser.email).update({
          event_notification: 0,
        });
      } catch (error) {
        console.log(error);
      }
    }
    setIsLoadingUser(false);
  }, []);

  useEffect(() => {
    if (!loader && !loading && !isLoadingUser) {
      let counter = 0;

      for (let i = 0; i < posts.length; i++) {
        if (posts[i].comments && posts[i].comments.length > 0) {
          if (
            posts[i].comments[posts[i].comments.length - 1].email !==
            currentUser.email
          ) {
            counter++;
          }
        }
        if (posts[i].new_likes.length > 0) {
          counter++;
        }
      }

      if (
        currentUser.followersRequset &&
        currentUser.followersRequset.length > 0
      ) {
        counter = counter + currentUser.followersRequset.length;
      }

      setNotificationCounter(counter);
    }
  }, [posts, loader, loading, isLoadingUser]);

  if (loader || loading || isLoadingUser) {
    return <NotificationSkeleton />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.titleContainer}
      >
        <MaterialIcons name="arrow-back-ios" size={22} color={"#fff"} />
        <Text style={styles.textTitle}>Notifications</Text>
      </TouchableOpacity>
      {notificationCounter > 0 ? (
        <View>
          {currentUser.followersRequset &&
            currentUser.followersRequset.length > 0 && (
              <View>
                <Text style={styles.subtitle}>Followers Requests:</Text>
                <FlatList
                  style={{}}
                  data={requests}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => <Requests user={item} />}
                />
              </View>
            )}

          <View>
            <FlatList
              style={{}}
              data={posts}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) =>
                item.id !== "empty" &&
                item.comments.length > 0 &&
                item.comments[item.comments.length - 1].username !==
                  currentUser.username ? (
                  <Interaction
                    navigation={navigation}
                    item={item}
                    currentUser={currentUser}
                    text={"commented"}
                  />
                ) : (
                  item.id !== "empty" &&
                  item.new_likes.length > 0 && (
                    <Interaction
                      navigation={navigation}
                      item={item}
                      currentUser={currentUser}
                      text={"liked"}
                    />
                  )
                )
              }
            />
          </View>
        </View>
      ) : (
        <View style={styles.footerContainer}>
          <LinearGradient start={[0.9, 0.45]}  end={[0.07, 1.03]}
            colors={['#07f', '#82f', '#f0f']}
            style={styles.rainbowBorder}
          >
            <AntDesign name="checkcircle" size={56} color={"#000"} />
          </LinearGradient>
          <Text style={styles.title}>No notifications for now</Text>
          <Text style={styles.text}>
            There are no notifications from the past 30 days.
          </Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.button}>Back to home</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 14,
    marginBottom: Platform.OS === "android" ? 20 : 4,
    gap: 3,
  },
  textTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 4,
    transform: [{ scaleY: 1.1 }],
  },
  subtitle: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 17,
    marginHorizontal: 20,
  },
  footerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: SIZES.Height * 0.18,
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
  loader: {
    marginTop: 14,
  }
});
