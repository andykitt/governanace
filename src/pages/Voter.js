import React from "react";
import { AccountInformation, AvailableApplications } from "../components";
import { useHistory } from "react-router-dom";
import API from "../services/API";
import { useQuery, useMutation, useQueryClient } from "react-query";

const Voter = ({ storedAccount }) => {
  const queryClient = useQueryClient();
  let history = useHistory();
  const { isLoading, isError, data, error } = useQuery("accountInfo", () =>
    API.get(`/accounts/${storedAccount.account}`)
  );

  const mutation = useMutation(
    () => {
      return register();
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("accountInfo");
      }
    }
  );

  const register = async () => {
    try {
      const data = {
        passphrase: storedAccount.passphrase,
        appID: 13362097,
        assetID: 13362110,
        amount: 1000000
      };
      await API.post("/register", data);
    } catch (e) {
      console.log("error", e);
    }
  };

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  const account = data.data.accountInfo;

  const goToVotePage = () => {
    history.push("/vote");
  };
  return (
    <div className="container mx-auto m-5">
      <div className="p-5">
        <AccountInformation account={account} />
      </div>
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
        <AvailableApplications
          goToVotePage={goToVotePage}
          account={account}
          mutation={mutation}
          address={storedAccount.account}
        />
      </div>
    </div>
  );
};

export default Voter;
