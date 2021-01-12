import React from "react";
import API from "../services/API";

const AvailableApplications = ({ mutation, goToVotePage, account }) => {
  const voted =
    account &&
    Boolean(
      account["apps-local-state"].filter(
        (app) => app.id === 13362097 && app["key-value"]
      )[0]
    );

  const registered =
    account &&
    Boolean(
      account["apps-local-state"].filter((app) => app.id === 13362097)[0]
    );

  const votingStatus = () => {
    if (mutation.isLoading) {
      return "Registering...";
    } else if (voted) {
      return "Voted";
    } else if (registered) {
      return "Registered";
    } else {
      return "Register to vote";
    }
  };

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        <li>
          <a href="#" className="block hover:bg-gray-50">
            <div className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <p
                  className="text-sm font-medium text-indigo-600 truncate"
                  onClick={goToVotePage}
                >
                  General Election
                </p>
                <div
                  className="ml-2 flex-shrink-0 flex"
                  onClick={() => mutation.mutateAsync()}
                >
                  <p
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      mutation.isLoading
                        ? "bg-yellow-300 text-black-100"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {votingStatus()}
                  </p>
                </div>
              </div>
            </div>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default AvailableApplications;
