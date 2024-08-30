import React, { useEffect, useRef, useState } from "react";
import useAuthStore from "../Store.js";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import Split from "react-split";
import Editor from "@monaco-editor/react";
import LanguageSelector from "../components/LanguageSelector";
import TestCaseTabs from "../components/TestCaseTabs";
import TestCaseContent from "../components/TestCaseContent";
import TestResultsContent from "../components/TestResultsContent";
import { getProblemDetailsApi } from "../api/Problem";
import {
  hasProblemStarredApi,
  starProblemApi,
  unStarProblemApi,
} from "../api/StarProblem.js";
import Description from "../components/left_Section_Tabs/Description";
import Submission from "../components/left_Section_Tabs/Submission";
import Discussion from "../components/left_Section_Tabs/Discussion";
import Notes from "../components/left_Section_Tabs/Notes";
import Tooltip from "../components/Tooltip";
// React Icons
import {
  FaBug,
  FaPlay,
  FaLock,
  FaRegStar,
  FaStar,
  FaTerminal,
} from "react-icons/fa";
import { IoMdArrowRoundBack, IoIosArrowBack } from "react-icons/io";
import { IoDocumentTextOutline } from "react-icons/io5";
import { LuAlarmClock } from "react-icons/lu";
import { CiStickyNote } from "react-icons/ci";
import { BsPlayCircle, BsPauseCircle } from "react-icons/bs";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { GrPowerReset } from "react-icons/gr";
import {
  FaShareFromSquare,
  FaCode,
  FaClockRotateLeft,
  FaRegNoteSticky,
} from "react-icons/fa6";
import { PiTerminalWindowBold } from "react-icons/pi";
import { MdFullscreen, MdOutlineMessage } from "react-icons/md";
import Divider from "../components/Divider";

