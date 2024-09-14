// screens/PlayerScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, Button, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const MusicPlayer = ({ route }) => {
  const { song } = route.params;
  const [sound, setSound] = useState(null);
  const [col, setCol] = useState('red');
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const loadSound = async () => {
      const { sound } = await Audio.Sound.createAsync({ uri: song.preview });
      setSound(sound);
      await sound.playAsync();
      setIsPlaying(true);
    };
    loadSound();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  const handlePlayPause = async () => {
    if (sound) {
      const status = await sound.getStatusAsync();
      if (status.isPlaying) {
        await sound.pauseAsync();
        setIsPlaying(false);
      } else {
        await sound.playAsync();
        setIsPlaying(true);
      }
    }
  };
  useEffect(()=>{
    let hex = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F']

    function populate (a){
        for(let i=0; i<6; i++){
            let x = Math.round(Math.random() * 14)
            let y = hex[x]
            a+=y
        }
        return a
    }
    let color1 = populate('#')
    setCol(color1)
  console.log(song)
  },[])

  

  return (
    <LinearGradient colors={[col, '#000000']} className='flex-1'>
    <View style={styles.container}>
      <Image source={{ uri: song.album.cover_big }} style={styles.albumCover} />
      <View style={styles.songDetails}>
        <Text style={styles.title}>{song.title}</Text>
        <Text style={styles.artist}>{song.artist.name}</Text>
      </View>
      <View style={styles.controls}>
        <TouchableOpacity onPress={handlePlayPause}>
          <Ionicons name={isPlaying ? "pause" : "play"} size={48} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Previewing song from Deezer</Text>
      </View>
    </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#121212',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  albumCover: {
    width: 300,
    height: 300,
    marginTop: 50,
  },
  songDetails: {
    alignItems: 'center',
    marginVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  artist: {
    fontSize: 18,
    color: 'gray',
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footer: {
    marginBottom: 30,
  },
  footerText: {
    color: 'gray',
  },
});

export default MusicPlayer;
