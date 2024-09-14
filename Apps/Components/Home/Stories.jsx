import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  ScrollView,
  Platform,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState, useEffect } from "react";
import StoriesSkeleton from "./StoriesSkeleton";
import { useStoriesContext } from "../../../Context/StoriesContext";
import useCheckStoriesSeen from "../../../Hooks/useCheckStoriesSeen";
import { Entypo } from "@expo/vector-icons";

const Stories = ({ navigation, currentUser }) => {
  const { stories, updatedStories } = useStoriesContext();
  const { checkStoriesSeen } = useCheckStoriesSeen();
  const [ownStory, setOwnStory] = useState(false);
  const [seenOwnStory, setSeenOwnStory] = useState(false);
  const [reducedStories, setReducedStories] = useState([]);

  useEffect(() => {
    setOwnStory(
      stories.find((story) => {
        return story?.username === currentUser?.username;
      })
    );

    setSeenOwnStory(checkStoriesSeen(currentUser?.username, currentUser?.email));

    const uniqueStories = {};
    const uniqueStoriesArray = [];

    stories.forEach((story) => {
      if (!uniqueStories[story?.username]) {
        uniqueStories[story?.username] = true;
        uniqueStoriesArray.push(story);
      }
    });
    setReducedStories(stories)
  }, [updatedStories]);

  // console.log("sts:",stories)


  return (
    <View>
      {stories ? (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.container}>
            <TouchableOpacity
              onPress={() =>
                ownStory
                  ? navigation.navigate("Story", {
                      stories: stories.filter(
                        (story) => story?.username === currentUser?.username
                      ),
                      currentUser: currentUser,
                    })
                  : navigation.navigate("MediaLibrary", {
                      initialSelectedType: "Add to story",
                      selectorAvailable: false,
                    })
              }
            >
              {!ownStory ? (
                <View>
                  <View style={styles.emptyStoryBorder}>
                   {currentUser?.profile_picture? (<Image
                      source={{
                        uri: currentUser?.profile_picture,
                      }}
                      style={styles.image}
                    />):(
                      <Image
                      source={require('../../../assets/images/profile_thumbnail.png')}
                      style={styles.image}
                    />
                    )}
                  </View>
                  <View style={styles.addBtn}>
                    <Entypo name="plus" size={18} color="#000" />
                  </View>

                  <Text style={styles.seenUser}>Your story</Text>
                </View>
              ) : seenOwnStory ? (
                <View>
                  <View style={styles.seenStoryBorder}>
                    <Image
                      source={{
                        uri: currentUser?.profile_picture,
                      }}
                      style={styles.imageWithStory}
                    />
                  </View>

                  <Text style={styles.seenUser}>Your story</Text>
                </View>
              ) : (
                <View>
                  <LinearGradient start={[0.9, 0.45]}  end={[0.07, 1.03]}
                    colors={['#07f', '#82f', '#f0f']}
                    style={styles.unseenRainbowBorder}
                  >
                    <Image
                      source={{
                        uri: currentUser?.profile_picture,
                      }}
                      style={styles.imageWithStory}
                    />
                  </LinearGradient>

                  <Text style={styles.seenUser}>Your story</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
          {reducedStories
            .filter((story) => story?.username != currentUser?.username)
            .map((story, index) => (
              <View style={styles.container} key={index}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Story", {
                      stories: stories.filter(
                        (eachStory) => story?.username === eachStory?.username
                      ),
                      currentUser: currentUser,
                    })
                  }
                >
                  {checkStoriesSeen(story?.username, currentUser?.email) ? (
                    <View style={styles.itemContainer}>
                      <View style={styles.seenStoryBorder}>
                        <Image
                          source={{ uri: story?.profile_picture }}
                          style={styles.imageWithStory}
                        />
                      </View>
                      <Text numberOfLines={1} style={styles.seenUser}>
                        {story?.username}
                      </Text>
                    </View>
                  ) : (
                    <View style={styles.itemContainer}>
                      <LinearGradient start={[0.9, 0.45]}  end={[0.07, 1.03]}
                        colors={['#07f', '#82f', '#f0f']}
                        style={styles.unseenRainbowBorder}
                      >
                        <Image
                          source={{ uri: story?.profile_picture }}
                          style={styles.imageWithStory}
                        />
                      </LinearGradient>
                      <Text numberOfLines={1} style={styles.user}>
                        {story?.username}
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
              </View>
            ))}
        </ScrollView>
      ) : (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <StoriesSkeleton />
          <StoriesSkeleton />
          <StoriesSkeleton />
          <StoriesSkeleton />
          <StoriesSkeleton />
          <StoriesSkeleton />
          <StoriesSkeleton />
        </ScrollView>
      )}
    </View>
  );
};

export default Stories;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 12,
  },
  itemContainer: {
    width: 94,
    alignItems: "center",
  },
  image: {
    height: 75,
    width: 75,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#444",
    marginBottom: 7,
  },
  user: {
    marginTop: 3,
    fontSize: 12,
    color: "#fff",
    textAlign: "center",
  },
  seenUser: {
    marginTop: 4,
    fontSize: 12,
    color: "#bbb",
    textAlign: "center",
  },
  imageWithStory: {
    height: 72,
    width: 72,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "#000",
  },
  seenStoryBorder: {
    height: 77,
    width: 77,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    borderWidth: 1.5,
    borderColor: "#666",
  },
  unseenRainbowBorder: {
    height: 77,
    width: 77,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
  },
  addBtn: {
    backgroundColor: "#fff",
    height: 30,
    width: 30,
    borderRadius: 100,
    borderWidth: 3.5,
    borderColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
    position: "absolute",
    bottom: 20,
    right: 0,
  },
});
