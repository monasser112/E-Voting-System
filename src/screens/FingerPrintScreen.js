import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert, Platform } from 'react-native';
import {Text} from 'react-native-elements'

import * as LocalAuthentication from 'expo-local-authentication';

export default class FingerPrintScreen extends Component {
  
  state = {
    compatible: false,
    fingerprints: false,
    successfull:false,
    result: ''
  }
  
  componentDidMount() {
   console.log(this.checkDeviceForHardware());
    console.log(this.checkForFingerprints());
  }
  
  checkDeviceForHardware = async () => {
    let compatible = await LocalAuthentication.hasHardwareAsync();
    this.setState({compatible})
  }
  
  checkForFingerprints = async () => {
    let fingerprints = await LocalAuthentication.isEnrolledAsync();
    this.setState({fingerprints})
  }
  
  scanFingerprint = async () => {
   let result = await LocalAuthentication.authenticateAsync();
   this.setState({success:result.success})

   console.log('Scan Result:', result)
  }
  
  showAndroidAlert = () => {
    Alert.alert(
      'Fingerprint Scan',
      'Place your finger over the touch sensor and press scan.',
      [
        {text: 'Scan', onPress: () => {
          this.scanFingerprint();
        }},
        {text: 'Cancel', onPress: () => console.log('Cancel'), style: 'cancel'}
      ]
    )
  }
  
  render() {

    console.log(this.props.navigation.getParam('data'));
    return (
      <View style={styles.container}>
         <View></View>
          <Text h3 h3style={styles.text}>
            Please Scan Your Finger To Continue 

           {/* {this.state.success?'SuccessFull Authentication':'UnSuccefuul Authentication Try Again !'} */}
         </Text>

        {/* <Text style={styles.text}>
        Compatible Device? {this.state.compatible === true ? 'True' : 'False' }
        </Text>
        <Text style={styles.text}>
        Fingerprings Saved? {this.state.fingerprints === true ? 'True' : 'False'}
        </Text> */}
        <TouchableOpacity onPress={Platform.OS === 'android' ? this.showAndroidAlert : this.scanFingerprint} style={styles.button}>
          <Text style={styles.buttonText}>
            SCAN
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

FingerPrintScreen.navigationOptions={
    headerShown:false
}

const styles = StyleSheet.create({
  container: {
    flex: 1,//make the container take the full height of the screen
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 20,
    backgroundColor: '#ecf0f1',
    marginTop:50,
    paddingHorizontal:25
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    height: 60,
    backgroundColor: '#056ecf',
    borderRadius: 5,
    marginBottom:100
  },
  buttonText: {
    fontSize: 30,
    color: '#fff',
    
  }
});

