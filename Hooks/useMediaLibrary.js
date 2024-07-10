import { useEffect, useState } from "react";
import { Alert, Platform } from "react-native";
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";

const useMediaLibrary = (selectedAlbum) => {
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const requestPermission = async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission required",
          "Please grant permission to access the camera roll to use this feature.",
          [{ text: "OK" }]
        );
        setPermissionGranted(false);
        return;
      }
      setPermissionGranted(true);
    };
    requestPermission();
  }, []);

  const convertPhUriToFileUri = async (phUri) => {
    const assetInfo = await MediaLibrary.getAssetInfoAsync(phUri);
    return assetInfo.localUri || assetInfo.uri;
  };

  useEffect(() => {
    const getPhotos = async () => {
      if (permissionGranted) {
        const { assets } = await MediaLibrary.getAssetsAsync({
          album: selectedAlbum,
          mediaType: "photo",
          first: 256,
          sortBy: ["creationTime"],
        });
        const allImages = await Promise.all(
          assets.map(async (asset) => {
            const uri = Platform.OS === "ios" && asset.uri.startsWith("ph://")
              ? await convertPhUriToFileUri(asset)
              : asset.uri;
            return { id: asset.id, uri };
          })
        );
        setImages(allImages);
      }
    };

    const getVideos = async () => {
      if (permissionGranted) {
        const { assets } = await MediaLibrary.getAssetsAsync({
          album: selectedAlbum,
          mediaType: "video",
          first: 480,
          sortBy: ["creationTime"],
        });
        const allVideos = await Promise.all(
          assets.map(async (asset) => {
            const uri = Platform.OS === "ios" && asset.uri.startsWith("ph://")
              ? await convertPhUriToFileUri(asset)
              : asset.uri;
            const { localUri } = await MediaLibrary.getAssetInfoAsync(asset.id);
            return { id: asset.id, uri, localUri: localUri || asset.uri };
          })
        );
        setVideos(allVideos);
      }
    };

    getPhotos();
    getVideos();
  }, [permissionGranted, selectedAlbum]);

  return {
    images,
    videos,
    permissionGranted,
  };
};

export default useMediaLibrary;
