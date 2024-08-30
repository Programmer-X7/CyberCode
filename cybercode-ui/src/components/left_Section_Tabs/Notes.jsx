import React, { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useAuthStore from "../../Store.js";
import { deleteNoteApi, getNoteApi, saveNoteApi } from "../../api/Note.js";
import toast from "react-hot-toast";
import { debounce } from "lodash";

const Notes = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const {
    originalNotes,
    userNotes,
    setOriginalNote,
    setUserNote,
    deleteOriginalAndUserNote,
  } = useAuthStore();
  const { problemId } = useParams();
  const [noteContent, setNoteContent] = useState(userNotes[problemId] || "");

  useEffect(() => {
    if (isAuthenticated) {
      // Check note on Zustand store for note for [problemId]
      if (userNotes[problemId]) {
        setNoteContent(userNotes[problemId]);
      } else {
        fetchNote(user?.id, problemId, token);
      }
    }
  }, []);

  // Fetch note
  const fetchNote = async (userId, problemId, token) => {
    const response = await getNoteApi(userId, problemId, token);

    if (response?.status === 200) {
      setNoteContent(response.data?.content);
      setUserNote(problemId, response?.data?.content);
      setOriginalNote(problemId, response?.data?.content);
    }
  };

  // Debounce the setUserNote function
  const debouncedSetUserNote = useCallback(
    debounce((problemId, value) => setUserNote(problemId, value), 300),
    []
  );

  const handleNoteChange = (e) => {
    setNoteContent(e.target.value);
    debouncedSetUserNote(problemId, e.target.value);
  };

  const handleSave = async () => {
    if (isAuthenticated) {
      const response = await saveNoteApi(token, {
        userId: user?.id,
        problemId: problemId,
        content: noteContent,
      });

      if (response?.status === 200) {
        setOriginalNote(problemId, response.data?.content);
        toast.success("Note has been saved successfully.");
      } else {
        toast.error("Something went wrong!Try again later.");
      }
    } else {
      toast("Please login to save notes");
    }
  };

  const handleDelete = async () => {
    if (isAuthenticated) {
      const response = await deleteNoteApi(token, user?.id, problemId);

      if (response?.status === 204) {
        setNoteContent("");
        deleteOriginalAndUserNote(problemId);
        toast.success("Note has been deleted successfully");
      }
    } else {
      toast("Please login to delete notes");
    }
  };

  // Handle Ctrl + S key press inside textarea
  const handleKeyDown = (e) => {
    if (e.ctrlKey && e.key === "s") {
      e.preventDefault(); // Prevent the default browser save action
      handleSave();
    }
  };

  return (
    <>
      <div className="p-2 h-full space-y-2">
        <textarea
          value={noteContent}
          onChange={handleNoteChange}
          onKeyDown={handleKeyDown}
          className="p-2 bg-transparent w-full h-3/4 outline-none resize-none"
        ></textarea>
        <div className="flex items-center space-x-2">
          <button
            disabled={originalNotes[problemId] === userNotes[problemId]}
            onClick={handleSave}
            className={`px-2 py-1 rounded-md text-sm ${
              originalNotes[problemId] === userNotes[problemId]
                ? `bg-green-700 text-gray-300`
                : `bg-green-500 text-white`
            }`}
          >
            Save
          </button>
          <button
            disabled={!originalNotes[problemId]}
            onClick={handleDelete}
            className={`px-2 py-1 rounded-md text-sm ${
              originalNotes[problemId]
                ? `bg-red-500 text-white`
                : `bg-red-800 text-gray-300`
            }`}
          >
            Delete
          </button>
        </div>
        {/* <div className="h-16"></div> */}
      </div>
    </>
  );
};

export default Notes;
