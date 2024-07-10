import { View, Text } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'

export default function TagPosts() {
  return (
    <View className='bg-black flex-1 items-center justify-center h-[40vh]'>
      <View className='w-[120px] h-[120px] items-center justify-center rounded-full border-4 border-gray-400'>
                <Ionicons name="camera-outline" size={70} color={'rgb(156 163 175)'} />
              </View>
      <Text className='m-4 text-gray-400 font-extrabold text-3xl'>No Tagged Posts</Text>
    </View>
  )
}
