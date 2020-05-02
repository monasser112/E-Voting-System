import React from 'react'
import { createAppContainer} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import CandidatesScreen from './src/screens/CandidatesScreen'
import SigninScreen from './src/screens/SigninScreen'
import FingerPrintScreen from './src/screens/FingerPrintScreen'
import OTPScreen from './src/screens/OTPScreen'
import {Provider as AuthProvider}  from './src/context/AuthContext'



const navigator=createStackNavigator({
   Signin:SigninScreen,
   Candidates:CandidatesScreen,
   OTP:OTPScreen
  // FingerPrint:FingerPrintScreen for now we show OTP Screen after Authenticating The Voter.
 

},
{
  initialRouteName:'Signin'
});

const App= createAppContainer(navigator);

export default ()=>{
  return(
    <AuthProvider>
      <App />
    </AuthProvider>
  )

}