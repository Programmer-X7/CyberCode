import React from "react";

const TestResultsContent = ({ testCases, result, activeTab }) => {
  return (
    <div className="space-y-4">
      {/* Input */}
      {/* <div className="mt-4">
        <p className="px-2 font-semibold">Input:</p>
        <div className="bg-header h-16 overflow-auto mt-2 p-4 rounded-lg whitespace-pre-line w-full resize-none font-mono outline-none hover:ring-1 hover:ring-[rgb(26,145,254)]">
          {testCases[activeTab]}
        </div>
      </div> */}

      {/* Output */}
      <div>
        <p className="px-2 font-semibold">Output:</p>
        <div className="bg-header h-40 overflow-auto mt-2 rounded-lg whitespace-pre-line w-full resize-none font-mono outline-none hover:ring-1 hover:ring-[rgb(26,145,254)]">
          <p className="p-3">{testCases[activeTab]}</p>
        </div>
      </div>

      {/* Expectation */}
      <div>
        <p className="px-2 font-semibold">Expected Output:</p>
        <div className="bg-header h-16 overflow-auto mt-2 rounded-lg whitespace-pre-line w-full resize-none font-mono outline-none hover:ring-1 hover:ring-[rgb(26,145,254)]">
          <p className="p-3">{testCases[activeTab]}</p>
        </div>
      </div>
    </div>
  );
};

export default TestResultsContent;
