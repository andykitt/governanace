import React from "react";
import { sortByName } from "../utils/sorting";

const Results = ({ results, options }) => {
  return (
    <div>
      <dl
        className={`mt-5 grid grid-cols-${results.length} gap-5 sm:grid-cols-${results.length}`}
      >
        {sortByName(results).map((result, i) => (
          <div key={i} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">
                {options[i].label}
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">
                {result.value}
              </dd>
            </div>
          </div>
        ))}
      </dl>
    </div>
  );
};

export default Results;
