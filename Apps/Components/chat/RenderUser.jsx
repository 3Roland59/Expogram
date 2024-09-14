import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  Image,
} from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import useHandleSeenMessage from "../../../Hooks/useHandleSeenMessage";

const RenderUser = ({ navigation, user, currentUser, handleCamera }) => {
  const { handleSeenMessage } = useHandleSeenMessage();

  const handleLongName = (name) => {
    if (name.length > 25) {
      return `${name.substring(0, 23)}...`;
    } else {
      return name;
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          if (user.status === "unseen" || user.status === "added") {
            handleSeenMessage(user, currentUser);
          }
          navigation.navigate("Chating", { user });
        }}
        style={styles.rowContainer}
      >
        {user.profile_picture?(<Image
          source={{ uri: user.profile_picture }}
          style={styles.image}
        />):(
          <Image
          source={require('../../../assets/images/profile_thumbnail.png')}
          style={styles.image}
        />
        )}
        {user.status === "unseen" ? (
          <View style={styles.userContainer}>
            <Text style={styles.username}>{handleLongName(user.username)}</Text>
            <Text style={styles.statusBold}>New message</Text>
          </View>
        ) : user.status === "seen" ? (
          <View style={styles.userContainer}>
            <Text style={styles.username}>{handleLongName(user.username)}</Text>
            <Text style={styles.status}>{user.username}</Text>
          </View>
        ) : user.status === "added" ? (
          <View style={styles.userContainer}>
            <Text style={styles.username}>{handleLongName(user.username)}</Text>
            <Text style={styles.statusBold}>Just added</Text>
          </View>
        ) : (
          <View style={styles.userContainer}>
            <Text style={styles.username}>{handleLongName(user.username)}</Text>
            <Text style={styles.status}>{user.username}</Text>
          </View>
        )}
      </TouchableOpacity>
      <TouchableOpacity onPress={handleCamera} >
        <Feather name="camera" size={22} color={"#fff"} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

export default RenderUser;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 15,
    marginTop: Platform.OS === "android" ? 15 : 8,
  },
  rowContainer: {
    flex: 1,
    flexDirection: "row",
  },
  image: {
    height: 62,
    width: 62,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "#82f",
  },
  userContainer: {
    justifyContent: "center",
    marginLeft: 10,
  },
  username: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
  },
  status: {
    color: "#999",
    fontSize: 14,
    fontWeight: "400",
  },
  statusBold: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
  },
  icon: {
    marginRight: 10,
  },
});
