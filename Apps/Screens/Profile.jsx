import { StyleSheet, SafeAreaView, Platform, StatusBar, View } from "react-native";
import React from "react";
import { useUserContext } from "../../Context/UserContext";
import StoryHighlights from "../Components/profile/StoryHighlights";
import Header from "../Components/profile/Header";

const Profile = ({ navigation }) => {
  const { currentUser } = useUserContext();

  return (
    <SafeAreaView style={styles.container}>
      {currentUser&&(<>
      <Header currentUser={currentUser} navigation={navigation} />
      <StoryHighlights navigation={navigation} currentUser={currentUser} />
      </>)}
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
});
