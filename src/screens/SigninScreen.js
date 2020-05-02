import React,{useState,useContext,useEffect} from 'react';
import {View,StyleSheet} from 'react-native'
import {Button} from 'react-native-elements'
import {Text} from 'react-native-elements'
import { Input } from 'react-native-elements';
import {NavigationEvents} from 'react-navigation';
import {Context} from '../context/AuthContext'
import {SimpleLineIcons} from '@expo/vector-icons';
import {Feather} from '@expo/vector-icons';


//ctrl+D find all references of a word 

const SigninScreen=({navigation})=>{
    
   // const[correctID,setCorrectID]=useState(false);
    const[InputNationalId,setInputNationalId]=useState('');//for text input
    const[errMsg,seterrMsg]=useState('');

    const {state,getNationalId,setEligibilty,deleteTestShow}=useContext(Context);

    const input = React.createRef();
    

    //input.current.focus()&&console.log('Hello rsd')

    // useEffect(()=>{
    //  getNationalId()
    // },[]);

   // const Id="1234567890";

  
   const checkYourEligibilty=(val)=>{
     getNationalId(val);
     setTimeout(() => {
      deleteTestShow();
          }, 5000);
      input.current.clear();

   }
   

    const resetState=()=>{
        setInputNationalId('');
        seterrMsg('');
        setEligibilty(false);
        

    }

    // const resetForm=()=>{
    //     setInterval(() => {
    //         seterrMsg('');
    //     }, 5000);
    // }

    // errMsg&&resetForm()




     

    let testshow=null

    if(state.isEligible===0){
      testshow=<View></View>
    }
    if(state.isEligible===1){
      testshow=<View style={{marginTop:150}}>
      <View style={{marginVertical:20,flexDirection:'row',justifyContent:'flex-start'}}>
      <SimpleLineIcons name='check' size={32} color='green'/>
       <Text style={{fontSize:24,marginLeft:10,color:'green',fontWeight:'bold'}}>You are Elegible To Vote</Text>
       

     </View>
     <Button
         type='outline' 
         title="Proceed" 
         onPress={()=>navigation.navigate('OTP',{data:state.voterData})}
         // buttonStyle={{marginTop:50}}
      />
           </View>
    }

    if(state.isEligible===2){
      testshow=<View style={{marginTop:150}}>
              <View style={{marginVertical:20,flexDirection:'row',justifyContent:'flex-start'}}>
                <Feather name="x-circle" size={32} color='red'/>
               
                <Text style={{fontSize:24,marginLeft:10,color:'red',fontWeight:'bold'}}>Sorry! You are not Elegible To Vote</Text>
              </View>
          
           </View>

    }

  //  const returnEligibleJsx=()=>{
  //      return <View style={{marginTop:150}}>
  //        <View style={{marginVertical:20,flexDirection:'row',justifyContent:'flex-start'}}>
  //        <SimpleLineIcons name='check' size={32} color='green'/>
  //         <Text style={{fontSize:24,marginLeft:20}}>You are Elegible To Vote</Text>
          

  //       </View>
  //       <Button
  //           type='outline' 
  //           title="Proceed To FingerPrint Screen" 
  //           onPress={()=>navigation.navigate('FingerPrint',{data:state.voterData})}
  //           // buttonStyle={{marginTop:50}}
  //        />
  //             </View>
  //      }
   



    return <View style={styles.container}>
          <NavigationEvents
            onWillBlur={()=>resetState()}
          
           />
         <Text h3 h3Style={{paddingLeft:10,marginBottom:50}}>Please Enter Your National ID Number</Text>
         <Input 
           ref={input}
           secureTextEntry
           placeholder='Enter Your ID'
           value={InputNationalId}//InputNationalId is what the user enters in the text field.
           onChangeText={setInputNationalId}

           />
         <Button
           type='outline' 
           title="Check Your Eligibility" 
          // onPress={InputNationalId===state.NationalId?()=>navigation.navigate('FingerPrint'):()=>seterrMsg('ID is InCorrect')}
          onPress={()=>checkYourEligibilty(InputNationalId)}

         /*
         here we should call getNationalID('what the userenterd')
         we shall pass whate the user entered.
         
         */ 
           buttonStyle={{marginTop:50}}
           />

        {/* <Button
           type='outline' 
           title="test" 
           onPress={()=>input.current.clear()}
           buttonStyle={{marginTop:50}}

           /> */}

           {testshow}
           
        
     


            
           {/* {state.isEligible?returnEligibleJsx():returnInEligibleJsx()} */}
           {/* {state.isEligible&&console.log(state.voterData)} */}
       
           {/* <Text h4 h4Style={{color:'red'}}>{errMsg}</Text> */}
          
    </View>
}

SigninScreen.navigationOptions={
    headerShown:false
}
    
const styles=StyleSheet.create({
    container:{
     
     marginTop:50,
     justifyContent:'flex-start'
    }
    
})

export default SigninScreen;