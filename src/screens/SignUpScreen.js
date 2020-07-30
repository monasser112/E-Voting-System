import React,{useState,useContext} from 'react';
import {View,StyleSheet} from 'react-native'
import {Text,Input,Button} from 'react-native-elements'
import {Context as AuthContext} from '../context/AuthContext'
import { NavigationEvents } from 'react-navigation';


const SignUpScreen=({navigation})=>{

    const [name,setName]=useState('')
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('')

    const {state,signup}=useContext(AuthContext);


    return <View>
         <Text>Hello From Sign UP Screen</Text>

         <Input
            secureTextEntry
            label="name"
            value={name}
            onChangeText={setName}
            autoCapitalize='none'
            autoCorrect={false}
         />
         <Button 
         title="go to signin"
         onPress={()=>navigation.navigate('Signin')} />
         <Input
            secureTextEntry
            label="email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize='none'
            autoCorrect={false}
         />
         <Input
            secureTextEntry
            label="password"
            value={password}
            onChangeText={setPassword}
            autoCapitalize='none'
            autoCorrect={false}
          />
          <Button title='sign up' onPress={()=>signup({name,email,password})}/>
    </View>
}

export default SignUpScreen;