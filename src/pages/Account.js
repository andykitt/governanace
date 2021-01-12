import React from "react";
import { AccountBox, AccountTransactions } from "../components";
import { useQuery } from "react-query";
import API from "../services/API";

const Account = ({ account, setAccount }) => {
  const { isLoading, isError, data, error } = useQuery("transactions", () =>
    API.get(`/accounts/${account.account}/transactions`)
  );

  if (isLoading) {
    return <div>isLoading...</div>;
  }

  const transactions = data && data.data.transactions.transactions;
  return (
    <div className="p-5">
      <AccountBox account={account} setAccount={setAccount} />
      {transactions && (
        <>
          <h1 className="text-3xl font-bold tracking-tight m-5">
            Transactions
          </h1>
          <AccountTransactions transactions={transactions} />
        </>
      )}
    </div>
  );
};

export default Account;
