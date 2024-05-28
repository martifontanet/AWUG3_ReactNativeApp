import { Image, View } from 'react-native';
import React from 'react';

interface AvatarProps {
    uri: string | null | undefined;
    size?: number;
}

export default function Avatar({uri, size=32}: AvatarProps) {
  const styles = {height: size, width: size, borderRadius: size, backgroundColor:"grey"};
  if (uri) return <Image source={{uri}} style={styles} />;
  return (
    <View
      style={styles}
    />
  )
}




