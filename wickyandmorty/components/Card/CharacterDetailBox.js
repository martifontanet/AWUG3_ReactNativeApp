import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const DetailBox = ({ icon, label, value, onPress, customStyles, customStyles2, iconColor }) => {
  const Container = onPress ? Pressable : View;

  return (
    <Container onPress={onPress} style={[styles.box, customStyles]}>
      <Icon name={icon} size={30} color={iconColor} />
      <Text style={[styles.label, customStyles2]}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </Container>
  );
};

const styles = StyleSheet.create({
  box: {
    width: '40%',
    padding: 20,
    margin: 10,
    borderWidth: 1,
    borderColor: '#97CE4C',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#444444',
  },
  label: {
    fontFamily: "Inter_700Bold",
    fontSize: 16,
    color: '#97CE4C',
    marginVertical: 5,
  },
  value: {
    fontSize: 18,
    color: 'white',
  },
});

export default DetailBox;
