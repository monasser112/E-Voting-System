import React, { useContext, useEffect } from "react";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { Text, Button } from "react-native-elements";
import { Context as VotingContext } from "../context/VoteContext";
import { withNavigation } from "react-navigation";
import CandidateDetail from "./CandidateDetail";

const CandidatesList = ({ navigation }) => {
  const { state, getCandidates } = useContext(VotingContext);

  useEffect(() => {
    getCandidates();
  }, []);

  const { results, hasvoted } = state;

  let sum = 0;
  const isVoteCounterEqualsZero = () => {
    results.forEach((candidate) => (sum += candidate.vote));
    return sum;
  };
  let returnedvalue = isVoteCounterEqualsZero();

  const Message_Before_Voting = <Text h3>Candidates</Text>;
  const Message_After_Voting = (
    <View style={{ marginTop: 250 }}>
      <Text h3 style={{ color: "green", alignSelf: "flex-end" }}>
        You Have Already Voted
      </Text>
      <Button
        title="View Results"
        type="clear"
        onPress={() => navigation.navigate("VotesResults")}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      {hasvoted ? Message_After_Voting : Message_Before_Voting}

      <FlatList
        showsHorizontalScrollIndicator={false}
        vertical
        data={results}
        keyExtractor={(candidate) => candidate._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("CandidateInfo", {
                name: item.fname,
                age: item.age,
                image_url: "https://source.unsplash.com/rU0WGGbGg4c/400x400",
                id: item._id,
              })
            }
          >
            <CandidateDetail
              style={{ flex: 1, paddingHorizontal: 15, paddingVertical: 26 }}
              candidate={item}
              totalnumvotes={returnedvalue}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 25,
  },
  CandidateContainer: {
    paddingHorizontal: 15,
    paddingVertical: 26,
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignSelf: "center",
  },
});

export default CandidatesList;
