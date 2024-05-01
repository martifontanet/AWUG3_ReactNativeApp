import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

export default function DropdownButton({ title, options }) {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(null);

  const placeholder ={
    label: "Select a season...",
    value: null,
  };

  const handlePress = () => {
    setIsOpen(true);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.dropdown}>
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.option}
              onPress={() => {
                setIsOpen(false);
              }}>
              <Text>{option.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dropdown: {
    position: 'absolute',
    top: 50,
    right: 0,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#cccccc',
    zIndex: 1,
  },
  option: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});
