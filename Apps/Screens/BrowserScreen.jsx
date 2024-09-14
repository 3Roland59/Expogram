// screens/BrowseScreen.js
import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, ImageBackground } from 'react-native';
import { searchSongs } from '../../Utils/jiosaavn';
import SearchBar from '../Components/music/SearchBar';
import SongTile from '../Components/music/SongTile';
import { LinearGradient } from 'expo-linear-gradient';

const BrowseScreen = ({ navigation }) => {
  const [query, setQuery] = useState('');
  const [songs, setSongs] = useState([]);

  useEffect(()=>{
    handleSearch('Dreamer')
  },[])

  const handleSearch = async (val) => {
    const results = await searchSongs(val);
    setSongs(results);
  };

  const handlePress = (song) => {
    navigation.navigate('PlayerScreen', { song });
  };

  return (
    <LinearGradient start={[0.9, 0.45]}  end={[0.07, 1.03]} colors={['#000', '#000']} className='flex-1'>
    <View style={styles.container}>
      <SearchBar query={query} setQuery={setQuery} onSubmit={handleSearch} />
      {songs&&<FlatList
      numColumns={2}
        data={songs}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <SongTile song={item} onPress={handlePress} />}
      />}
    </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor:'#000000a0'
  },
});

export default BrowseScreen;
