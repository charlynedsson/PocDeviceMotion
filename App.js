import React from 'react';
import { StyleSheet, Text, View, Button, StatusBar } from 'react-native';
import { DeviceMotion } from 'expo-sensors';

export default function App() {
  const [rotation, setRotation] = React.useState({ "gamma": 0, "alpha": 0, "beta": 0 });  
  const [rotationRate, setRotationRate] = React.useState({ "gamma": 0, "alpha": 0, "beta": 0 });  
  const [counter, setCounter] = React.useState(0);
  const [status, setStatus] = React.useState(0);
  
  React.useEffect(() => {
    //Subscribe Function
    _subscribe();
    //Call Once when Screen unloads
    return () => {
      _unsubscribe(); //Unsubscribe Function
    };
  }, []);
  
  React.useEffect(() => {
    if(rotationRate.beta >= 100 && rotation.gamma >=  2.355) {       
       setCounter(counter + 1);
       setStatus(1);
       setTimeout(function(){ setStatus(0); }, 500);
    } else if (rotationRate.beta <= -100 && rotation.gamma <=  0.785) {       
       setCounter(counter - 1);      
       setStatus(2);
       setTimeout(function(){ setStatus(0); }, 500);
    }
  }, [rotationRate]);
  
  //SetInterval between listening of 2 DeviceMotion Action
  const _setInterval = () => {
    DeviceMotion.setUpdateInterval(100);
  };

  const _subscribe = () => {
    //Adding the Listener
    DeviceMotion.addListener((devicemotionData) => {      
      let rotation = devicemotionData.rotation ?? { "gamma": 0, "alpha": 0, "beta": 0 };
      let rotationRate = devicemotionData.rotationRate ?? { "gamma": 0, "alpha": 0, "beta": 0 };
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

  const backGroundColorSelector = (state) => {
    if(state == 1)
      return { backgroundColor: 'green'}    
    else if (state == 2)
      return { backgroundColor: 'red'}
    else
      return { backgroundColor: 'white'}
  };
  
  let rotationGamma = rotation.gamma.toPrecision(4);
  let rotationAlpha = rotation.alpha.toPrecision(4);
  let rotationBeta = rotation.beta.toPrecision(4);

  let rotationRateGamma = Math.round(rotationRate.gamma);
  let rotationRateAlpha = Math.round(rotationRate.alpha);
  let rotationRateBeta = Math.round(rotationRate.beta);

  return (
      <>           
        <View style={[styles.container, backGroundColorSelector(status)]}>
          <Text style={styles.dataLabel}>counter</Text>       
          <Text style={styles.dataText}>{counter}</Text>
          <Text style={styles.dataLabel}>status</Text>
          <Text style={styles.dataText}>{status}</Text>
          <Text style={styles.dataLabel}>rotation</Text>          
          <Text style={styles.dataText}>g:{rotationGamma} a:{rotationAlpha} b:{rotationBeta}</Text>    
          <Text style={styles.dataLabel}>rotationRate</Text>          
          <Text style={styles.dataText}>g:{rotationRateGamma} a:{rotationRateAlpha} b:{rotationRateBeta}</Text>          
        </View>
      </>
    ); 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
