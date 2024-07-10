import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Modal,
  Platform,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SIZES } from "../../Utils/Constants";
import { MaterialIcons, Feather, FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import useMediaLibrary from "../../Hooks/useMediaLibrary";
import Animated from "react-native-reanimated";
import AlbumModal from "../Components/MediaLibrary/AlbumModal";
import useAlbumSelector from "../../Utils/useAlbumSelector";
import useOpacityAnimation from "../../Utils/useOpacityAnimation";
import CameraModule from "../Components/Shared/CameraModule";
import { BlurView } from "expo-blur";
import blankPhoto from "../../assets/images/blank-image.jpg";
import MessageModal, {
  handleFeatureNotImplemented,
} from "../Components/Shared/MessageModal";
// import { FontAwesome, Feather } from "@expo/vector-icons";

const MediaLibrary = ({ navigation, route }) => {
  const { initialSelectedType, selectorAvailable = true } = route.params || {};
  const blankPhotoUri = Image.resolveAssetSource(blankPhoto).uri;
  const [selectedImage, setSelectedImage] = useState([blankPhotoUri]);
  const [selectedType, setSelectedType] = useState(initialSelectedType);
  const [albumModalVisible, setAlbumModalVisible] = useState(false);
  const [cameraModalVisible, setCameraModalVisible] = useState(false);
  const [messageModalVisible, setMessageModalVisible] = useState(false);
  const [multiple, setMultiple] = useState(false);

  const { scrollY, animatedStyle } = useOpacityAnimation();
  const { allAlbums, selectedAlbum, selectedAlbumTitle, handleAlbumSelection } =
    useAlbumSelector({ setAlbumModalVisible });
  const { images, videos } = useMediaLibrary(selectedAlbum);
  const [selectorVisible, setSelectorVisible] = useState(true);

  const handleScroll = (event) => {
    scrollY.value = event.nativeEvent.contentOffset.y;

    if (event.nativeEvent.contentOffset.y < 900) {
      setSelectorVisible(true);
    } else {
      setSelectorVisible(false);
    }
  };

  useEffect(() => {
    if (images.length > 0) {
      setSelectedImage([images[0].uri]);
    }
  }, [images]);

  const handleImageSelection = (image) => {
    if (multiple) {
      if (selectedImage.includes(image.uri)) {
        setSelectedImage(remov(image.uri, selectedImage))
      } else {
        setSelectedImage([...selectedImage, image.uri])
      }
    } else {
      setSelectedImage([image.uri])
    }
    console.log(selectedImage)
  };

  // const isPart=(image, arr)=>{
  //   for(let i=0; i< arr.length;i++){
  //     if(arr[i] == image){
  //       return true
  //     }
  //   }
  //   return false
  // }
  const remov=(image, arr)=>{
    let newArr =[]
    for(let i=0; i< arr.length;i++){
      if(arr[i] !== image){
        newArr=[...newArr, arr[i]]
      }
    }
    return newArr
  }

  const handleTypeSelector = (type) => {
    setSelectedType(type);
  };

  const handleNextButton = () => {
    navigation.navigate("NewPost", { selectedImage });
  };

  const setCapturedPhoto = (photo) => {
    if (selectedType === "New post") {
      setSelectedImage([photo]);
    } else if (selectedType === "Add to story") {
      const updatedPhoto = { uri: photo, id: "123" };
      navigation.navigate("NewStory", { selectedImage: updatedPhoto });
    } else if (selectedType === "New reel") {
      const updatedVideo = { uri: photo, id: "123" };
      navigation.navigate("NewReel", { selectedImage: updatedVideo });
    }
  };

  renderItem = ({ item }) => {
    return (
      <View style={{ flex: 1, borderWidth: 2 }}>
        {selectedType === "New post" ? (
          <TouchableOpacity onPress={() => handleImageSelection(item)}>
            <View style={styles.imageContainer}>
              <Image source={{ uri: item.uri }} style={styles.image} />
              {multiple&&(
                selectedImage.includes(item.uri)?(<TouchableOpacity className='absolute top-2 right-2'>
                <FontAwesome name="circle" size={25} color={'#07f'} />
              </TouchableOpacity>):
              (<TouchableOpacity className='absolute top-2 right-2'>
                <Feather name="circle" size={25} color={'#07f'} />
              </TouchableOpacity>)
              )
              }
            </View>
          </TouchableOpacity>
        ) : selectedType === "Add to story" ? (
          <TouchableOpacity
            key={item.id}
            onPress={() =>
              navigation.navigate("NewStory", { selectedImage: item })
            }
          >
            <View style={styles.videoContainer}>
              {Platform.OS === "ios" ? (
                <Animated.Image
                  source={{ uri: item.uri }}
                  style={styles.image}
                  sharedTransitionTag={item.id.toString()}
                />
              ) : (
                <Image source={{ uri: item.uri }} style={styles.image} />
              )}
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            key={item.id}
            onPress={() =>
              navigation.navigate("NewReel", { selectedImage: item })
            }
          >
            <View style={styles.videoContainer}>
              {Platform.OS === "ios" ? (
                <Animated.Image
                  source={{ uri: item.uri }}
                  style={styles.image}
                  sharedTransitionTag={item.id.toString()}
                />
              ) : (
                <Animated.Image
                  source={{ uri: item.uri }}
                  style={styles.image}
                />
              )}
            </View>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ width: 50 }}
        >
          <MaterialIcons
            name="close"
            size={28}
            color={"#fff"}
            style={styles.iconCorrection}
          />
        </TouchableOpacity>
        <Text style={styles.headerText} className='text-center mr-4'>{selectedType}</Text>
        {selectedImage[0] !== blankPhotoUri ? (
          <View style={{ width: 50 }}>
            {selectedType === "New post" ? (
              <TouchableOpacity onPress={() => handleNextButton()}>
                <Text style={styles.nextButton}>Next</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() =>
                  handleFeatureNotImplemented(setMessageModalVisible)
                }
                style={{ alignItems: "flex-end", marginRight: 4 }}
              >
                <MaterialIcons name="settings" size={24} color={"#fff"} />
              </TouchableOpacity>
            )}
          </View>
        ) : (
          <ActivityIndicator color={'#fff'} />
        )}
      </View>
      <View style={styles.mediaContainer}>
        {selectedType === "New post" ? (
          <View style={styles.selectedImageContainer}>
            <Image
              source={{ uri: selectedImage[selectedImage.length -1] }}
              style={styles.selectedImage}
            />
          </View>
        ) : selectedType === "Add to story" ? null : null}
        <View style={styles.LibraryBarContainer}>
          <TouchableOpacity onPress={() => setAlbumModalVisible(true)}>
            <View style={styles.albunButtonContainer}>
              <Text style={styles.albunButtonText}>{selectedAlbumTitle}</Text>
              <MaterialIcons
                name="keyboard-arrow-down"
                size={20}
                color={"#fff"}
                style={styles.albunButtonIcon}
              />
            </View>
          </TouchableOpacity>
          <View className='flex flex-row justify-center items-center gap-2'>
          {selectedType === "New post"&&(<TouchableOpacity onPress={() => {setMultiple(!multiple); setSelectedImage(selectedImage.slice(0,1))}}>
            <View className='w-[35px] h-[35px] bg-white rounded-full justify-center items-center '>
              <MaterialCommunityIcons name="cards-outline" size={17} color={"#000"} />
            </View>
          </TouchableOpacity>)}
          <TouchableOpacity onPress={() => setCameraModalVisible(true)}>
            <View style={styles.cameraButtonContainer}>
              <Feather name="camera" size={17} color={"#fff"} />
            </View>
          </TouchableOpacity>
          </View>
        </View>
        <FlatList
          key={selectedType}
          data={selectedType === "New reel" ? videos : images}
          renderItem={renderItem}
          keyExtractor={(item, index) => item.id.toString()}
          numColumns={selectedType === "New post" ? 4 : 3}
          onScroll={(event) => {
            handleScroll(event);
          }}
        />

        {selectorAvailable && selectorVisible && (
          <Animated.View style={animatedStyle}>
            <BlurView
              intensity={0}
              tint="light"
              style={styles.selectorContainer}
            >
              <TouchableOpacity onPress={() => handleTypeSelector("New post")}>
                <Text
                  style={[
                    styles.selectorButton,
                    { color: selectedType === "New post" ? "#fff" : "#999" },
                  ]}
                >
                  POST
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleTypeSelector("Add to story")}
              >
                <Text
                  style={[
                    styles.selectorButton,
                    {
                      color: selectedType === "Add to story" ? "#fff" : "#999",
                    },
                  ]}
                >
                  STORY
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleTypeSelector("New reel")}>
                <Text
                  style={[
                    styles.selectorButton,
                    { color: selectedType === "New reel" ? "#fff" : "#999" },
                  ]}
                >
                  REEL
                </Text>
              </TouchableOpacity>
            </BlurView>
          </Animated.View>
        )}
        <MessageModal
          messageModalVisible={messageModalVisible}
          message={"This feature is not yet implemented."}
        />
      </View>
      <Modal
        animationType="slide"
        transparent={false}
        visible={albumModalVisible}
      >
        <AlbumModal
          setAlbumModalVisible={setAlbumModalVisible}
          handleAlbumSelection={handleAlbumSelection}
          allAlbums={allAlbums}
        />
      </Modal>
      <Modal
        animationType="slide"
        transparent={false}
        visible={cameraModalVisible}
      >
        <CameraModule
          setCameraModalVisible={setCameraModalVisible}
          setCapturedPhoto={setCapturedPhoto}
          setSelectedType={setSelectedType}
          selectedType={selectedType}
          options={true}
        />
      </Modal>
    </View>
  );
};

