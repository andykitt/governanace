import React from "react";
import { useQuery, useMutation } from "react-query";
import { VoteItem, Results } from "../components";
import API from "../services/API";

const Vote = ({ storedAccount }) => {
  const { isLoading, isError, data, error } = useQuery(
    "results",
    () => API.get("/apps/13362097/state")
    // { refetchInterval: 1000 }
  );
  const [selected, onSelect] = React.useState();
  const [voting, isVoting] = React.useState();
  const [hasVoted, setHasVoted] = React.useState(false);

  const mutation = useMutation(
    () => {
      return handleVote();
    },
    {
      onSuccess: () => {
        console.log("success");
        isVoting(false);
      }
    }
  );

  const options = [
    { id: 1, name: "Party1", color: "red" },
    { id: 2, name: "Party2", color: "blue" },
    { id: 3, name: "Party3", color: "yellow" },
    { id: 4, name: "Party4", color: "green" }
  ];

  const handleVote = async () => {
    isVoting(true);
    if (selected) {
      const data = {
        voter: storedAccount.passphrase,
        choice: selected.name.toLowerCase(),
        appID: 13362097,
        assetID: 13362110
      };

      await API.post("/vote", data)
        .then((res) => {
          console.log("res", res);
          setHasVoted(true);
        })
        .catch((e) => {
          isVoting(false);
          console.log(e);
        });
    }
  };

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  const results = data.data.state;

  return (
    <div className="flex flex-col h-screen p-5">
      <h1 className="text-3xl font-bold tracking-tight">Choose your vote</h1>
      <ul
        className="space-y-4"
        role="radiogroup"
        aria-labelledby="radiogroup-label"
      >
        {options.map((d) => (
          <div key={d.id}>
            <VoteItem
              id={d.id}
              color={d.color}
              onClick={() => onSelect(d)}
              selected={selected && selected.id === d.id}
            >
              {d.name}
            </VoteItem>
          </div>
        ))}
      </ul>
      <div className="flex items-center w-full flex-col m-5">
        {(selected || hasVoted) && (
          <div className="text-black-500">
            <p className="sm:inline">
              {hasVoted
                ? "Thank you for your vote!"
                : `You are voting for ${selected.name}`}
            </p>
          </div>
        )}
        <button
          onClick={() => mutation.mutateAsync()}
          disabled={voting || !selected}
          className="disabled:opacity-50 flex max-w-max justify-center m-5 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {hasVoted ? "Voted" : voting ? "Voting..." : "Vote"}
        </button>
      </div>
      <h1 className="text-3xl font-bold tracking-tight">Results</h1>
      <Results results={results} />
    </div>
  );
};

export default Vote;
