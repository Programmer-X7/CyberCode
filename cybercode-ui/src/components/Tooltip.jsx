import React from "react";

const Tooltip = ({ text=" ", children, position = "bottom" }) => {
  let positionClasses = "";

  switch (position) {
    case "top":
      positionClasses = "bottom-full left-1/2 transform -translate-x-1/2 mb-2";
      break;
    case "bottom":
      positionClasses = "top-full left-1/2 transform -translate-x-1/2 mt-2";
      break;
    case "left":
      positionClasses = "right-full top-1/2 transform -translate-y-1/2 mr-2";
      break;
    case "right":
      positionClasses = "left-full top-1/2 transform -translate-y-1/2 ml-2";
      break;
    default:
      positionClasses = "bottom-full left-1/2 transform -translate-x-1/2 mb-2";
  }

  return (
    <div className="relative group inline-block">
      {children}
      <div
        className={`w-fit z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none absolute whitespace-nowrap bg-gray-800 text-white text-xs py-1 px-2 rounded ${positionClasses}`}
      >
        {text}
      </div>
    </div>
  );
};

export default Tooltip;