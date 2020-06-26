import createDataContext from '../context/createDataContext'

const authReducer=(state,action)=>{

    switch(action.type){
        //  case 'reset':
        //      return {
        //          ...state,
        //          OTP:0
        //      }

        // case 'getOTPCorrect'://OTP=2 is a flag for true
        //     return {
        //         ...state,
        //         OTP:2
        //     }
        // case 'getOTPFalse'://OTP=1 is a flag for false
        //     return {
        //         ...state,
        //         OTP:1
        //     }
        case 'getOTP':
            return{
                ...state,
                isOTPCorrect:action.payload.isOTPCorrect
            }

        case 'hideshow':
            return{
                ...state,
                isOTPCorrect:0
            }

        case 'deleteTestShow':
            return{
                ...state,
                isEligible:0
            }
        case 'unAuthorizedLogin':
            return{
                ...state,
                errMsg:'Sorry You Are Not Eligible To Vote'
            }

        case'setEligibilty':
        return{
            ...state,
            isEligible:action.payload.value
        }
    
        case 'getNationalId':
            return{
                ...state,
                NationalId:action.payload.tempId,
                isEligible:action.payload.eligibleToVote,
                voterData:action.payload.userData
            }
        default:
            return state
    }
    

}





const setEligibilty=dispatch=>{
    return(value)=>{
        dispatch({type:'setEligibilty',payload:{value}})

    }
}

const hideshow=dispatch=>{
    return()=>{
        dispatch({type:'hideshow'})

    }
}


const deleteTestShow=dispatch=>{
    return()=>{
        dispatch({type:'deleteTestShow'})

    }
}

//1 true ,2 false
const getOTP=dispatch=>{
    return(otp)=>{
        const otpfromapi="1234";

        if(otp===otpfromapi){
            dispatch({type:'getOTP',payload:{isOTPCorrect:1}})
            //navigate to FingerPrintScan Screen.
        }if(otp!==otpfromapi){
            dispatch({type:'getOTP',payload:{isOTPCorrect:2}})
        }




        // const OTPFromApi="1234";
        // if(otp===OTPFromApi){
        //     dispatch({type:'getOTPCorrect'})
        // }
        // if(otp!==OTPFromApi){
        //     dispatch({type:'getOTPFalse'})
        // }
        // if(otp===0){
        //     dispatch({type:'reset'})
        // }

       
    }
}









const getNationalId=dispatch=>{
    return(tempId)=>{
       // const tempId='1234567890';
      //  const fingerPrintString="MahmoudNasser1234567890";

        const IdFromApi="123" //simulating getting National ID From Backend
        const response=[
            {
                fingerPrintString:'MahmoudNasser1234567890',
                ID:'123'
            }
        ]//simulation getting relevant data of the ID received as argument from voter input from the backend

        if(tempId===IdFromApi){
            dispatch({type:'getNationalId',payload:{tempId,userData:response,eligibleToVote:1}})
            //navigate to FingerPrintScan Screen.

        }
        if(tempId!==IdFromApi){
            dispatch({type:'getNationalId',payload:{eligibleToVote:2}})
        }
        
        //this line will be replaced in the future.
        //this function should receive an argument of NationalID then we make network request to 
        // check if this id is present or not.

        //if the id is not found we shall dispatch an error message that this id is not eligible
        //if this id is found we should get the related info to that user i.e fingerprintstring 
        // and pass it as an argument
        //with the navigate function in the signinscreen to the fingerprint scan screen 
        //and in the fingerprintScreen when the success key is true we shall call a function that will 
        //generate a string
        //we shall then compare the generated string returned from the finction whe fingerprint string passed from
        //signin screen if they are equal we shall route the this id to the voting screen.
        //if not this id will not be routed to the voting Screen.
       // dispatch({type:'getNationalId',payload:{tempId}})
    }
}




//OTP:0

export const {Provider,Context}=createDataContext(
    authReducer,
    {getNationalId,setEligibilty,deleteTestShow,getOTP,hideshow},
    {isEligible:0,NationalId:'',voterData:[],errMsg:'',isOTPCorrect:0}

)










