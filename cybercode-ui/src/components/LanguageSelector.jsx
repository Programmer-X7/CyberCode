import React from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { language_versions } from "../Constants";
import Tooltip from "./Tooltip";
import { FaRegBookmark } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";

const languages = Object.entries(language_versions);

const LanguageSelector = ({ languageState, onLanguageSelect, onNoteClick }) => {
  // Capitalize first letter of languages to Display
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className="flex items-center justify-between px-2 py-1 mb-2 border-b border-gray-700">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md px-2 py-1 text-sm font-semibold text-gray-300 hover:bg-header">
            {capitalizeFirstLetter(languageState)} +
          </MenuButton>
        </div>

        <MenuItems
          transition
          className="absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-header shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
        >
          <div className="py-1">
            {languages.map(([language, version]) => {
              return (
                <MenuItem key={language}>
                  <button
                    className="block w-full px-4 py-2 text-left text-sm text-gray-200 data-[focus]:bg-[#414143] data-[focus]:text-white"
                    onClick={() => onLanguageSelect(language)}
                  >
                    {capitalizeFirstLetter(language)}&nbsp;
                    <span className="text-gray-400">({version})</span>
                  </button>
                </MenuItem>
              );
            })}
          </div>
        </MenuItems>
      </Menu>

      <div className="mr-2 text-base">
        <Tooltip text="Reset code" position="bottom">
          <button className="mr-4" onClick={() => onLanguageSelect(languageState)}>
            <GrPowerReset />
          </button>
        </Tooltip>
        <Tooltip text="Notes" position="bottom">
          <button onClick={() => onNoteClick("notes")} >
            <FaRegBookmark />
          </button>
        </Tooltip>
      </div>
    </div>
  );
};

export default LanguageSelector;
