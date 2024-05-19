import React from 'react';
import { View, Text } from 'react-native';

export default function PostDetailScreen({ route }) {
  // Obtener la información de la publicación de los parámetros de navegación
  const { post } = route.params;

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>{post.title}</Text>
      <Text>{post.content}</Text>
      {/* Mostrar más detalles de la publicación aquí */}
    </View>
  );
}
