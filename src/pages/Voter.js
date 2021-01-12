import React from "react";
import { AccountInformation, AvailableApplications } from "../components";
import { useHistory } from "react-router-dom";
import API from "../services/API";
import { useQuery } from "react-query";

const Voter = ({ storedAccount }) => {
  let history = useHistory();
  const { isLoading, isError, data, error } = useQuery("accountInfo", () =>
    API.get(`/accounts/${storedAccount.account}`)
  );

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
          passphrase={storedAccount.passphrase}
          address={storedAccount.account}
        />
      </div>
    </div>
  );
};

export default Voter;
