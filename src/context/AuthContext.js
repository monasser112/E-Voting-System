import createDataContext from "../context/createDataContext";
import testApi from "../api/test";
import { navigate } from "../navigationRef";

const authReducer = (state, action) => {
  switch (action.type) {
    case "reset":
      return {
        ...state,
      };

    case "signin":
      return {
        ...state,
        isAuth: action.payload,
        failAuth: false,
        token: action.payload,
      };
    case "failsignin":
      return {
        ...state,
        failAuth: true,
        isAuth: "",
      };
    case "getOTP":
      return {
        ...state,
        isOTPCorrect: action.payload.isOTPCorrect,
      };

    case "hideshow":
      return {
        ...state,
        isOTPCorrect: 0,
      };

    case "deleteTestShow":
      return {
        ...state,
        isEligible: 0,
      };
    case "unAuthorizedLogin":
      return {
        ...state,
        errMsg: "Sorry You Are Not Eligible To Vote",
      };

    case "setEligibilty":
      return {
        ...state,
        isEligible: action.payload.value,
      };

    case "getNationalId":
      return {
        ...state,
        NationalId: action.payload.tempId,
        isEligible: action.payload.eligibleToVote,
        voterData: action.payload.userData,
      };
    default:
      return state;
  }
};

const signup = (dispatch) => {
  return async ({ name, email, password }) => {
    try {
      const response = await testApi.post("/users", { name, email, password }); //name,email,password
      console.log(response);
    } catch (err) {
      console.log(err.message);
    }
  };
};

const signin = (dispatch) => {
  return async ({ name, email, password }) => {
    try {
      const response = await testApi.post("/users/login", {
        name,
        email,
        password,
      }); //name,email,password
      console.log(response.data.token);
      dispatch({ type: "signin", payload: response.data.token });
      setTimeout(() => {
        navigate("NationalID");
      }, 500);
      //navigate('NationalID')
    } catch (err) {
      dispatch({ type: "failsignin" });
      console.log(err.message);
    }
  };
};

const resetState = (dispatch) => {
  return (value) => {
    dispatch({ type: "reset" });
  };
};

const setEligibilty = (dispatch) => {
  return (value) => {
    dispatch({ type: "setEligibilty", payload: { value } });
  };
};

const hideshow = (dispatch) => {
  return () => {
    dispatch({ type: "hideshow" });
  };
};

const deleteTestShow = (dispatch) => {
  return () => {
    dispatch({ type: "deleteTestShow" });
  };
};

const getOTP = (dispatch) => {
  return (otp) => {
    const otpfromapi = "1234";

    if (otp === otpfromapi) {
      dispatch({ type: "getOTP", payload: { isOTPCorrect: 1 } });
    }
    if (otp !== otpfromapi) {
      dispatch({ type: "getOTP", payload: { isOTPCorrect: 2 } });
    }
  };
};

const getNationalId = (dispatch) => {
  return async (tempId, token) => {
    let Idfrombackend = "";

    try {
      const response = await testApi.post(
        "/users/nationalId",
        {
          NationalID: `${tempId}`,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Idfrombackend = response.data.user[0].NationalID;
    } catch (err) {}

    if (tempId === Idfrombackend) {
      dispatch({
        type: "getNationalId",
        payload: { tempId, eligibleToVote: 1 },
      });
    }
    if (tempId !== Idfrombackend) {
      dispatch({ type: "getNationalId", payload: { eligibleToVote: 2 } });
    }
  };
};

//OTP:0

export const { Provider, Context } = createDataContext(
  authReducer,
  {
    getNationalId,
    setEligibilty,
    deleteTestShow,
    getOTP,
    hideshow,
    signup,
    signin,
  },
  {
    isEligible: 0,
    NationalId: "",
    voterData: [],
    errMsg: "",
    isOTPCorrect: 0,
    isAuth: "",
    failAuth: false,
    token: "",
  }
);
