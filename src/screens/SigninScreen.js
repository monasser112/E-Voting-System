import React, { useState, useContext, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { Text } from "react-native-elements";
import { Input } from "react-native-elements";
import { NavigationEvents } from "react-navigation";
import { Context } from "../context/AuthContext";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

const SigninScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const inputName = React.createRef();
  const inputEmail = React.createRef();
  const inputPassword = React.createRef();

  const { state, signin, signup } = useContext(Context);

  const { isAuth, failAuth } = state;

  const Signin = () => {
    signin({ name, email, password });
    inputName.current.clear();
    inputEmail.current.clear();
    inputPassword.current.clear();
  };

  const successSigninView = (
    <View>
      <SimpleLineIcons name="check" size={32} color="green" />
      <Text>Successfull</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text h3 h3Style={{ paddingLeft: 10, marginBottom: 50 }}>
        Please Fill the Following Fields
      </Text>
      <Input
        inputStyle={{ marginVertical: 10 }}
        ref={inputName}
        placeholder="Enter Your Name"
        value={name} //InputNationalId is what the user enters in the text field.
        onChangeText={setName}
        leftIcon={<AntDesign name="user" size={24} color="black" />}
      />
      <Input
        inputStyle={{ marginVertical: 10 }}
        ref={inputEmail}
        placeholder="Enter Your Email"
        value={email} //InputNationalId is what the user enters in the text field.
        onChangeText={setEmail}
        leftIcon={<MaterialIcons name="email" size={24} color="black" />}
      />
      <Input
        inputStyle={{ marginVertical: 10 }}
        ref={inputPassword}
        secureTextEntry
        placeholder="Enter Your Password"
        value={password} //InputNationalId is what the user enters in the text field.
        onChangeText={setPassword}
        leftIcon={<AntDesign name="lock" size={24} color="black" />}
      />

      <Button
        type="clear"
        title="Sign In"
        onPress={() => Signin()}
        buttonStyle={{ marginTop: 50 }}
      />

      {isAuth !== "" && (
        <View
          style={{
            marginVertical: 20,
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <SimpleLineIcons name="check" size={28} color="green" />
          <Text
            style={{
              fontSize: 24,
              marginLeft: 10,
              color: "green",
              fontWeight: "bold",
            }}
          >
            Successfull
          </Text>
        </View>
      )}
      {failAuth && (
        <View
          style={{
            marginVertical: 20,
            flexDirection: "row",
            justifyContent: "flex-start",
          }}
        >
          <Feather name="x-circle" size={28} color="red" />
          <Text
            style={{
              fontSize: 24,
              marginLeft: 10,
              color: "red",
              fontWeight: "bold",
            }}
          >
            UnSuccessfull!Try Again
          </Text>
        </View>
      )}
    </View>
  );
};

SigninScreen.navigationOptions = {
  headerShown: false,
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    justifyContent: "flex-start",
  },
});

export default SigninScreen;
