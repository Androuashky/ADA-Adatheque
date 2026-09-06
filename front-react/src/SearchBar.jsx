import React from 'react';
import {useState} from 'react';
import './SearchBar.css';

function SearchBar({search, setSearch}) {
    
    return (
        <div className = "search">
        <input 
        type="text"
        placeholder='recherche' 
        value={search} 
        onChange={(e) => setSearch(e.target.value)}/>
        🔍
        </div>

    )
}

export default SearchBar
