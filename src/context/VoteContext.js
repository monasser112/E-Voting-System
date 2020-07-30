import createDataContext from "../context/createDataContext";
import testApi from "../api/test";
import candidateFetchApi from "../api/CandidateFetch";

const voteReducer = (state, action) => {
  switch (action.type) {
    case "CHECK_SECOND_TIME_VOTE":
      return {
        ...state,
        secondvotetime: action.payload.val,
      };

    case "CHECK_USER_HAS_VOTED":
      return {
        ...state,
        hasvoted: action.payload.val,
      };

    case "VOTE":
      return {
        ...state,
        results: action.payload,
      };
    case "setCandidatesList":
      return {
        ...state,
        results: action.payload.candidatesData,
      };

    default:
      return state;
  }
};

const getCandidates = (dispatch) => {
  return async () => {
    try {
      const response = await testApi.get("/candidates");
      dispatch({
        type: "setCandidatesList",
        payload: { candidatesData: response.data },
      });
    } catch (err) {
      console.log(err.message);
    }
  };
};

const addCandidatesMido = (dispatch) => {
  return async ({ fname, lname, vote, description, email, password, age }) => {
    try {
      const response = await testApi.post("/candidates", {
        fname,
        lname,
        vote,
        description,
        email,
        password,
        age,
      });
    } catch (err) {
      console.log(err.message);
    }
  };
};

const castVote = (dispatch) => {
  return async (id) => {
    try {
      const response = await testApi.get("/candidates");
      const results = response.data;
      const candidateIndex = results.findIndex((element) => element._id === id);
      let newArray = [...results];
      newArray[candidateIndex] = {
        ...newArray[candidateIndex],
        vote: newArray[candidateIndex].vote + 1,
      };
      dispatch({ type: "VOTE", payload: newArray });
    } catch (err) {
      console.log(err.message);
    }
  };
};

const checkUserHasVoted = (dispatch) => {
  return (val) => {
    dispatch({ type: "CHECK_USER_HAS_VOTED", payload: { val } });
  };
};

const checksecondtimevoting = (dispatch) => {
  return (val) => {
    dispatch({ type: "CHECK_SECOND_TIME_VOTE", payload: { val } });
  };
};

export const { Provider, Context } = createDataContext(
  voteReducer,
  {
    castVote,
    getCandidates,
    addCandidatesMido,
    checkUserHasVoted,
    checksecondtimevoting,
  },
  {
    results: [],
    hasvoted: false,
    secondvotetime: false,
  }
);
