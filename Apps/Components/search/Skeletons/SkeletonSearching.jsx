
import React from "react";
import ContentLoader, { Rect, Circle } from 'react-content-loader/native';
import { View, StyleSheet, Dimensions } from 'react-native';

const SkeletonSearching = () => {
  const { width } = Dimensions.get('window');
  return (
    <View style={styles.container}>
      <ContentLoader
        speed={1}
        width={width}
        height={750} // Adjust height as necessary to match your post layout
        viewBox={`0 0 ${width} 750`}
        backgroundColor="#222"
        foregroundColor="#444"
      >
        {/* Profile Picture */}
        <Circle cx="30" cy="30" r="20" />
        {/* Username */}
        <Rect x="60" y="15" rx="4" ry="4" width="120" height="10" />
        <Rect x="60" y="35" rx="3" ry="3" width="80" height="10" />
        {/* Dots */}
        <Rect x={`${width - 35}`} y="20" rx="3" ry="3" width="10" height="30" />
        </ContentLoader>
    </View>
  );
};

export default SkeletonSearching;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000', // Dark mode background color
  },
});