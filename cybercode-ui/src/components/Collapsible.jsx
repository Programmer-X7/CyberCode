import React from "react";
import { Link } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";

const Collapsible = ({ heading, contentType, content, redirectLink, icon }) => {
  return (
    <div className="w-full border-b border-gray-600">
      <details className="group">
        {/* Heading */}
        <summary className="flex justify-between items-center py-2 pr-2 cursor-pointer list-none">
          <div className="flex items-center space-x-2">
            {icon}
            <h2 className="font-semibold">{heading}</h2>
          </div>
          <span className="transform group-open:rotate-180 transition-transform duration-300">
            <FaChevronDown className="text-gray-400"/>
          </span>
        </summary>

        {/* Collapsible Content */}
        <div
          className={`flex flex-wrap ${
            contentType === "tags" ? "px-4 py-2 text-xs space-x-2" : "flex-col"
          }`}
        >
          {contentType === "tags" ? (
            content?.sort().map((item, index) => (
              <Link
                key={index}
                to={`${redirectLink}/${item?.name
                  ?.toLowerCase()
                  .replace(" ", "-")}`}
                className="px-2 py-1 rounded-2xl bg-header hover:text-blue-500"
              >
                {item.name}
              </Link>
            ))
          ) : (
            <p className="px-4 py-2 text-sm text-gray-200">{content}</p>
          )}
        </div>
      </details>
    </div>
  );
};

export default Collapsible;
