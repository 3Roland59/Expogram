// components/SongTile.js
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const SongTile = ({ song, onPress }) => (
  song&&<TouchableOpacity className='flex-1 h-[250px] rounded-xl relative m-4 border-b-2 border-white overflow-hidden' onPress={() => onPress(song)}>
    <Image source={{ uri: song.album.cover_medium }} className='flex-1' resizeMode='cover' />
    <LinearGradient colors={['transparent', '#000000']} className='flex-1 pb-2 w-full h-full justify-end absolute top-0 left-0'>
    <View className='w-full px-1'>
      <Text numberOfLines={2} className='font-bold text-white text-center'>{song.title}</Text>
      <Text numberOfLines={1} className='text-center text-gray-400'>{song.artist.name}</Text>
    </View>
    </LinearGradient>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  info: {
    marginLeft: 10,
    justifyContent: 'center',
    width:'80%'
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  artist: {
    fontSize: 14,
    color: '#666',
  },
});

export default SongTile;
