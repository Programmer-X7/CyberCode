import React, { useEffect, useState } from "react";

const TestCaseContent = ({ testCases, activeTab, updateTestCase }) => {
  const [content, setContent] = useState();

  useEffect(() => {
    setContent(testCases[activeTab]?.input || "");
  }, [testCases, activeTab]);

  const handleChange = (e) => {
    const updatedInput = e.target.value;
    setContent(updatedInput);

    // Update the parent component's state
    const updatedTestCase = { ...testCases[activeTab], input: updatedInput };
    updateTestCase(updatedTestCase, activeTab);
  };

  return (
    <textarea
      id={content?.id}
      rows={5}
      autoComplete="off"
      value={content}
      onChange={handleChange}
      className="bg-header mt-2 p-4 rounded-lg whitespace-pre-line w-full resize-none font-mono outline-none hover:ring-1 hover:ring-[rgb(26,145,254)] focus:outline-none focus:ring-1 focus:ring-[rgb(26,145,254)]"
    >
    </textarea>
  );
};

export default TestCaseContent;
