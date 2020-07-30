import React from "react";
import { useState, useContext, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Text, Input, Button } from "react-native-elements";
import { Context } from "../context/AuthContext";
import { NavigationEvents } from "react-navigation";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

const OTPScreen = ({ navigation }) => {
  const [OTPInput, setOTPInput] = useState(""); //for text input

  const { state, getOTP, hideshow } = useContext(Context);
  const input = React.createRef();

  const checkCorrectOTP = (val) => {
    getOTP(val);
    setTimeout(() => {
      hideshow();
    }, 5000);
    input.current.clear();
  };

  let texttoshow = null;

  if (state.isOTPCorrect === 0) {
    texttoshow = <View></View>;
  }

  if (state.isOTPCorrect === 1) {
    texttoshow = (
      <View style={{ marginTop: 150 }}>
        <View
          style={{
            marginVertical: 20,
            flexDirection: "row",
            justifyContent: "flex-start",
          }}
        >
          <SimpleLineIcons name="check" size={32} color="green" />
          <Text
            style={{
              fontSize: 24,
              marginLeft: 10,
              color: "green",
              fontWeight: "bold",
            }}
          >
            {" "}
            Correct!
          </Text>
        </View>
        <Button
          type="outline"
          title="Proceed"
          onPress={() => navigation.navigate("Candidates")}
        />
      </View>
    );
  }

  if (state.isOTPCorrect === 2) {
    texttoshow = (
      <View style={{ marginTop: 150 }}>
        <View
          style={{
            marginVertical: 20,
            flexDirection: "row",
            justifyContent: "flex-start",
          }}
        >
          <Feather name="x-circle" size={32} color="red" />
          <Text
            style={{
              fontSize: 24,
              marginLeft: 10,
              color: "red",
              fontWeight: "bold",
            }}
          >
            Wrong!
          </Text>
        </View>
      </View>
    );
  }

  const resetState = () => {
    setOTPInput("");
    getOTP(0);
  };

  return (
    <View style={{ marginTop: 50 }}>
      <NavigationEvents onWillBlur={() => resetState()} />
      <Text style={{ fontSize: 25, marginLeft: 10, marginBottom: 200 }}>
        Please Enter The OTP You Received{" "}
      </Text>
      <Input
        ref={input}
        placeholder="Enter Your Code Received"
        value={OTPInput}
        onChangeText={setOTPInput}
      />
      <Button
        type="outline"
        title="Check"
        onPress={() => checkCorrectOTP(OTPInput)}
      />

      {texttoshow}
    </View>
  );
};

OTPScreen.navigationOptions = {
  headerShown: false,
};

export default OTPScreen;
