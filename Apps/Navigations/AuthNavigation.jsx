import { View, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import SignedOutStack from "./SignedOutStack";
import SignedInStack from "./SignedInStack";
import { firebase } from "../../dist/firebaseconfig/firebase";

const AuthNavigation = () => {
  const [currentUser, setCurrentUser] = useState(null);

  const userHandler = (user) => (user ? setCurrentUser(user) : setCurrentUser(null));

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => userHandler(user));
    return () => unsubscribe(); // Clean up the subscription on unmount
  }, []);

  return (
    <View style={styles.container}>
      {currentUser ? <SignedInStack /> : <SignedOutStack />}
    </View>
  );
};

export default AuthNavigation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
