import React from "react";

const ExampleCard = ({ exampleId, example }) => {
  return (
    <div>
      <p className="font-semibold">Example&nbsp;{exampleId}</p>
      <pre className="pl-4 mt-2 border-l-2 border-gray-400">
        <code>{example}</code>
      </pre>
    </div>
  );
};

export default ExampleCard;
