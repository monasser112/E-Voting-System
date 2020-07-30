import React, { useContext } from "react";
import { View, StyleSheet, Image } from "react-native";
import { Text } from "react-native-elements";
import { Context as VotingContext } from "../context/VoteContext";

const CandidateDetail = ({ candidate, totalnumvotes }) => {
  const { state } = useContext(VotingContext);

  const { results, hasvoted } = state;

  let candidatedetails = (
    <View style={{ marginVertical: 20 }}>
      <Text h4>Candidate Name:{candidate.fname}</Text>
      <Image
        style={styles.image}
        source={{ uri: "https://source.unsplash.com/rU0WGGbGg4c/400x400" }}
      />
      <Text h4>Age:{candidate.age}</Text>
      <Text style={{ fontSize: 18, color: "tomato" }}>
        Description:{candidate.description}
      </Text>
    </View>
  );

  {
    hasvoted ? (candidatedetails = null) : candidatedetails;
  }

  return candidatedetails;
};

const styles = StyleSheet.create({
  image: {
    width: 250,
    height: 200,
    borderRadius: 4,
  },
});

export default CandidateDetail;
