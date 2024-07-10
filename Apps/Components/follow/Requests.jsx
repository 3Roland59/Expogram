import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useUserContext } from "../../../Context/UserContext";
import useHandleRequests from "../../../Hooks/useHandleRequests";
import { SIZES } from "../../../Utils/Constants";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const Requests = ({ user, navigation }) => {
  const { currentUser } = useUserContext();
  const { handleRequests } = useHandleRequests({ currentUser, user });

  const handleViewProfile = () => {
    navigation.navigate("UserDetail", {
      email: user.email,
    });
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => handleViewProfile()}>
        <View style={styles.rowContainer}>
        {user.profile_picture?(<Image
                  source={{
                    uri: user.profile_picture,
                  }}
                  style={styles.image}
                />):(<Image
                  source={require('../../../assets/images/profile_thumbnail.png')}
                  style={styles.image}
                />)}
          <View style={styles.userContainer}>
            <Text numberOfLines={1} style={styles.username}>
              {user.username}
            </Text>
            <Text numberOfLines={1} style={styles.name}>
              {user.username}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
{
  currentUser.followersRequset.includes(user.email)?
      (<View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => handleRequests(true)}>
          <View style={styles.blueButton}>
            <Text style={styles.removeText}>Accept</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleRequests(false)}>
          <View style={styles.button}>
            <Text style={styles.removeText1}>Remove</Text>
          </View>
        </TouchableOpacity>
      </View>):(
        <View style={styles.buttonContainer}>
        <TouchableOpacity >
          <View style={styles.blueButton}>
            <Text style={styles.removeText}>Accepted</Text>
          </View>
        </TouchableOpacity>
      </View>
      )}
    </View>
  );
};

export default Requests;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 15,
    marginTop: 15,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    marginLeft: 3,
    height: 53,
    width: 53,
    borderRadius: 100,
  },
  userContainer: {
    justifyContent: "center",
    width: SIZES.Width * 0.34,
    marginLeft: 15,
  },
  username: {
    color: "#fff",
    fontWeight: "700",
    width: "95%",
    fontSize: 14,
  },
  name: {
    color: "#999",
    fontSize: 14,
    fontWeight: "400",
    width: "95%",
    marginBottom: 4,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 4,
  },
  button: {
    borderWidth:1,
    borderColor: '#fff',
    justifyContent: "center",
    alignItems: "center",
    height: 34,
    width: 90,
    borderRadius: 10,
  },
  blueButton: {
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    height: 34,
    width: 90,
    borderRadius: 10,
  },
  buttonText: {
    color: "#08f",
    fontWeight: "700",
    fontSize: 14,
    marginBottom: 4,
  },
  removeText1: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
    marginBottom: 4,
  },
  removeText: {
    color: "#000",
    fontWeight: "700",
    fontSize: 14,
    marginBottom: 4,
  },
});
