import React, { useContext, useState } from 'react';
import { NavLink } from "react-router-dom";
import "./NavBar.css";
import { AppContext } from '../server/AppContext';
import { useNavigate  } from 'react-router-dom';

function NavBar() {
  const[category , setCategory]=useState("");
  const { searchText , setSearchText } = useContext(AppContext);
  

  function changeHandler(event){
    setCategory(event.target.value);
  } 
  const navigate = useNavigate();
  function submitSearch(event){
    event.preventDefault();
    setSearchText(category);
    searchText?(navigate("./search")):console.log("Error0");
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">Quick News </NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" activeclassname="active" exact="true" to="/business">Business</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" activeclassname="active" exact="true" to="/entertainment">Entertainment</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" activeclassname="active" exact="true" to="/general">General</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" activeclassname="active" exact="true" to="/health">Health</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" activeclassname="active" exact="true" to="/science">Science</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" activeclassname="active" exact="true" to="/sports">Sports</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" activeclassname="active" exact="true" to="/technology">Technology</NavLink>
              </li>
            </ul>
            <form onSubmit={submitSearch} className="d-flex" role="search">
              <input onChange={changeHandler} className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
              <button  className="btn btn-outline-success" type="submit">Search</button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
