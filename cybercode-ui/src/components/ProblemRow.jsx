import React from "react";
import { Link } from "react-router-dom";

const ProblemRow = ({ question }) => {
  return (
    <>
      <tr className="border-b border-opacity-20 dark:border-gray-300 dark:bg-gray-50">
        <td className="p-3">
          <p>{question.id}</p>
        </td>
        <td className="p-3">
          <Link to={`/problems/${question.id}`}>{question.title}</Link>
        </td>
        <td className="p-3">
          <p>{question.difficulty}</p>
        </td>
        <td className="p-3">
          <p className="dark:text-gray-600">{question.status}</p>
        </td>
        <td className="p-3 text-right">
          <Link
            to={`/problems/${question.id}`}
            className="px-3 py-1 font-semibold rounded-md dark:text-gray-50 dark:bg-blue-600"
          >
            Solve
          </Link>
        </td>
      </tr>
    </>
  );
};

export default ProblemRow;