export default MediaLibrary;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingTop: Platform.OS=='ios'? 40: 0
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: Platform.OS === "android" ? 15 : 10,
    paddingVertical:10,
    height: 70,
  },
  headerText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 17,
    marginBottom: 2,
  },
  nextButton: {
    color: "#08f",
    fontWeight: "800",
    fontSize: 16,
    marginBottom: 2,
  },
  mediaContainer: {
    flex: 1,
  },
  selectedImageContainer: {
    height: SIZES.Width,
    width: SIZES.Width,
  },
  selectedImage: {
    flex: 1,
    aspectRatio: 1,
    overflow: "hidden",
    borderRadius: 10,
  },
  LibraryBarContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 15,
    height: 46,
  },
  albunButtonContainer: {
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center'
  },
  albunButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "800",
  },
  albunButtonIcon: {
    paddingTop: 3,
    marginLeft: 2,
  },
  cameraButtonContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    backgroundColor: "#555",
    height: 35,
    width: 35,
  },
  imageContainer: {
    flex: 1,
    margin: 0.3,
    aspectRatio: 1,
    overflow: "hidden",
  },
  videoContainer: {
    flex: 1,
    margin: 0.3,
    aspectRatio: 9 / 16,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  selectorContainer: {
    position: "absolute",
    bottom: 35,
    right: 15,
    height: 48,
    width: 240,
    borderRadius: 30,
    overflow: "hidden",
    backgroundColor: "rgba(0,0,0,0.8)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
  },
  selectorButton: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 4,
  },
});
