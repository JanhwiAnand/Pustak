import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
const Navbar = () => {
  let location = useLocation();
  // useEffect(()=>{
  //   console.log(location.pathname);
  // },[location])
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            Navbar
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  to="/"
                  className={`nav-link ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/about"
                  className={`nav-link ${
                    location.pathname === "/about" ? "active" : ""
                  }`}
                  aria-current="page"
                >
                  About
                </Link>
              </li>
             
            </ul>
            
               <Link to="/login" className="btn btn-primary mx-1" role="button">Login</Link>
               <Link to="/signup" className="btn btn-primary mx-1" role="button">SignUp</Link>        
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
