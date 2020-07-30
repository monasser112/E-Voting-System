import React from "react";
import { View, Text, StyleSheet } from "react-native";
import CandidatesList from "../Components/CandidatesList";

const CandidatesScreen = ({ navigation }) => {
  return (
    <View>
      <CandidatesList navigation={navigation} />
    </View>
  );
};

CandidatesScreen.navigationOptions = {
  headerShown: false,
};

export default CandidatesScreen;
