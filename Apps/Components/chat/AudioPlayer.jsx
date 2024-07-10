import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Slider } from 'react-native-range-slider-expo';
import { Audio } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';


const AudioPlayer = ({ audioUri }) => {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);

  useEffect(() => {
    loadAudio();
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  const loadAudio = async () => {
    const { sound: newSound, status } = await Audio.Sound.createAsync(
      { uri: audioUri },
      { shouldPlay: false }
    );
    setSound(newSound);
    setDuration(status?.durationMillis);
    newSound.setOnPlaybackStatusUpdate(updateStatus);
  };

  const updateStatus = (status) => {
    if (status.isLoaded) {
      setPosition(status?.positionMillis);
      setIsPlaying(status.isPlaying);
    }
  };

  const playPauseAudio = async () => {
    if (sound) {
      if (isPlaying) {
        await sound.pauseAsync();
      } else {
        await sound.playAsync();
      }
    }
  };

  const onSliderValueChange = (value) => {
    if (sound) {
      sound.setPositionAsync(value);
    }
  };

  const formatTime = (milliseconds) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    audioUri&&<View style={styles.container}>
       <TouchableOpacity onPress={playPauseAudio}>
        <Ionicons name={isPlaying ? "pause" : "play"} size={24} color="#fff" />
      </TouchableOpacity>
     <View style={styles.sliderContainer}>
        <Text style={styles.timeText}>{position&&formatTime(position)}</Text>
        {duration&&<Slider
          min={0}
          max={duration}
          step={1}
          valueOnChange={onSliderValueChange}
          initialValue={position}
          knobColor="#FFFFFF"
          valueLabelsBackgroundColor="#FFFFFF"
          inRangeBarColor="#FFFFFF"
          outOfRangeBarColor="#fff"
          styleSize="small"
          showRangeLabels={false}
        />}
        <Text style={styles.timeText}>{duration&&formatTime(duration)}</Text>
      </View> 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#252525',
    padding: 10,
    marginBottom: 50
  },
  sliderContainer: {
    flex: 1,
    display:'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center'
  },
  slider: {
    flex: 1,
    height: 10,
  },
  timeText: {
    color: '#fff',
    marginHorizontal: 10,
  },
});

export default AudioPlayer;
