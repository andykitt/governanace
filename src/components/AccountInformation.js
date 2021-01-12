import React from "react";

const AccountInformation = ({ account }) => {
  return (
    <div>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">
              Voting Tokens
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">
              {account["assets"].length && account["assets"][0].amount}
            </dd>
          </div>
        </div>
      </dl>
    </div>
  );
};

export default AccountInformation;
