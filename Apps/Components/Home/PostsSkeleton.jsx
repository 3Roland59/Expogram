import React from 'react';
import ContentLoader, { Rect, Circle } from 'react-content-loader/native';
import { View, StyleSheet, Dimensions } from 'react-native';
import { SIZES } from '../../../Utils/Constants';

const SkeletonLoader = () => {
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

        {/* Post Image */}
        <Rect x="0" y="70" rx="5" ry="5" width={width} height={SIZES.Width * 1.1} />

        {/* Post Footer */}
        <Rect x="15" y={SIZES.Width * 1.1 + 80} rx="4" ry="4" width="25" height="25" />
        <Rect x="50" y={SIZES.Width * 1.1 + 80} rx="4" ry="4" width="25" height="25" />
        <Rect x="85" y={SIZES.Width * 1.1 + 80} rx="4" ry="4" width="25" height="25" />
        <Rect x={`${width - 40}`} y={SIZES.Width * 1.1 + 80} rx="4" ry="4" width="25" height="25" />

        {/* Likes */}
        <Rect x="15" y={SIZES.Width * 1.1 + 120} rx="4" ry="4" width="80" height="10" />

        {/* Caption */}
        <Rect x="15" y={SIZES.Width * 1.1 + 140} rx="4" ry="4" width="250" height="10" />
        <Rect x="15" y={SIZES.Width * 1.1 + 160} rx="4" ry="4" width="200" height="10" />

        {/* Comments */}
        <Rect x="15" y={SIZES.Width * 1.1 + 190} rx="4" ry="4" width="100" height="10" />
        <Rect x="15" y={SIZES.Width * 1.1 + 210} rx="4" ry="4" width="250" height="10" />

        {/* Date */}
        <Rect x="15" y={SIZES.Width * 1.1 + 240} rx="4" ry="4" width="100" height="10" />
      </ContentLoader>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000', // Dark mode background color
  },
});

export default SkeletonLoader;
