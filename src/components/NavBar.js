import React from "react";
import { useHistory } from "react-router-dom";

const NavBar = () => {
  let history = useHistory();

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="sm:block sm:ml-6">
              <div className="flex space-x-4">
                <a
                  href="#"
                  className={`text-white px-3 py-2 rounded-md text-sm font-medium`}
                  onClick={() => history.push("/")}
                >
                  Account
                </a>
                <a
                  href="#"
                  className={`text-white px-3 py-2 rounded-md text-sm font-medium`}
                  onClick={() => history.push("/voter")}
                >
                  Vote
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}

      <div className="hidden sm:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1">
          <a
            href="#"
            className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Account
          </a>

          <a
            href="#"
            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Transactions
          </a>
          <a
            href="#"
            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Assets
          </a>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
