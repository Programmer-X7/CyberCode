import React from "react";
import Tooltip from "../components/Tooltip";
import { FaPlus } from "react-icons/fa6";
import { IoIosClose } from "react-icons/io";

const TestCaseTabs = ({
  testCases,
  activeTab,
  setActiveTab,
  addTestCase,
  deleteTestCase,
}) => {
  return (
    <div className="flex items-center pt-4 pb-2">
      <div className="flex space-x-4">
        {testCases.map((_, index) => (
          <div key={index} className="relative group">
            <button
              className={`px-4 py-1 hover:bg-[#464545] rounded-lg font-semibold text-sm ${
                activeTab === index
                  ? "text-white bg-[#444444]"
                  : "text-gray-400"
              }`}
              onClick={() => setActiveTab(index)}
            >
              Case {index + 1}
            </button>
            {deleteTestCase && index >= 3 && (
              <button
                className={`absolute -top-1 -right-1 text-gray-400 bg-[#363636] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                  activeTab !== index ? "hidden" : ""
                }`}
                onClick={() => deleteTestCase(index)}
              >
                <IoIosClose className="text-gray-100 text-lg" />
              </button>
            )}
          </div>
        ))}
      </div>
      {addTestCase && testCases.length < 7 && (
        <button
          className="flex items-center justify-center px-4 text-gray-500 hover:text-white"
          onClick={addTestCase}
        >
          <Tooltip text={"Add custom testcase"} position="top">
            <FaPlus className="text-sm" />
          </Tooltip>
        </button>
      )}
    </div>
  );
};

export default TestCaseTabs;
