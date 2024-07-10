import { useState } from 'react';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { Alert, Platform } from 'react-native';

const useDownloadReel = () => {
  const [downloading, setDownloading] = useState(false);

  const downloadReel = async (uri, fileName) => {
    setDownloading(true);

    try {
      // Request permission to access media library
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission required', 'Please grant permission to access the media library to download reels.');
        setDownloading(false);
        return;
      }

      // Extract file extension from URL or use a default extension
      const extensionMatch = uri.match(/\.(\w+)(\?|$)/);
      const fileExtension = extensionMatch ? extensionMatch[1] : 'mp4';
      const fileUri = `${FileSystem.documentDirectory}${fileName}.${fileExtension}`;

      // Download the file
      const { uri: localUri } = await FileSystem.downloadAsync(uri, fileUri);

      // Save the file to the media library
      const asset = await MediaLibrary.createAssetAsync(localUri);
      let album = await MediaLibrary.getAlbumAsync('Download');

      if (!album) {
        album = await MediaLibrary.createAlbumAsync('Download', asset, false);
      } else {
        await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
      }

      Alert.alert('Download complete', 'The reel has been downloaded successfully.');
    } catch (error) {
      console.error('Download error:', error);
    } finally {
      setDownloading(false);
    }
  };

  return {
    downloadReel,
    downloading,
  };
};

export default useDownloadReel;
