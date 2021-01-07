import React from 'react';
import { StyleSheet, Text, View, Button, StatusBar } from 'react-native';
import { DeviceMotion } from 'expo-sensors';

export default function App() {
  const [data, setData] = React.useState({});
  const [selectedDataType, setSelectedDataType] = React.useState("rotation");
  
  React.useEffect(() => {
    //Subscribe Function
    _subscribe();
    //Call Once when Screen unloads
    return () => {
      _unsubscribe(); //Unsubscribe Function
    };
  }, []);
  
  //SetInterval between listening of 2 DeviceMotion Action
  const _setInterval = () => {
    DeviceMotion.setUpdateInterval(500);
  };

  const _subscribe = () => {
    //Adding the Listener
    DeviceMotion.addListener((devicemotionData) => {      
      setData(devicemotionData[selectedDataType]);
    });
    //Calling setInterval Function after adding the listener
    _setInterval();
  };

  const _unsubscribe = () => {
    //Removing all the listeners at end of screen unload
    DeviceMotion.removeAllListeners();
  };
  
  return (
      <>
        <StatusBar hidden = {true}/>        
        <View style={styles.container}>      
          <Text style={styles.dataText}>{selectedDataType}</Text>
          <Text style={styles.dataText}>{JSON.stringify(data)}</Text>
        </View>
        <View style={styles.row}>
          <Button onPress={() => setSelectedDataType("rotation")} title="rotation"/>
          <Button onPress={() => setSelectedDataType("rotationRate")} title="rotationRate"/>
          <Button onPress={() => setSelectedDataType("orientation")} title="orientation"/>
        </View>
      </>
    ); 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row :{
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dataText: {
    fontSize: 21,
    padding: 15,
  }
});
