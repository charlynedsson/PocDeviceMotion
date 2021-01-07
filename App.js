import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { DeviceMotion } from 'expo-sensors';

export default function App() {
  const [name, setName] = React.useState("There");
  
  const _handleOnPress = function () {
    name === "There" ? setName("Again") : setName("There");    
  }
  
  return (
      <View style={styles.container}>
        <Text style={styles.nameText}>Hello {name}</Text>
        <Button color='#4169E1' onPress={() => {_handleOnPress()}} title='Click me'> </Button>
      </View>
    ); 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameText: {
    fontSize: 50,
    padding: 15,
  }
});
