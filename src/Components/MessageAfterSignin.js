import React,{useState} from 'react';
import {View,StyleSheet} from 'react-native'
import {Text,Input,Button} from 'react-native-elements'

const MessageAfterSignin = ({isAuth,failAuth}) => {
    return <View>
           {isAuth!==''&&<Text>Successfull</Text>}
           {failAuth&&<Text>UnSuccefull !Try Again</Text>}
         </View>
        
}

export default MessageAfterSignin;
