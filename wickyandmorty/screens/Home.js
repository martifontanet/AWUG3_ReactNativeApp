import React, { useContext } from 'react';
import { StyleSheet, FlatList, Text, TouchableOpacity, View, SafeAreaView } from 'react-native';
import PostDefault from '../components/Posts/PostDefault';
import { PostsContext } from '../utils/postContext';
import { useNavigation } from '@react-navigation/native';
import TabIcon from "../components/Basic/TabIcons";
import { useState } from 'react';

export default function Home() {
  const { posts } = useContext(PostsContext);
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.upBar}>
        {/* <Text style={styles.text}>For you | Recent | Popular</Text> */}
        <View style={styles.rightButtons}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SearchScreen')}>
            <TabIcon name="search" focused={false} rounded={true} tab={false} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('UserProfile')}>
            <TabIcon name="person" focused={false} rounded={true} tab={false} />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PostDefault style={styles.card} post={item} />}
        numColumns={2} 
        contentContainerStyle={styles.flatListContent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 10,
    backgroundColor: '#333333',
  },
  text: {
    color: 'white',
  },
  upBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // marginBottom: 10,
    // marginHorizontal: 20,
  },
  rightButtons: {
    flexDirection: 'row',
  },
  flatListContent: {
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  button: {
    marginLeft: 5,
    borderRadius: 20,
  },
  card: {
    alignItems: "flex-start"
  }
});
