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
        <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={data}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Select item"
            searchPlaceholder="Search..."
            value={value}
            onChange={item => {
            setValue(item.value);
            }}
            renderLeftIcon={() => (
            <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
            )}
        />
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
