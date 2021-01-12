import React from "react";
import { AccountBox, AccountTransactions } from "../components";
import { useQuery, useMutation, useQueryClient } from "react-query";
import API from "../services/API";

const Account = ({ account, setAccount }) => {
  const queryClient = useQueryClient();
  const { isLoading, isError, data, error } = useQuery("transactions", () =>
    API.get(`/accounts/${account.account}/transactions`)
  );

  const { mutate } = useMutation(() => createAccount(), {
    onSuccess: (data) => setAccount(data)
  });

  const createAccount = async () =>
    await API.get("/accounts/create").then(({ data }) => data);

  if (isLoading) {
    return <div>isLoading...</div>;
  }

  const transactions = data && data.data.transactions.transactions;
  return (
    <div className="p-5">
      <AccountBox
        account={account}
        setAccount={setAccount}
        mutateAsync={mutate}
      />
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
