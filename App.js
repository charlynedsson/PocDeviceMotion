import React from 'react';
import { StyleSheet, Text, View, Button, StatusBar } from 'react-native';
import { DeviceMotion } from 'expo-sensors';

export default function App() {
  const [rotation, setRotation] = React.useState({});  
  const [rotationRate, setRotationRate] = React.useState({});  
  
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
    DeviceMotion.setUpdateInterval(77);
  };

  const _subscribe = () => {
    //Adding the Listener
    DeviceMotion.addListener((devicemotionData) => {      
      const rotation = devicemotionData.rotation ?? { "gamma": 0, "alpha": 0, "beta": 0 };
      const rotationRate = devicemotionData.rotationRate ?? { "gamma": 0, "alpha": 0, "beta": 0 };
      setRotation(rotation);
      setRotationRate(rotationRate);
    });
    //Calling setInterval Function after adding the listener
    _setInterval();
  };

  const _unsubscribe = () => {
    //Removing all the listeners at end of screen unload
    DeviceMotion.removeAllListeners();
  };
  
  let { rotationGamma, rotationAlpha, rotationBeta } = rotation;
  rotationGamma = round(rotationGamma);
  rotationAlpha = round(rotationAlpha);
  rotationBeta = round(rotationBeta);

  let { rotationRateGamma, rotationRateAlpha, rotationRateBeta } = rotationRate;
  rotationRateGamma = Math.round(rotationRateGamma);
  rotationRateAlpha = Math.round(rotationRateAlpha);
  rotationRateBeta = Math.round(rotationRateBeta);
  
  return (
      <>           
        <View style={styles.container}>      
          <Text style={styles.dataLabel}>rotation</Text>          
          <Text style={styles.dataText}>g:{rotationGamma} a:{rotationAlpha} b:{rotationBeta}</Text>
    
          <Text style={styles.dataLabel}>rotationRate</Text>          
          <Text style={styles.dataText}>g:{rotationRateGamma} a:{rotationRateAlpha} b:{rotationRateBeta}</Text>
        </View>
      </>
    ); 
}

function round(n) {
  if (!n) {
    return 0;
  }

  return Math.floor(n * 100) / 100;
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
  dataLabel: {
    fontSize: 21,
    opacity: 0.6,
  },
  dataText: {
    fontSize: 21,
    padding: 15,
  }
});
