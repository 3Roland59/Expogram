import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
} from "react-native";
import React from "react";
import useCheckStoriesSeen from "../../../Hooks/useCheckStoriesSeen";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "react-native";

const Interaction = ({ navigation, item, currentUser, text }) => {
  const { checkStoriesSeen } = useCheckStoriesSeen();

  const handleUserProfile = () => {
    navigation.navigate("UserDetail", {
      email: item.comments[item.comments.length - 1].email,
    });
  };

  const handleCheckPost = () => {
    navigation.navigate("Detail", { item: item });
  };


  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <TouchableOpacity onPress={() => handleUserProfile()}>
          {text === "commented" &&
          checkStoriesSeen(item.username, currentUser.email) ? (
            <LinearGradient start={[0.9, 0.45]}  end={[0.07, 1.03]}
              colors={['#07f', '#82f', '#f0f']}
              style={styles.rainbowBorder}
            >
              {text === "commented"?(item.comments[item.comments.length - 1].profile_picture?<Image
                source={{
                  uri:item.comments[item.comments.length - 1].profile_picture
                }}
                style={styles.image}
              />:<Image
              source={require('../../../assets/images/profile_thumbnail.png')}
              style={styles.image}
            />
            ): (item.new_likes[1]==''?<Image
              source={require('../../../assets/images/profile_thumbnail.png')}
              style={styles.image}
            />:<Image
              source={{
                uri:item.new_likes[1]
              }}
              style={styles.image}
            />
          )}
              {/* {item.comments[item.comments.length - 1].profile_picture?(<Image
                source={{
                  uri:
                    text === "commented"
                      ? item.comments[item.comments.length - 1].profile_picture
                      : item.new_likes[1],
                }}
                style={styles.image}
              />):(<Image
                source={text === "commented"
                ? require('../../../assets/images/profile_thumbnail.png'):{
                  uri:item.new_likes[1],
                }}
                style={styles.image}
              />)} */}
            </LinearGradient>
          ) : (
            // item.comments[item.comments.length - 1].profile_picture?(<Image
            //   source={{
            //     uri:
            //       text === "commented"
            //         ? item.comments[item.comments.length - 1].profile_picture
            //         : item.new_likes[1],
            //   }}
            //   style={styles.image}
            // />):(<Image
            //   source={text === "commented"
            //   ? require('../../../assets/images/profile_thumbnail.png'):{
            //     uri:item.new_likes[1],
            //   }}
            //   style={styles.image}
            // />)

            text === "commented"?(item.comments[item.comments.length - 1].profile_picture?<Image
              source={{
                uri:item.comments[item.comments.length - 1].profile_picture
              }}
              style={styles.image}
            />:<Image
            source={require('../../../assets/images/profile_thumbnail.png')}
            style={styles.image}
          />
          ): (item.new_likes[1]==''?<Image
            source={require('../../../assets/images/profile_thumbnail.png')}
            style={styles.image}
          />:<Image
            source={{
              uri:item.new_likes[1]
            }}
            style={styles.image}
          />
        )
            
          )}
        </TouchableOpacity>
        <View style={styles.userContainer}>
          <TouchableOpacity onPress={() => handleUserProfile()}>
            <Text style={styles.username}>
              {text === "commented"
                ? item.comments[item.comments.length - 1].username
                : item.new_likes[0]}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleCheckPost()}>
            <Text style={styles.name}>
              {text === "commented"
                ? "Commented your post."
                : "Liked your post."}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => handleCheckPost()}>
          <Image source={{ uri: item.imageUrl[0] }} style={styles.postImage} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Interaction;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 15,
    marginTop: Platform.OS === "android" ? 15 : 8,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rainbowBorder: {
    borderRadius: 100,
    height: 80,
    width: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: 56,
    width: 56,
    borderRadius: 100,
    borderWidth: 2.5,
    borderColor: "#000",
  },
  nonRainbowImage: {
    height: 58,
    width: 58,
    borderWidth: 3,
    borderColor: "#000",
    borderRadius: 100,
  },
  userContainer: {
    justifyContent: "center",
    marginLeft: 15,
  },
  username: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
  },
  name: {
    color: "#ddd",
    fontSize: 13,
    fontWeight: "400",
  },
  postImage: {
    height: 60,
    width: 60,
    marginRight: 2,
    borderRadius:10
  },
});
