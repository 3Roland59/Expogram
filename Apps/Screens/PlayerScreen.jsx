// screens/PlayerScreen.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import MusicPlayer from '../Components/music/MusicPlayer';

const PlayerScreen = ({ route }) => {
  return (
    <View style={styles.container}>
      <MusicPlayer route={route} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default PlayerScreen;
