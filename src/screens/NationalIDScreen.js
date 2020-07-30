import React, { useState, useContext, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import { Input } from "react-native-elements";
import { NavigationEvents } from "react-navigation";
import { Context } from "../context/AuthContext";
import { Context as VotingContext } from "../context/VoteContext";

import { SimpleLineIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Button } from "react-native-elements";
import testApi from "../api/test";

const NationalIDScreen = ({ navigation }) => {
  const [InputNationalId, setInputNationalId] = useState(""); //for text input
  const [errMsg, seterrMsg] = useState("");

  const { state, getNationalId, setEligibilty, deleteTestShow } = useContext(
    Context
  );

  const { addCandidatesMido } = useContext(VotingContext);

  const input = React.createRef();

  const { token } = state;

  const candidateID = "5f12caaae4ee5d41cc4fbfdc";

  const checkYourEligibilty = (val, token) => {
    getNationalId(val, token);
    setTimeout(() => {
      deleteTestShow();
    }, 5000);
    input.current.clear();
  };

  const resetState = () => {
    setInputNationalId("");
    seterrMsg("");
    setEligibilty(false);
  };

  let testshow = null;

  if (state.isEligible === 0) {
    testshow = <View></View>;
  }
  if (state.isEligible === 1) {
    testshow = (
      <View style={{ marginTop: 50 }}>
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
            You are Elegible To Vote
          </Text>
        </View>
        <Button
          type="clear"
          title="Proceed"
          onPress={() =>
            navigation.navigate("FingerPrint", { data: state.voterData })
          }
        />
      </View>
    );
  }

  if (state.isEligible === 2) {
    testshow = (
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
            Sorry! You are not Elegible To Vote
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <NavigationEvents onWillBlur={() => resetState()} />
      <Text h3 h3Style={{ paddingLeft: 10, marginBottom: 50 }}>
        Please Enter Your National ID Number
      </Text>

      <Input
        ref={input}
        secureTextEntry
        placeholder="Enter Your ID"
        value={InputNationalId} //InputNationalId is what the user enters in the text field.
        onChangeText={setInputNationalId}
      />
      <Button
        type="clear"
        title="Check Your Eligibility"
        onPress={() => checkYourEligibilty(InputNationalId, token)}
        buttonStyle={{ marginTop: 50 }}
      />

      {testshow}
    </View>
  );
};

NationalIDScreen.navigationOptions = {
  headerShown: false,
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    justifyContent: "flex-start",
  },
});

export default NationalIDScreen;
