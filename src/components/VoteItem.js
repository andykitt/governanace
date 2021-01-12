import React from "react";

const VoteItem = ({ id, children, onClick, color, selected }) => {
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
        {selected && (
          <div className="mt-2 flex text-sm sm:mt-0 sm:block sm:ml-4 sm:text-right">
            <div
              className={`rounded-full h-8 w-8 flex items-center justify-center bg-${color}-400`}
            ></div>
          </div>
        )}
      </div>
    </li>
  );
};

export default VoteItem;
