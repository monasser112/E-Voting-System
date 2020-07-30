import React, { useContext } from "react";
import { View, StyleSheet, Image } from "react-native";
import { Text } from "react-native-elements";
import { Button } from "react-native-elements";
import { Context as VotingContext } from "../context/VoteContext";
import { Context as AuthContext } from "../context/AuthContext";
import testApi from "../api/test";

const CandidateInfoScreen = ({ navigation }) => {
  const id = navigation.getParam("id");
  const name = navigation.getParam("name");
  const age = navigation.getParam("age");

  const {
    state: stateFromVotingContext,
    castVote,
    checkUserHasVoted,
    checksecondtimevoting,
  } = useContext(VotingContext);
  const { state: stateFromAuthContext } = useContext(AuthContext);

  const { results, hasvoted } = stateFromVotingContext;
  const { token } = stateFromAuthContext;

  const somefunc = (id) => {
    castVoteMido({ id });
  };

  const castVoteMido = async ({ id }) => {
    try {
      const response = await testApi.post(
        "/votes",
        {
          towhom: id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      checkUserHasVoted(true);
    } catch (err) {
      checkUserHasVoted(true);

      console.log(err);
    }
  };

  let sum = 0;
  const isVoteCounterEqualsZero = () => {
    results.forEach((candidate) => (sum += candidate.vote));
    return sum;
  };
  let returnedvalue = isVoteCounterEqualsZero();

  const alreadyVoted = (
    <View
      style={{
        marginVertical: 80,
        marginHorizontal: 70,
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Text h2 style={{ marginBottom: 50, marginLeft: 25 }}>
        Your Vote have been Submitted
      </Text>
      <Button
        title="View Results"
        type="clear"
        onPress={() => navigation.navigate("VotesResults")}
      />
    </View>
  );

  let CandidateInfo = (
    <View style={styles.container}>
      <Text h4>Candidate Name:{name}</Text>
      <Image
        style={styles.image}
        source={{ uri: "https://source.unsplash.com/rU0WGGbGg4c/400x400" }}
      />
      <Text style={{ alignSelf: "center" }} h4>
        Age:{age}
      </Text>
      <Button title="Vote" type="solid" onPress={() => somefunc(id)} />
    </View>
  );
  {
    hasvoted ? (CandidateInfo = alreadyVoted) : CandidateInfo;
  }

  return CandidateInfo;
};

CandidateInfoScreen.navigationOptions = {
  headerShown: false,
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    marginHorizontal: 50,
    marginTop: 20,
  },
  image: {
    width: 250,
    height: 200,
    borderRadius: 4,
  },
});

export default CandidateInfoScreen;
