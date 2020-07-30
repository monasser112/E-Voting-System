import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import { Text, ListItem } from "react-native-elements";
import { Context as VotingContext } from "../context/VoteContext";
import { Context as AuthContext } from "../context/AuthContext";
import { Avatar } from "react-native-elements";

import testApi from "../api/test";

const VotesResultScreen = () => {
  const { state: stateFromAuthContext } = useContext(AuthContext);
  const { token } = stateFromAuthContext;

  const [results, setResults] = useState(null);

  useEffect(() => {
    async function getResults() {
      try {
        const response = await testApi.get("/result", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        setResults(response.data);
      } catch (err) {}
    }
    getResults();
  }, []);

  const resultsoutput =
    results !== null &&
    results.map((l, i) => (
      <ListItem
        key={i}
        leftAvatar={{
          source: { uri: "https://source.unsplash.com/rU0WGGbGg4c/400x400" },
        }}
        titleStyle={{ color: "tomato" }}
        title={l.user.fname}
        subtitleStyle={styles.test}
        subtitle={"Total Number of Votes:" + l.count}
        bottomDivider
      />
    ));

  return (
    <View style={{ marginTop: 30 }}>
      {results === null ? <View></View> : resultsoutput}
    </View>
  );
};

VotesResultScreen.navigationOptions = {
  headerShown: false,
};

const styles = StyleSheet.create({
  test: {
    color: "#0099ff",
  },
});

export default VotesResultScreen;
