import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';
import TitleBar from '../Components/Shared/TitleBar';
import { Feather } from '@expo/vector-icons';
import MessageModal from '../Components/Shared/MessageModal';

const API_KEY = '6cmcbOsla3gzultQqL8McACFLytkVfbjY2YLhs5uGfLZDk2jmwJ6BKtf'; // Replace with your Pexels API key

const ImageBrowser = ({ navigation }) => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [messageModalVisible, setMessageModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleDataError = (message) => {
    setErrorMessage(message);
    setMessageModalVisible(true);
    setTimeout(() => {
      setMessageModalVisible(false);
    }, 3500);
  };

  const fetchImages = async (searchQuery, pageNumber = 1) => {
    try {
      setIsLoading(pageNumber === 1);
      setIsFetchingMore(pageNumber > 1);
      const response = await axios.get(`https://api.pexels.com/v1/search`, {
        params: { query: searchQuery, page: pageNumber, per_page: 20 },
        headers: {
          Authorization: API_KEY,
        },
      });
      if (pageNumber === 1) {
        setImages(response.data.photos);
      } else {
        setImages((prevImages) => [...prevImages, ...response.data.photos]);
      }
      setIsLoading(false);
      setIsFetchingMore(false);
    } catch (error) {
      // console.error(error);
      handleDataError('Network error!')
      setIsLoading(false);
      setIsFetchingMore(false);
    }
  };

  useEffect(() => {
    fetchImages('random');
  }, []);

  const handleSearch = () => {
    setPage(1);
    fetchImages(query, 1);
  };

  const loadMoreImages = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchImages(query, nextPage);
  };

  const renderFooter = () => {
    if (!isFetchingMore) return null;
    return <ActivityIndicator size="large" color="#fff" />;
  };

  return (
    <View style={styles.container}>
      <TitleBar name={'Image Explorer'} txt='' navigation={navigation} />
      <View className='flex flex-row w-full justify-center'>
      <TextInput
        style={styles.searchBar}
        placeholder="Search images..."
        placeholderTextColor={'#aaa'}
        value={query}
        onChangeText={setQuery}
      />
      <TouchableOpacity className='ml-3 p-1 w-[37px] h-[37px] justify-center items-center rounded-full bg-[#333]' onPress={()=>handleSearch()}>
        <Feather name='search' color={'#fff'} size={20} />
      </TouchableOpacity>
      </View>
      {isLoading ? (
        <View className='flex-1 justify-center items-center'>
        <ActivityIndicator size="large" color="#fff" />
        </View>
      ) : (
        <FlatList
          data={images}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          renderItem={({ item }) => (
            <View className='flex-1 flex flex-col mb-2'>
            <TouchableOpacity style={styles.imageTile} onPress={() => navigation.navigate('DisplayImage', {
              uri: item.src.original
            })}>
              <Image source={{ uri: item.src.medium }} style={styles.image} />
            </TouchableOpacity>
            <View className='flex flex-row items-center pl-2'>
              <View className='bg-[#82f] p-1 rounded-full'></View>
              <Text className='ml-2 text-white font-bold'>{item.photographer}</Text>
            </View>
              <Text className='text-[10px] ml-6 text-[#aaa]' numberOfLines={2}>{item?.alt}</Text>
            </View>
          )}
          contentContainerStyle={styles.imageList}
          onEndReached={loadMoreImages}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
        />
      )}
      <MessageModal
          messageModalVisible={messageModalVisible}
          message={errorMessage}
          height={70}
          icon="wrong"
        />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#000',
  },
  searchBar: {
    height: 40,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 16,
    marginBottom: 16,
    color: '#fff',
    backgroundColor:'#333',
    width: '85%'
  },
  imageList: {
    paddingBottom: 16,
  },
  imageTile: {
    flex: 1,
    margin: 4,
    height: 200,
    borderRadius: 8,
    overflow: 'hidden',
    borderBottomWidth:2,
    borderColor:'#fff'
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

export default ImageBrowser;
