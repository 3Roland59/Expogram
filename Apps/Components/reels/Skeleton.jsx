import { View, Text } from 'react-native'
import React from 'react'
import ContentLoader, { Rect } from 'react-content-loader/native'
import { SIZES } from '../../../Utils/Constants'

export default function Skeloton() {
  return (
    <View className='bg-black '>
          <ContentLoader
            speed={1}
            width={SIZES.Width}
            height={SIZES.Height} 
            viewBox={`0 0 ${SIZES.Width} ${SIZES.Height}`}
            backgroundColor="#222"
            foregroundColor="#444"
          >
            <Rect x="0" y="0" rx="0" ry="0" width={SIZES.Width} height={SIZES.Height} />
          </ContentLoader>
          </View>
  )
}