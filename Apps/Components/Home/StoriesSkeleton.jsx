import React from 'react';
import ContentLoader, { Rect, Circle } from 'react-content-loader/native';
import { View, StyleSheet, Dimensions } from 'react-native';

const SkeletonOthersPost = () => {
  const { width } = Dimensions.get('window');

  return (
    <View style={styles.itemContainer}>
      <ContentLoader
        speed={1}
        width={90}
        height={100}
        viewBox="0 0 90 100"
        backgroundColor="#222"
        foregroundColor="#444"
      >
        {/* Profile Picture */}
        <Circle x={8} cx="36" cy="36" r="36" />
        {/* Name */}
        <Rect x="10" y="80" rx="4" ry="4" width="70" height="10" />
      </ContentLoader>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    width: 90,
    alignItems: 'center',
  },
});

export default SkeletonOthersPost;
