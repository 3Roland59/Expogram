import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from "@expo/vector-icons";

export default function Tile({icon, text, todo, arrow=false}) {
  return (
    <TouchableOpacity className="p-1 py-4 flex flex-row items-center gap-4 rounded-lg" onPress={todo}>
        {icon}
        <View className="flex-1 flex flex-row items-center justify-between">
            <Text className="text-[18px] text-white">{text}</Text>
            {
              arrow && <Ionicons name='chevron-forward' size={20} color={'#fff'} />
            }
        </View>
      </TouchableOpacity>
  )
}