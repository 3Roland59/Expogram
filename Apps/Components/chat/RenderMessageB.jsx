import { Image, Platform, StyleSheet, Text, ActivityIndicator, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import React, { useState } from "react";
import { SIZES } from "../../../Utils/Constants";
import convertTimestampToTime from "../../../Utils/convertTimestampToTime";
import { useNavigation } from "@react-navigation/native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { Modal } from "react-native";
import { BlurView } from "expo-blur";
import useDeleteMessage from "../../../Hooks/useDeleteMessage";
import { Audio } from 'expo-av';

const RenderMessageB = ({ item,user, Ai }) => {

  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState(null);
  const [loading, setLoading] = useState(false);
  const {convertTimestamp} = convertTimestampToTime()
  const navigation = useNavigation()
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const {deleteMessage,deleteAiMessage, deleteSelfMessage} = useDeleteMessage()

  const handleDelete=(val)=>{
    user?deleteMessage(val,user):Ai?deleteAiMessage(val):deleteSelfMessage(val)
  }

  const handleAudioPlayPause = async (uri) => {
  	setLoading(true)
    if (sound) {
      await sound.unloadAsync();
      setSound(null);
      setIsPlaying(false);
    } else {
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri },
        { shouldPlay: true }
      );
      setLoading(false)

      newSound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          setIsPlaying(false);
          setSound(null);
        }
      });

      setSound(newSound);
      setIsPlaying(true);
    }
  };

  return (
    <View>
    <TouchableOpacity onLongPress={()=>setFilterModalVisible(true)} onPress={()=>{item?.imageUrl&&navigation.navigate('DisplayImage', {
      uri: item.imageUrl
    }); item?.audioUrl&&handleAudioPlayPause(item.audioUrl)}}>
     { item?.imageUrl&& (<View style={styles.currentUserWrapper1}>
     <Image source={{uri: item.imageUrl}} style={{width:200, height:250, borderRadius:15, marginBottom: 5}} />
     <Text style={styles.text1}>{convertTimestamp(item.timestamp)}</Text>
      </View>)}
     { item?.audioUrl&& (
      <View style={styles.currentUserWrapper}>
      <Text className='px-2 mt-[-4px]'>
     <View className='p-2 bg-[#444] rounded-full translate-y-3'>
     {loading?<ActivityIndicator
                    color={"#fff"}
                    size={'small'}
                  />:<Feather
                  name={isPlaying ? "pause" : "play"}
                  size={16}
                  color={"#fff"}
                  style={{ transform: [{ scaleY: 1.1 }] }}
                />}
                </View>
                <Text style={styles.text}>
        {'   '}Voice note
      </Text>
      </Text>
     <Text style={styles.text1}>{convertTimestamp(item.timestamp)}</Text>
      </View>
    )}
      { item?.message=='Video call'? (<View style={styles.currentUserWrapper}>
      <Text className='px-2 mt-[-4px]'>
     <View className='p-2 bg-[#444] rounded-full translate-y-3'>
     <Feather
                  name="video"
                  size={16}
                  color={"#fff"}
                  style={{ transform: [{ scaleY: 1.1 }] }}
                />
                </View>
                <Text style={styles.text}>
        {'   '}{item.message}
      </Text>
      </Text>
     <Text style={styles.text1}>{convertTimestamp(item.timestamp)}</Text>
      </View>):(
        item.message&&<View style={styles.currentUserWrapper}>
        <Text style={styles.text}>{item.message}</Text>
        <Text style={styles.text1}>{convertTimestamp(item.timestamp)}</Text>
         </View>
      )}
    </TouchableOpacity>

    <Modal
        visible={filterModalVisible}
        animationType="fade"
        transparent={true}
      >
        <TouchableWithoutFeedback onPress={() => setFilterModalVisible(false)}>
          <View style={styles.modalBackdrop}>
            <BlurView intensity={70} style={styles.modalContainer}>
              <TouchableOpacity
                style={styles.modalRowContainer}
                onPress={() => {
                  handleDelete(item)
                  setFilterModalVisible(false);
                }}
              >
                <Text style={styles.modalText}>Delete chat</Text>
                <Ionicons name="trash-outline" size={20} color={"#fff"} />
              </TouchableOpacity>
            </BlurView>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default RenderMessageB;

const styles = StyleSheet.create({
  currentUserWrapper: {
    marginLeft: 15,
    backgroundColor: "#82f",
    borderRadius: 15,
    // borderBottomRightRadius:0,
    maxWidth: SIZES.Width * 0.68,
    alignItems: "flex-start",
    justifyContent: "center",
    minHeight: 32,
  },
  currentUserWrapper1: {
    marginLeft: 15,
    borderRadius: 15,
    borderBottomRightRadius:0,
    maxWidth: SIZES.Width * 0.68,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 32,
  },
  text: {
    color: "#fff",
    fontSize: 14,
    paddingHorizontal: 10,
    paddingTop: 6,
  },
  text1: {
    textAlign:'right',
    width:'100%',
    color: "#aaa",
    fontSize: 9,
    paddingHorizontal: 10,
    paddingBottom: 6,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "transparent",
  },
  modalContainer: {
    position: "absolute",
    top: Platform.OS === "ios" ? 100 : SIZES.Height * 0.07,
    right: 22,
    backgroundColor: "rgba(35,35,35,0.6)",
    borderRadius: 15,
    overflow: "hidden",
  },
  modalRowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 15,
    marginRight: 15,
    height: 46,
  },
  modalText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 15,
  },
  modalDivider: {
    width: "100%",
    height: 0.5,
    backgroundColor: "#fff",
  },
});
