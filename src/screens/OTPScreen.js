import React from 'react'
import {useState,useContext,useEffect} from 'react'
import {View,StyleSheet} from 'react-native'
import {Text,Input,Button} from 'react-native-elements'
import {Context} from '../context/AuthContext'
import {NavigationEvents} from 'react-navigation';



let text=null;
const OTPScreen=({navigation})=>{
    const[OTPInput,setOTPInput]=useState('');//for text input

    const {state,getOTP}=useContext(Context);

   if(state.OTP===1){
    text=<Text>Wrong OTP Code,Try Again</Text>
   }
   if(state.OTP===0){
    text=null
   }



    const resetState=()=>{
        setOTPInput('');
        getOTP(0);
    }

    // useEffect(()=>{
    //     getOTP(OTPInput)
    // },[])

    return <View style={{marginTop:50}}>
               <NavigationEvents
                  onWillBlur={()=>resetState()}
             />
        <Text style={{fontSize:25,marginLeft:10,marginBottom:200}}>Please Enter The OTP You Received </Text>
        <Input
          value={OTPInput}//InputNationalId is what the user enters in the text field.
          onChangeText={setOTPInput}
         />
         <Button
          type='outline' 
          title="Proceed To Voting Screen" 
          onPress={()=>getOTP(OTPInput)}
           />
               {state.OTP===2&&navigation.navigate('Candidates')}

           {text}    

    </View>
}

OTPScreen.navigationOptions={
    headerShown:false
}

export default OTPScreen;