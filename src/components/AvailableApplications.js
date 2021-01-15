import React from "react";
import API from "../services/API";

const AvailableApplications = ({ first, second, goToVotePage, account }) => {
  const voted = (appID) =>
    account &&
    Boolean(
      account["apps-local-state"].filter(
        (app) => app.id === appID && app["key-value"]
      )[0]
    );

  const registered = (appID) =>
    account &&
    Boolean(account["apps-local-state"].filter((app) => app.id === appID)[0]);

  const votingStatusFirst = (appID) => {
    if (first.isLoading) {
      return "Registering...";
    } else if (voted(appID)) {
      return "Voted";
    } else if (registered(appID)) {
      return "Registered";
    } else {
      return "Register to vote";
    }
  };

  const votingStatusSecond = (appID) => {
    if (second.isLoading) {
      return "Registering...";
    } else if (voted(appID)) {
      return "Voted";
    } else if (registered(appID)) {
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
                  onClick={() => goToVotePage("/vote")}
                >
                  General Election
                </p>
                <div
                  className="ml-2 flex-shrink-0 flex"
                  onClick={() => first.mutateAsync()}
                >
                  <p
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      first.isLoading
                        ? "bg-yellow-300 text-black-100"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {votingStatusFirst(13362097)}
                  </p>
                </div>
              </div>
            </div>
          </a>
        </li>
        <li>
          <a href="#" className="block hover:bg-gray-50">
            <div className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <p
                  className="text-sm font-medium text-indigo-600 truncate"
                  onClick={() => goToVotePage("/vote2")}
                >
                  A Yearly Budget
                </p>
                <div
                  className="ml-2 flex-shrink-0 flex"
                  onClick={() => second.mutateAsync()}
                >
                  <p
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      second.isLoading
                        ? "bg-yellow-300 text-black-100"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {votingStatusSecond(13378903)}
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
