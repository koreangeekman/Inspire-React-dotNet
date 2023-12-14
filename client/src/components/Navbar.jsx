import React from "react";
import "../assets/scss/components/Navbar.scss"
import Login from "./Login.jsx";
import { Link } from "react-router-dom";
import logo from '../assets/img/powersymbol2048.png';
import BGImgWidget from "./widgets/BGImgWidget.jsx";
import ClockWidget from "./widgets/ClockWidget.jsx";
import WeatherWidget from "./widgets/Weather/WeatherWidget.jsx";

export function Navbar() {
  
  return (
    <nav className="navbar navbar-expand-lg navbar-dark shadow bg-dark px-3">
      <Link className="navbar-brand d-flex" to={''}>
        <div className="d-flex flex-column align-items-center">
          <img alt="logo" src={logo} height="50" />
        </div>
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarText"
        aria-controls="navbarText"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarText">
        <ul className="navbar-nav me-auto">
          <li className="d-flex align-items-center mx-1 my-2 my-md-0">
            <Link to={''} className="btn text-primary lighten-30 selectable text-uppercase">
              Home
            </Link>
          </li>

          <div className="bar mx-2"></div>

          <li className="d-flex align-items-center mx-1 my-2 my-md-0">
            <Link to={ 'About' } className="btn text-primary lighten-30 selectable text-uppercase">
              About
            </Link>
          </li>

          <div className="bar mx-2"></div>

          <li className="d-flex align-items-center position-relative my-2 my-md-0">
            <BGImgWidget />
          </li>

          <div className="bar mx-2"></div>

          <li className="d-flex align-items-center mx-4 my-2 my-md-0">
            <WeatherWidget />
          </li>

          <div className="bar mx-2"></div>

          <li className="d-flex align-items-center mx-3 my-2 my-md-0">
            <ClockWidget />
          </li>
        </ul>
        <Login />
      </div >
    </nav >
  )
}