const ProblemSolvePage = () => {
  const [activeDetailsTab, setActiveDetailsTab] = useState("description");
  const [questionDetails, setQuestionDetails] = useState({});
  const [code, setCode] = useState("");
  const [languageState, setLanguageState] = useState("java");

  // Fullscreen mode
  const [isFullscreen, setIsFullscreen] = useState(false);
  // Timer
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);

  // Tabs for Test Cases and Test Results
  const [activeTestSection, setActiveTestSection] = useState("testCases");
  const [activeTab, setActiveTab] = useState(0);
  const [testCases, setTestCases] = useState([]);

  // Star/Save Question
  const [isStarred, setIsStarred] = useState(false);

  const { problemId } = useParams();
  const editorRef = useRef();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);

  // Update Test Cases
  const updateTestCase = (updatedTestCase, index) => {
    const newTestCases = [...testCases];
    newTestCases[index] = updatedTestCase;
    setTestCases(newTestCases);
  };

  // Reset test cases
  const handleTestCaseReset = () => {
    setTestCases(questionDetails?.testCases);
    setActiveTab(0);
  };

  // Main Tabs
  const leftContent = {
    description: <Description questionDetails={questionDetails} />,
    submission: <Submission />,
    discussion: <Discussion />,
    notes: <Notes />,
  };

  useEffect(() => {
    // Fetch Problem
    getQuestionDetails(problemId);

    // Fetch Problem Starred Status for loggedIn users
    if (isAuthenticated) {
      fetchStarredStatus(user?.id, problemId, token);
    }
  }, [problemId]);

  // Fetch Problem
  const getQuestionDetails = async (problemId) => {
    const response = await getProblemDetailsApi(problemId);

    if (response.status === 200) {
      setQuestionDetails(response.data);
      setCode(response.data?.boilerplateCode?.java);
      setTestCases(response.data?.testCases);
    }
  };

  // Problem Starred Status check
  const fetchStarredStatus = async (userId, problemId, token) => {
    const response = await hasProblemStarredApi(userId, problemId, token);
    console.log("Note Res: ", response);

    if (response.status === 200) {
      setIsStarred(response?.data);
    }
  };

  // Handle Star/unstar
  const handleStarClick = async () => {
    if (isAuthenticated) {
      let response = null;
      if (isStarred) {
        response = await unStarProblemApi(user?.id, problemId, token);
      } else {
        response = await starProblemApi(user?.id, problemId, token);
      }

      console.log("xxx: ", response);

      if (response.status === 200) {
        setIsStarred((prev) => !prev);
      } else {
        toast.error("Something went wrong. Try again later.");
      }
    } else {
      toast.error("Please log in to save the question.");
    }
  };

  // Left Tab controll
  const handleTabChange = (tab) => {
    setActiveDetailsTab(tab);
  };

  // Timer
  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else if (!isRunning && time !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, time]);

  const formatTimer = (time) => {
    const getSeconds = `0${time % 60}`.slice(-2);
    const minutes = `${Math.floor(time / 60)}`;
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(time / 3600)}`.slice(-2);
    return `${getHours}:${getMinutes}:${getSeconds}`;
  };

  const handleTimerReset = () => {
    setTime(0);
    setIsRunning(false);
  };

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onLanguageSelect = (selectedLanguage) => {
    setLanguageState(selectedLanguage);

    setCode(questionDetails?.boilerplateCode?.[selectedLanguage]);
  };

  // Generate random id for custom test case
  const getRandomId = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  // Add Custom Test Case
  const addTestCase = () => {
    setTestCases([
      ...testCases,
      // Todo: Copy the active tab test case not hardcoded
      {
        id: getRandomId(100, 999),
        input: "0 0 0",
        output: "1",
        createdAt: new Date().toISOString(),
        example: true,
      },
    ]);
    setActiveTab(testCases.length); // Set active tab to the newly added test case
  };

  // Delete Custom Test Case
  const deleteTestCase = (index) => {
    if (index >= 3) {
      // Custom test cases start at index 3
      const newTestCases = testCases.filter((_, i) => i !== index);
      setTestCases(newTestCases);
      setActiveTab((prev) => (prev >= newTestCases.length ? prev - 1 : prev)); // Adjust active tab
    }
  };

  // Share Question link
  const copyUrlToClipboard = () => {
    const currentUrl = window.location.href;

    // Copy the URL to the clipboard
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        // Optionally, show a success message
        toast.success("URL copied to clipboard!");
      })
      .catch((err) => {
        toast.error("Failed to copy URL");
      });
  };

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!isFullscreen) {
      // Enter fullscreen mode
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        // Firefox
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        // Chrome, Safari and Opera
        document.documentElement.webkitRequestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) {
        // IE/Edge
        document.documentElement.msRequestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      // Exit fullscreen mode
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        // Firefox
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        // Chrome, Safari and Opera
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        // IE/Edge
        document.msExitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  // Customized Gutters
  const createHorizontalGutterElement = () => {
    const gutter = document.createElement("div");
    gutter.style.width = "10px";
    gutter.style.backgroundColor = "transparent";
    gutter.style.cursor = "col-resize";
    gutter.style.transition = "background-color 0.1s ease";
    gutter.style.margin = "0 3px";

    // Add hover effect
    gutter.addEventListener("mouseenter", () => {
      gutter.style.backgroundColor = "rgb(26,145,254)";
    });
    gutter.addEventListener("mouseleave", () => {
      gutter.style.backgroundColor = "transparent";
    });

    return gutter;
  };

  const createVerticalGutterElement = () => {
    const gutter = document.createElement("div");
    gutter.style.height = "10px";
    gutter.style.backgroundColor = "transparent";
    gutter.style.cursor = "row-resize";
    gutter.style.transition = "background-color 0.1s ease";
    gutter.style.margin = "3px 0";

    // Add hover effect
    gutter.addEventListener("mouseenter", () => {
      gutter.style.backgroundColor = "rgb(26,145,254)";
    });
    gutter.addEventListener("mouseleave", () => {
      gutter.style.backgroundColor = "transparent";
    });

    return gutter;
  };

  return (
    <div className="h-[calc(100vh-6.5rem)] px-3">
      {console.log(questionDetails)}
      {/* Nav Section */}
      <div className="h-12 px-2 text-gray-300 flex items-center justify-between">
        <Link
          to={`/problems`}
          className="flex items-center font-semibold rounded-md hover:bg-btn_background px-2 py-0.5"
        >
          <IoMdArrowRoundBack />
          <span className="ml-2 text-gray-100">Problem List</span>
        </Link>

        <div className="flex items-stretch space-x-0.5 group">
          {/* Debug */}
          <button
            className="px-2 rounded-l-md bg-btn hover:bg-btn_background relative"
            onClick={() => toast.error("This feature is under development")}
          >
            <FaBug className="text-premium text-sm" />
            <FaLock className="absolute bottom-1.5 right-1 text-[8px]" />
          </button>

          {/* Run */}
          <button className="flex items-center px-2 py-1 bg-btn hover:bg-btn_background">
            <FaPlay className="text-sm" />
            <span className="ml-2 font-semibold text-gray-100">Run</span>
          </button>

          {/* Submit */}
          <button className="flex items-center px-2 py-1 text-green-500 bg-btn hover:bg-btn_background">
            <AiOutlineCloudUpload className="text-xl" />
            <span className="ml-2 font-semibold">Submit</span>
          </button>

          {/* Timer */}
          <button
            className="px-2 bg-btn hover:bg-btn_background text-lg group-[.timer-active]:hidden"
            onClick={() =>
              document.querySelector(".group").classList.add("timer-active")
            }
          >
            <LuAlarmClock />
          </button>

          {/* Timer Div (shown when timer is active) */}
          <div className="hidden items-center px-2 bg-btn space-x-2 group-[.timer-active]:flex">
            <button
              className="text-lg"
              onClick={() =>
                document
                  .querySelector(".group")
                  .classList.remove("timer-active")
              }
            >
              <IoIosArrowBack />
            </button>

            <button
              className="border-gray-600"
              onClick={() => setIsRunning(!isRunning)}
            >
              {isRunning ? <BsPauseCircle /> : <BsPlayCircle />}
            </button>
            <span className="font-mono px-2 border-x-2 border-gray-600">
              {formatTimer(time)}
            </span>
            <button onClick={handleTimerReset}>
              <GrPowerReset className="" />
            </button>
          </div>

          {/* Notes */}
          <button
            className="px-2 rounded-r-md bg-btn hover:bg-btn_background text-xl"
            onClick={() => handleTabChange("notes")}
          >
            <CiStickyNote />
          </button>
        </div>

        <Link
          to={"/subscribe"}
          className="px-3 py-1 rounded-lg text-premium bg-[#2C2110] hover:bg-[#382914]"
        >
          Premium
        </Link>
      </div>

      <Split
        className="flex h-full pb-2"
        sizes={[30, 70]}
        minSize={200}
        gutterSize={3}
        gutterAlign="center"
        direction="horizontal"
        cursor="col-resize"
        gutter={createHorizontalGutterElement}
      >
        {/* Description Section */}
        <div className="bg-main rounded-lg overflow-hidden relative">
          {/* Tabs */}
          <div className="px-2 py-1.5 text-sm bg-header flex">
            <button
              className={`flex items-center space-x-1 px-2 py-1 rounded-lg hover:bg-btn_hover ${
                activeDetailsTab === "description" && "font-semibold text-white"
              }`}
              onClick={() => handleTabChange("description")}
            >
              <IoDocumentTextOutline className="text-lg text-blue-500" />{" "}
              <span>Description</span>
            </button>

            <Divider />

            <button
              className={`flex items-center space-x-1 px-2 py-1 rounded-lg hover:bg-btn_hover ${
                activeDetailsTab === "submission" && "font-semibold text-white"
              }`}
              onClick={() => handleTabChange("submission")}
            >
              <FaClockRotateLeft className="text-sm text-green-500" />
              <span>Submissions</span>
            </button>

            <Divider />

            <button
              className={`flex items-center space-x-1 px-2 py-1 rounded-lg hover:bg-btn_hover ${
                activeDetailsTab === "discussion" && "font-semibold text-white"
              }`}
              onClick={() => handleTabChange("discussion")}
            >
              <MdOutlineMessage className="text-base text-blue-500" />
              <span>Discussion</span>
            </button>

            <Divider />

            <button
              className={`flex items-center space-x-1 px-2 py-1 rounded-lg hover:bg-btn_hover ${
                activeDetailsTab === "notes" && "font-semibold text-white"
              }`}
              onClick={() => handleTabChange("notes")}
            >
              <FaRegNoteSticky className="text-base text-yellow-500" />
              <span>Notes</span>
            </button>
          </div>

          {/* Main Content */}
          {leftContent[activeDetailsTab]}

          {/* Footer */}
          <div className="flex items-center space-x-4 text-gray-400 bg-main px-4 py-2 absolute bottom-0 w-full">
            <Tooltip text="Save Question" position="right">
              <button className="hover:text-white" onClick={handleStarClick}>
                {isStarred ? (
                  <FaStar className="text-yellow-500" />
                ) : (
                  <FaRegStar />
                )}
              </button>
            </Tooltip>

            <button
              className="hover:text-white"
              onClick={() => handleTabChange("discussion")}
            >
              <MdOutlineMessage className="text-lg" />
            </button>

            <Tooltip text="Copy link" position="top">
              <button className="hover:text-white" onClick={copyUrlToClipboard}>
                <FaShareFromSquare />
              </button>
            </Tooltip>
          </div>
        </div>

        {/* Solve Section */}
        <Split
          className="flex flex-col h-full overflow-y-hidden"
          sizes={[60, 40]}
          minSize={[30, 50]}
          gutterSize={3}
          gutterAlign="center"
          direction="vertical"
          cursor="row-resize"
          gutter={createVerticalGutterElement}
        >
          {/* Code Section */}
          <div className="bg-main flex-grow overflow-hidden rounded-lg">
            <div className="flex items-center justify-between text-md font-semibold bg-header px-4 py-2">
              <div className="flex items-center space-x-2 text-white">
                <FaCode className="text-green-500 text-lg" />
                <span className="ml-2">Code</span>
              </div>
              <div>
                <Tooltip text="Fullscreen Mode" position="left">
                  <button className="text-xl" onClick={toggleFullscreen}>
                    <MdFullscreen />
                  </button>
                </Tooltip>
              </div>
            </div>

            {/* Language Selector */}
            <LanguageSelector
              languageState={languageState}
              onLanguageSelect={onLanguageSelect}
              onNoteClick={setActiveDetailsTab}
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

          {/* Test Section */}
          <div className="bg-main flex-grow overflow-hidden rounded-lg">
            {/* Tab Navigation */}
            <div className="flex items-center justify-between px-3 py-1 bg-header">
              <div className="flex space-x-2">
                <button
                  className={`flex items-center px-2 py-1 hover:bg-[#4e4d4d] rounded-lg font-semibold ${
                    activeTestSection === "testCases"
                      ? "text-gray-100"
                      : "text-gray-400"
                  }`}
                  onClick={() => setActiveTestSection("testCases")}
                >
                  <FaTerminal className="text-green-500" />
                  <span className="ml-2">TestCases</span>
                </button>
                <button
                  className={`flex items-center px-2 py-1 hover:bg-[#4e4d4d] rounded-lg font-semibold ${
                    activeTestSection === "testResults"
                      ? "text-gray-100"
                      : "text-gray-400"
                  }`}
                  onClick={() => setActiveTestSection("testResults")}
                >
                  <PiTerminalWindowBold className="text-green-500 text-lg" />
                  <span className="ml-2">Test Results</span>
                </button>
              </div>
              {/* Reset TestCases */}
              <Tooltip text="Reset testcases" position="left">
                <button className="px-2 py-1" onClick={handleTestCaseReset}>
                  <GrPowerReset />
                </button>
              </Tooltip>
            </div>

            <div className="px-4">
              {activeTestSection === "testCases" ? (
                // Test Case Tab Section
                <>
                  <TestCaseTabs
                    testCases={testCases}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    addTestCase={addTestCase}
                    deleteTestCase={deleteTestCase}
                  />
                  <TestCaseContent
                    testCases={testCases}
                    activeTab={activeTab}
                    updateTestCase={updateTestCase}
                  />
                </>
              ) : (
                // Test Results Section
                <>
                  <TestCaseTabs
                    testCases={testCases}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    addTestCase={null}
                    deleteTestCase={null}
                  />
                  <TestResultsContent
                    testCases={testCases}
                    activeTab={activeTab}
                  />
                </>
              )}
            </div>
          </div>
        </Split>
      </Split>
    </div>
  );
};

export default ProblemSolvePage;
