import React from "react";
import { useMutation } from "react-query";
import { useForm } from "react-hook-form";
import { useLocalStorage } from "../hooks/useStorage";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { postData } from "../utils/networkRequests";

const SendTransaction = () => {
  const [account, setAccount] = useLocalStorage("account");
  const { register, handleSubmit, watch, errors } = useForm();
  const sendTransaction = useMutation((data) => {
    const payload = {
      passphrase: account.passphrase,
      ...data
    };
    return postData("http://localhost:4000/api/v1/transactions", payload);
  });

  const onSubmit = (data) => {
    sendTransaction.mutateAsync(data);
  };

  if (sendTransaction.data) {
    toast(`Transaction ID - ${sendTransaction.data.transaction.id}`);
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div class="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
        <div>
          <h3 class="text-lg leading-6 font-medium text-gray-900">
            Send Transaction
          </h3>
          <p class="mt-1 max-w-2xl text-sm text-gray-500">Send a transaction</p>
        </div>
        <div class="space-y-6 sm:space-y-5">
          <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
            <label
              for="receiver"
              class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Address
            </label>
            <div class="mt-1 sm:mt-0 sm:col-span-2">
              <input
                ref={register({ required: true })}
                type="text"
                name="receiver"
                id="receiver"
                autocomplete="receiver"
                class="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
              />
              {errors.address && <span>This field is required</span>}
            </div>
          </div>

          <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
            <label for="amount" class="block text-sm font-medium text-gray-700">
              Amount
            </label>
            <div class="mt-1 relative rounded-md shadow-sm">
              <input
                ref={register({ required: true })}
                type="text"
                name="amount"
                id="amount"
                class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                placeholder="0.00"
              />
              <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span class="text-gray-500 sm:text-sm" id="price-currency">
                  Algos
                </span>
              </div>
              {errors.price && <span>This field is required</span>}
            </div>
          </div>
          <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
            <label
              for="note"
              class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Note
            </label>
            <div class="mt-1 sm:mt-0 sm:col-span-2">
              <input
                ref={register()}
                type="text"
                name="note"
                id="note"
                autocomplete="note"
                class="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="inline-flex rounded-md shadow">
            <input
              type="submit"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-500"
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default SendTransaction;
