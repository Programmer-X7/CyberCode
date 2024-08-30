
// -------------------------

import React, { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Split from "react-split";
import Editor from "@monaco-editor/react";
import LanguageSelector from "../components/LanguageSelector";
import code_snippts from "../Constants";
import TestCaseTabs from "../components/TestCaseTabs";
import TestCaseContent from "../components/TestCaseContent";
import TestResultsContent from "../components/TestResultsContent";

const ProblemSolvePage = () => {
  const [code, setCode] = useState(code_snippts["java"]);
  const [languageState, setLanguageState] = useState("java");
  const { problemId } = useParams();
  const editorRef = useRef();

  const [activeTestSection, setActiveTestSection] = useState("testCases");
  const [activeTab, setActiveTab] = useState(0);
  const [testCases, setTestCases] = useState([
    "Test Case #1: Input [1, 2, 3] - Expected Output [3, 2, 1]",
    "Test Case #2: Input [4, 5, 6] - Expected Output [6, 5, 4]",
    "Test Case #3: Input [7, 8, 9] - Expected Output [9, 8, 7]",
  ]);

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onLanguageSelect = (selectedLanguage) => {
    setLanguageState(selectedLanguage);
    setCode(code_snippts[selectedLanguage]);
  };

  const addTestCase = () => {
    setTestCases([
      ...testCases,
      `Custom Test Case #${
        testCases.length + 1
      }: Input [x, y, z] - Expected Output [z, y, x]`,
    ]);
    setActiveTab(testCases.length);
  };

  const deleteTestCase = (index) => {
    if (index >= 3) {
      const newTestCases = testCases.filter((_, i) => i !== index);
      setTestCases(newTestCases);
      setActiveTab((prev) => (prev >= newTestCases.length ? prev - 1 : prev));
    }
  };

  return (
    <div className="h-[calc(100vh-6rem)] px-3">
      <div className="h-10 p-4 text-gray-300 flex items-center justify-between">
        <div>Left</div>
        <div>Run & Submit and Timer and Note</div>
        <div>Premium and setting</div>
      </div>

      <Split
        className="flex h-full py-2"
        sizes={[30, 70]}
        minSize={200}
        gutterSize={3}
        gutterAlign="center"
        direction="horizontal"
        cursor="col-resize"
      >
        <div className="bg-gray-200 p-4 overflow-auto rounded-lg">
          <h2 className="text-xl font-semibold">Problem Title</h2>
          <p className="mt-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis
            lorem ut libero malesuada feugiat. Pellentesque in ipsum id orci
            porta dapibus. Curabitur arcu erat, accumsan id imperdiet et,
            porttitor at sem.
          </p>
        </div>

        <Split
          className="flex flex-col h-full"
          sizes={[60, 40]}
          minSize={[30, 50]}
          gutterSize={3}
          gutterAlign="center"
          direction="vertical"
          cursor="row-resize"
        >
          <div className="bg-main flex-grow overflow-hidden rounded-lg">
            <div className="text-md font-semibold bg-header text-white p-2">
              X Code
            </div>

            <LanguageSelector
              languageState={languageState}
              onLanguageSelect={onLanguageSelect}
            />

            <Editor
              height="80%"
              theme="vs-dark"
              language={languageState}
              onMount={onMount}
              value={code}
              onChange={(code) => setCode(code)}
            />
          </div>

          <div className="bg-gray-50 flex-grow overflow-hidden rounded-lg">
            <div className="flex items-center justify-between p-2 bg-header text-white">
              <div className="flex space-x-4">
                <button
                  className={`p-2 ${
                    activeTestSection === "testCases"
                      ? "text-blue-500 border-b-2 border-blue-500"
                      : "text-gray-300"
                  }`}
                  onClick={() => setActiveTestSection("testCases")}
                >
                  Test Cases
                </button>
                <button
                  className={`p-2 ${
                    activeTestSection === "testResults"
                      ? "text-blue-500 border-b-2 border-blue-500"
                      : "text-gray-300"
                  }`}
                  onClick={() => setActiveTestSection("testResults")}
                >
                  Test Results
                </button>
              </div>
            </div>

            {activeTestSection === "testCases" ? (
              <>
                <TestCaseTabs
                  testCases={testCases}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  addTestCase={addTestCase}
                  deleteTestCase={deleteTestCase}
                />
                <TestCaseContent testCases={testCases} activeTab={activeTab} />
              </>
            ) : (
              <>
                <TestCaseTabs
                  testCases={testCases}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  addTestCase={addTestCase}
                  deleteTestCase={deleteTestCase}
                />
                <TestResultsContent activeTab={activeTab} />
              </>
            )}
          </div>
        </Split>
      </Split>
    </div>
  );
};

export default ProblemSolvePage;
