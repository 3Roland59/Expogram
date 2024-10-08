import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
} from "react-native";
import React, { useState } from "react";
import QRCode from "react-native-qrcode-svg";
import * as Clipboard from "expo-clipboard";
import useSharePost from "../../Hooks/useSharePost";
import CopyClipboardModal from "../Components/Shared/modals/CopyClipboardModal";

const Share = ({ navigation, route }) => {
  const { user } = route.params || {};
  const { shareUser } = useSharePost();
  const [copyModalVisible, setCopyModalVisible] = useState(false);

  return (
    <View style={styles.backdrop}>
      <View style={styles.container}>
        <View style={styles.mainContainer}>
          <View style={styles.qrContainer}>
            <QRCode
              size={180}
              value={"https://expogram.com/" + user.username}
              backgroundColor={"transparent"}
              logoSize={55}
              logo={require("../../assets/favicon.png")}
              logoMargin={0}
              quietZone={3}
              logoBorderRadius={15}
              ecl="H"
              logoBackgroundColor={"#fff"}
              enableLinearGradient
              linearGradient={['#00f', '#f0f']}
            />
          </View>
          <Text numberOfLines={1} style={styles.user}>
            {"@" + user.username.toUpperCase()}
          </Text>
        </View>
        <Text style={styles.infoText}>
          People can scan this QR code with their smartphone's camera to see
          this profile.
        </Text>
        <View style={styles.divider} />
        <TouchableOpacity
          onPress={() => shareUser(user)}
          style={styles.buttonContainer}
        >
          <Text style={styles.text}>Share profile</Text>
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity
          onPress={() => {
            Clipboard.setStringAsync("https://expogram.com/" + user.username);
            setCopyModalVisible(true);
            setTimeout(() => {
              setCopyModalVisible(false);
            }, 3500);
          }}
          style={styles.buttonContainer}
        >
          <Text style={styles.text}>Copy link</Text>
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.buttonContainer}
        >
          <Text style={styles.textBlue}>Done</Text>
        </TouchableOpacity>

        <CopyClipboardModal copyModalVisible={copyModalVisible} />
      </View>
    </View>
  );
};

export default Share;

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#444444d0",
    borderRadius: 30,
    height: Platform.OS === "android" ? 564 : 534,
    width: 290,
  },
  mainContainer: {
    height: 280,
    width: 224,
    backgroundColor: "#fff",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    gap: 25,
    marginTop: 30,
    marginBottom: 10,
  },
  qrContainer: {
    borderRadius: 15,
    overflow: "hidden",
  },
  user: {
    color: "#000",
    fontSize: 18,
    fontWeight: "900",
  },
  infoText: {
    paddingHorizontal: 15,
    textAlign: "center",
    textAlignVertical: "center",
    color: "#bbb",
    fontSize: 15,
    fontWeight: "500",
    height: Platform.OS === "android" ? 80 : 54,
    marginBottom: 10,
  },
  divider: {
    height: 0.5,
    width: "100%",
    backgroundColor: "#666",
  },
  buttonContainer: {
    height: 50,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "500",
  },
  textBlue: {
    color: "#26f",
    fontSize: 17,
    fontWeight: "700",
  },
});
