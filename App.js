import React from 'react'
import { createAppContainer} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import CandidatesScreen from './src/screens/CandidatesScreen'
import NationalIDScreen from './src/screens/NationalIDScreen'
import FingerPrintScreen from './src/screens/FingerPrintScreen'
import SigninScreen from './src/screens/SigninScreen'
import OTPScreen from './src/screens/OTPScreen'
import {Provider as AuthProvider}  from './src/context/AuthContext'
import {Provider as VotingProvider} from './src/context/VoteContext'
import SignUpScreen from './src/screens/SignUpScreen'

import {setNavigator} from './src/navigationRef'
import CandidateInfoScreen from './src/screens/CandidateInfoScreen';
import VotesResultsScreen from './src/screens/VotesResultsScreen'

const navigator=createStackNavigator({
   Signup:SignUpScreen,
   Signin:SigninScreen,
   NationalID:NationalIDScreen,
   Candidates:CandidatesScreen,
   OTP:OTPScreen,
   FingerPrint:FingerPrintScreen,
   CandidateInfo:CandidateInfoScreen,
   VotesResults:VotesResultsScreen
 

},
{
  initialRouteName:'Signin'
});

const App= createAppContainer(navigator);

export default ()=>{
  return(
   <AuthProvider>
    <VotingProvider>
         <App ref={(navigator)=>setNavigator(navigator)}/>
    </VotingProvider>
    </AuthProvider>
  )

}