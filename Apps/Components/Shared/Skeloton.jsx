import { View, Text } from 'react-native'
import React from 'react'
import ContentLoader, { Rect } from 'react-content-loader/native'
import { SIZES } from '../../../Utils/Constants'
import { MaterialCommunityIcons } from '@expo/vector-icons'

export default function Skeloton() {
  return (
    <View className='bg-black border border-black'>
          <ContentLoader
            speed={1}
            width={SIZES.Width*0.333}
            height={SIZES.Width*0.333} 
            viewBox={`0 0 ${SIZES.Width*0.333} ${SIZES.Width*0.333}`}
            backgroundColor="#222"
            foregroundColor="#444"
          >
            <View className='absolute top-2 right-2'>
              <MaterialCommunityIcons name='card-multiple' size={24} color={'#fff'} />
              </View>
            <Rect x="0" y="0" rx="0" ry="0" width={SIZES.Width*0.333} height={SIZES.Width * 0.333} />
          </ContentLoader>
          </View>
  )
}