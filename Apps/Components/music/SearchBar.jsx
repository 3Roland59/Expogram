// components/SearchBar.js
import { Feather } from '@expo/vector-icons';
import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

const SearchBar = ({ query, setQuery, onSubmit }) => (
  <View style={styles.container}>
    <TextInput
      style={styles.input}
      placeholder="Search for songs..."
      placeholderTextColor={'#aaa'}
      value={query}
      onChangeText={setQuery}
    />
    <TouchableOpacity className='ml-3 p-1 w-[37px] h-[37px] justify-center items-center rounded-full bg-[#111]' onPress={()=>{onSubmit(query);setQuery('')}}>
      <Feather name='search' color={'#fff'} size={20} />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 10,
    paddingLeft:20,
    backgroundColor: '#333',
    borderRadius: 40,
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'
  },
  input: {
    fontSize: 18,
    width:'80%',
    color:'#fff'
  },
});

export default SearchBar;
