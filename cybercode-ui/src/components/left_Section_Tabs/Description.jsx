import React from "react";
import ExampleCard from "../ExampleCard";
import Collapsible from "../Collapsible";
// React Icons
import { TbTag } from "react-icons/tb";
import { MdLock } from "react-icons/md";
import { FaRegLightbulb } from "react-icons/fa6";

const DescriptionContent = ({ questionDetails }) => {
  return (
    <div className="p-4 space-y-8 overflow-auto h-full">
      {/* Title & Description */}
      <div className="space-y-2">
        <h2 className="text-xl text-white font-semibold">{`${questionDetails.id}. ${questionDetails.title}`}</h2>
        <div className="">{questionDetails.difficulty}</div>
        <p className="whitespace-pre-line">{questionDetails.description}</p>
      </div>

      {/* Example Image (Optional) */}
      {questionDetails.image && (
        <div>
          <img
            src={questionDetails.image}
            alt="Example Image"
            className="h-72 overflow-hidden bg-no-repeat object-cover"
          />
        </div>
      )}

      {/* Examples */}
      <div className="space-y-3">
        {questionDetails?.examples?.map((example, index) => (
          <ExampleCard key={index} exampleId={index + 1} example={example} />
        ))}
      </div>

      {/* Constraints */}
      <div>
        <p className="font-semibold">Constraints:</p>
        <ul className="list-disc mt-4 ml-4 space-y-2">
          {questionDetails?.constraints?.map((constraint, index) => {
            return (
              <li
                key={index}
                className="px-2 bg-header text-gray-300 text-sm w-fit rounded-lg border border-gray-600"
              >
                <code>{constraint}</code>
              </li>
            );
          })}
        </ul>
      </div>

      {/* T.C & S.C */}
      <div>
        <p>
          <span className="font-bold">Expected Time Complexity: </span>
          <code>{questionDetails.expectedTimeComplexity}</code>
        </p>
        <p>
          <span className="font-bold">Expected Auxiliary Space: </span>
          <code>{questionDetails.expectedSpaceComplexity}</code>
        </p>
      </div>

      {/* Collapsible Menu */}
      <div className="space-y-2">
        {/* Topics */}
        <Collapsible
          heading={"Topics"}
          icon={<TbTag />}
          contentType={"tags"}
          content={questionDetails?.tags}
          redirectLink={"/problem/tags"}
        />

        {/* Companies */}
        <Collapsible
          heading={"Companies"}
          icon={<MdLock />}
          contentType={"tags"}
          content={questionDetails?.companies}
          redirectLink={"/problem/company"}
        />

        {/* Hints */}
        {questionDetails?.hints?.map((hint, index) => (
          <Collapsible
            key={index}
            heading={`Hint ${index + 1}`}
            icon={<FaRegLightbulb />}
            content={hint}
            contentType={"text"}
          />
        ))}
      </div>

      {/* Copyright */}
      <p className="pt-4 text-xs">
        Copyright &copy; {new Date().getFullYear()} Cybercode All rights
        reserved
      </p>

      {/* ::after */}
      <div className="h-16"></div>
    </div>
  );
};

export default DescriptionContent;
