import React from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { VoteItem, Results } from "../components";
import API from "../services/API";

const Vote = ({ storedAccount }) => {
  const queryClient = useQueryClient();
  const { isLoading, isError, data, error } = useQuery(
    "results",
    () => API.get("/apps/13378903/state"),
    { refetchInterval: 1000 }
  );
  const [selected, onSelect] = React.useState();
  const [voting, isVoting] = React.useState();
  const [hasVoted, setHasVoted] = React.useState(false);

  const mutation = useMutation(
    () => {
      return handleVote();
    },
    {
      onSuccess: (data) => {
        isVoting(false);
        setHasVoted(true);
        queryClient.invalidateQueries("results");
      }
    }
  );

  const options = [
    { id: 1, label: "Data based decision A", name: "1", color: "red" },
    { id: 2, label: "Data based decision B", name: "2", color: "blue" },
    { id: 3, label: "Data based decision C", name: "3", color: "yellow" },
    { id: 4, label: "Data based decision D", name: "4", color: "green" }
  ];

  const people = [
    {
      id: 1,
      name: "Carole Kleine",
      image:
        "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
      id: 2,
      name: "John Smith",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
      id: 3,
      name: "Otis Rogers",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
    },
    {
      id: 4,
      name: "Jenny Harrison",
      image:
        "https://images.unsplash.com/photo-1507101105822-7472b28e22ac?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    }
  ];

  const handleVote = async () => {
    isVoting(true);
    if (selected) {
      const data = {
        voter: storedAccount.passphrase,
        choice: selected.name.toLowerCase(),
        appID: 13378903,
        assetID: 13362110
      };

      return await API.post("/vote", data)
        .then((res) => res)
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
      <div>
        <h1 class="text-3xl font-semibold tracking-tight">The Experts</h1>
        <div class="p-6 grid grid-cols-2 justify-around sm:p-12 sm:grid-cols-4">
          {people.map((p) => (
            <div class="bg-white overflow-hidden shadow rounded-lg m-2">
              <div class="flex flex-col justify-center items-center px-4 py-5 sm:p-6">
                <img class="h-8 w-8 rounded-full m-2" src={p.image} alt="" />
                <figcaption class="text-center">
                  <div class="text-indigo-500 font-medium">{p.name}</div>
                  <div class="text-gray-500">
                    Actually qualified to make decisions
                  </div>
                  <div class="text-indigo-500 hover:text-indigo-600">
                    <svg
                      class="inline"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm1 18h-2v-8h2v8zm-1-12.25c.69 0 1.25.56 1.25 1.25s-.56 1.25-1.25 1.25-1.25-.56-1.25-1.25.56-1.25 1.25-1.25z" />
                    </svg>
                  </div>
                </figcaption>
              </div>
            </div>
          ))}
        </div>
      </div>

      <h1 className="text-3xl font-bold tracking-tight my-2">
        Choose your vote
      </h1>
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
              showWhitePapers={true}
            >
              {d.label}
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
                : `You are voting for ${selected.label}`}
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
      <Results results={results} options={options} />
    </div>
  );
};

export default Vote;
