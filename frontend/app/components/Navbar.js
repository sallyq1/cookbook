"use client";

import React, { useState, useEffect, useRef, useContext } from "react";

import { PlusIcon, DropdownArrow, FiltersIcon, SearchIcon } from "@/app/assets";

import { SearchContext } from '../context/SearchContext';  // Import SearchContext



const Navbar = () => {

  const { searchQuery, handleSearchChange, handleNavbarClick, handleInputChange, inputRef  } = useContext(SearchContext);

  const [tempValue, setTempValue] = useState(""); // Default search term is "viral"



  // Handler for key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearchChange(tempValue); // Trigger the search on Enter key press
    }
  };

  // Hide dropdown when typing starts
  const handleInputChangeLocal = (e) => {
    setTempValue(e.target.value);
    handleInputChange();

    
    // if (inputRef.current) {
    //   inputRef.current.value = tempValue;  // Update the inputRef value
    // }
  };


  return (
    <div
      className=" h-24 flex items-center px-16 py-10 justify-between shadow-[0px_4px_100px_0px_#e3e3e3]"
    >
      <div className="logo">COOKBOOK</div>

      <div
        className="relative flex w-3/5 h-9 items-center p-6  bg-[#F1F1F1] hover:bg-[#e7e7e7] rounded-full"
        onClick={handleNavbarClick}
      >
        <SearchIcon className="scale-90 h-6 w-7 " />

        <input
          type="text"
          placeholder="Search"
          className="ml-2"
          value={tempValue}
          ref={inputRef}
          onChange={(e) => handleInputChangeLocal(e)}
          onKeyDown={handleKeyPress}
        />
        
      </div>

     
      <button className=" px-4 py-3 rounded-xl mr-3 ml-3 ">
        <FiltersIcon className="" />
      </button>

      <button className="bg-black py-2 px-4 h-12 text-white flex justify-center items-center rounded-xl">
        <PlusIcon className="mr-3 scale-75" />
        Create
      </button>

      <div className="profilepic"></div>

      <button>
        <DropdownArrow className="ml-3" />
      </button>
    </div>
  );
};

export default Navbar;
