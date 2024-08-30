import React, { useEffect, useState } from "react";
import ProblemRow from "../components/ProblemRow.jsx";
import { getAllProblemsApi } from "../api/Problem.js";

const ProblemPage = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const getAllQuestions = async () => {
      const response = await getAllProblemsApi();

      if (response.status === 200) {
        setQuestions(response.data);
      }
    };

    getAllQuestions();
  }, []);

  return (
    <section>
      <div className="container p-2 mx-auto sm:p-4 dark:text-gray-800">
        <h2 className="mb-4 text-2xl font-semibold leading-tight">Questions</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <colgroup>
              <col className="w-1/12" />
              <col className="w-5/12" />
              <col className="w-2/12" />
              <col className="w-2/12" />
              <col className="w-2/12" />
            </colgroup>
            <thead className="dark:bg-gray-300">
              <tr className="text-left">
                <th className="p-3">Qustion No</th>
                <th className="p-3">Title</th>
                <th className="p-3">Difficulty</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {questions.map((question) => (
                <ProblemRow key={question.id} question={question} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ProblemPage;
