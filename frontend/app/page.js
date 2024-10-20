"use client";

import Navbar from "./components/Navbar";
import RecipeList from "./components/RecipeList";


import { useEffect, useState } from "react";
import React from "react";
import Image from "next/image";
import SearchPage from "./pages/SearchPage";
import RecipePage from "./components/RecipeItem"
import './styles/globals.css'


export default function Home() {

    const [searchQuery, setSearchQuery] = useState(""); // Default search term is "viral"

  // Handler function to update the search query
  const updateQuery = (query) => {
    setSearchQuery(query);
  };



  return (
    <div  >

     <div>
      {/* Pass the search query and the handler to the Navbar */}
      <SearchPage searchQuery={searchQuery} onSearchChange={updateQuery}/> 

  
    </div>


    </div>
  );
}

