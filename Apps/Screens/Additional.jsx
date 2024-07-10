import {
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback,
    TouchableOpacity,
    KeyboardAvoidingView,
    Keyboard,
    SafeAreaView,
    Platform,
    StatusBar,
    TextInput,
    ActivityIndicator,
  } from "react-native";
  import React, { useState } from "react";
  import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
  
  const Forgot = ({ navigation }) => {

    const {email, username, password, country} = useRoute().params

    const [bio, setBio] = useState('')
    const [link, setLink] = useState('')

    const onProceed = () => {
        Keyboard.dismiss();
        navigation.navigate('Profilepic', {
          email,username,password, country, bio, link
        })
        console.log(email,username, password, country, bio, link)
      };
  
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <SafeAreaView style={styles.container}>
          <KeyboardAvoidingView
            style={styles.mainContainer}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View style={styles.iconContainer}>
              <Ionicons name="person-circle" size={120} color="#fff" />
            </View>
            <Text style={styles.titleText}>More Information</Text>
            <Text style={styles.normalText}>
              Add bio and link so your friends can easily identify you
            </Text>
            <View style={styles.rowContainer}></View>
  
            <View style={styles.textInputWrapper}>
              <TextInput
                style={styles.textInput}
                placeholderTextColor={"#bbb"}
                placeholder="Add bio ..."
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="default"
                onChangeText={(val)=>setBio(val)}
                value={bio}
              />
            </View>
            <View style={styles.textInputWrapper}>
              <TextInput
                style={styles.textInput}
                placeholderTextColor={"#bbb"}
                placeholder="Add link ..."
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="default"
                textContentType="URL"
                onChangeText={(val)=>setLink(val)}
                value={link}
              />
            </View>
            <TouchableOpacity
              onPress={() => onProceed()}
              style={
                styles.buttonWrapper
              }
            >
              {bio==''&& link==''? <Text style={styles.buttonText}>Skip</Text> :<Text style={styles.buttonText}>Proceed</Text>}
            </TouchableOpacity>
          </KeyboardAvoidingView>
          <View style={styles.footerContainer}>
            <View style={styles.fulDivider}></View>
            <TouchableOpacity
              style={styles.footerTextContainer}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.footerText}>Back to Sign up</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  };
  
  export default Forgot;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#000",
    },
    mainContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 30,
    },
    iconContainer: {
      borderWidth: 3,
      borderColor: "#fff",
      borderRadius: 100,
      height: 150,
      width: 150,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 20,
    },
    titleText: {
      color: "#fff",
      fontSize: 26,
      fontWeight: "700",
    },
    normalText: {
      color: "#aaa",
      fontSize: 13,
      fontWeight: "400",
      textAlign: "center",
      marginVertical: 15,
    },
    rowContainer: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-around",
    },
    selectionText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "700",
      marginBottom: 10,
    },
    divider: {
      width: "80%",
      height: 1,
      backgroundColor: "#fff",
    },
    textInputWrapper: {
      marginTop: 15,
      // backgroundColor: "#111",
      borderRadius: 8,
      borderWidth: 1,
      borderColor: "#fff",
      paddingHorizontal: 15,
      width: "100%",
      height: 56,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    textInput: {
      fontSize: 16,
      fontWeight: "500",
      color: "#fff",
      width: "95%",
    },
    buttonWrapper: {
      marginTop: 28,
      alignItems: "center",
      backgroundColor: "#07f",
      width: "100%",
      height: Platform.OS === "android" ? 56 : 54,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 10,
      marginBottom: 70,
    },
    buttonText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "800",
    },
    footerContainer: {
      height: Platform.OS === "android" ? 70 : 50,
      width: "100%",
    },
    fulDivider: {
      width: "100%",
      height: 0.5,
      backgroundColor: "#222",
    },
    footerTextContainer: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      height: Platform.OS === "android" ? 70 : 50,
      paddingBottom: Platform.OS === "android" ? 5 : 0,
    },
    footerText: {
      color: "#0af",
      fontSize: 13,
      fontWeight: "700",
      textAlign: "center",
    },
  });