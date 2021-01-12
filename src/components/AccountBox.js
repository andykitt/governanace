import React from "react";

const AcccountBox = ({ account, mutateAsync }) => {
  return (
    <form className="space-y-8">
      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
        <label
          htmlFor="secret_key"
          className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
        >
          Your secret key
        </label>
        <div className="mt-1 sm:mt-0 sm:col-span-2">
          <textarea
            id="secret_key"
            name="secret_key"
            rows="3"
            value={account && account.passphrase}
            className="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
          ></textarea>
        </div>
      </div>
      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
        <label
          htmlFor="secret_key"
          className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
        >
          Address
        </label>
        <div className="mt-1 sm:mt-0 sm:col-span-2">
          <input
            type="text"
            name="address"
            id="address"
            value={account && account.account}
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
          />
        </div>
      </div>
      <div className="flex justify-center">
        <div className="inline-flex rounded-md shadow" onClick={mutateAsync}>
          <a
            href="#"
            className={`inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white ${
              account
                ? "bg-red-600 hover:bg-red-700"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {account ? "Create New Account" : "Create Account"}
          </a>
        </div>
      </div>
    </form>
  );
};

export default AcccountBox;
