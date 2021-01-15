import React from "react";

const VoteItem = ({
  id,
  children,
  onClick,
  color,
  selected,
  showWhitePapers
}) => {
  return (
    <li
      onClick={onClick}
      id={id}
      tabIndex="-1"
      role="radio"
      aria-checked="false"
      className={`group relative bg-white rounded-lg shadow-sm cursor-pointer focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-${color}-500`}
    >
      <div className="rounded-lg border border-gray-300 bg-white px-6 py-4 hover:border-gray-400 sm:flex sm:justify-between">
        <div className="flex items-center">
          <div className="text-sm">
            <p className="font-medium text-gray-900">{children}</p>
            <div className="text-gray-500">
              <p className="sm:inline">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>
          </div>
        </div>
        {selected && !showWhitePapers && (
          <div className="mt-2 flex text-sm sm:mt-0 sm:block sm:ml-4 sm:text-right">
            <div
              className={`rounded-full h-8 w-8 flex items-center justify-center bg-${color}-400`}
            ></div>
          </div>
        )}
        {showWhitePapers && (
          <div class="ml-5 flex-shrink-0 hover:text-indigo-600 text-gray-500 items-center">
            <span class="text-sm font-semibold tracking-tight m-2">
              View the whitepaper
            </span>
            <svg
              class="inline"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M11.362 2c4.156 0 2.638 6 2.638 6s6-1.65 6 2.457v11.543h-16v-20h7.362zm.827-2h-10.189v24h20v-14.386c0-2.391-6.648-9.614-9.811-9.614zm4.811 13h-10v-1h10v1zm0 2h-10v1h10v-1zm0 3h-10v1h10v-1z" />
            </svg>
          </div>
        )}
      </div>
    </li>
  );
};

export default VoteItem;
