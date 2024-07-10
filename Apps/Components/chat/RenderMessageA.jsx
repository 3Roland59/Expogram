import { Image, StyleSheet, Text, ActivityIndicator, View } from "react-native";
import React, { useState } from "react";
import { SIZES } from "../../../Utils/Constants";
import convertTimestampToTime from "../../../Utils/convertTimestampToTime";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { Audio } from 'expo-av';

const RenderMessageB = ({ item }) => {
  const {convertTimestamp} = convertTimestampToTime()
  const navigation = useNavigation();

  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState(null);
  const [loading, setLoading] = useState(false);


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
     { item?.imageUrl&& (<View style={styles.currentUserWrapper1}>
      <TouchableOpacity onPress={()=>{item?.imageUrl&&navigation.navigate('DisplayImage', {
      uri: item.imageUrl
    })}}>
     <Image source={{uri: item.imageUrl}} style={{width:200, height:250, borderRadius:15, marginBottom: 5}} />
     </TouchableOpacity>
     <Text style={styles.text1}>{convertTimestamp(item.timestamp)}</Text>
      </View>)}

      { item?.audioUrl&& (
      <TouchableOpacity onPress={()=>{item?.audioUrl&&handleAudioPlayPause(item.audioUrl)}}  style={styles.currentUserWrapper}>
      <Text className='px-2 mt-[-4px]'>
     <View className='p-2 bg-[#82f] rounded-full translate-y-3'>
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
      </TouchableOpacity>
    )}

      { item?.message=='Video call'? (<View style={styles.currentUserWrapper}>
     <Text className='px-2 mt-[-4px]'>
     <View className='p-2 bg-[#82f] rounded-full translate-y-3'>
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
    </View>
  );
};

export default RenderMessageB;

const styles = StyleSheet.create({
  currentUserWrapper: {
    marginLeft: 10,
    backgroundColor: "#333",
    borderRadius: 15,
    // borderBottomLeftRadius:0,
    maxWidth: SIZES.Width * 0.68,
    alignItems: "flex-start",
    justifyContent: "center",
    minHeight: 32,
  },
  currentUserWrapper1: {
    marginLeft: 10,
    borderRadius: 15,
    borderBottomLeftRadius:0,
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
});
