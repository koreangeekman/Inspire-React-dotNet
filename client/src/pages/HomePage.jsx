import React from "react";
import { AppState } from "../AppState";
import "../assets/scss/pages/HomePage.scss"
import ToDoWidget from "../components/widgets/ToDo/ToDoWidget.jsx";

export default function HomePage() {
  const account = AppState.account;

  return (
  <div className="position-relative">
    <div className="container-fluid">
        <section className="row justify-content-center p-0">
          
        { account?.id ? 
          (
          <div className="col-12 p-0 pt-md-4 pe-md-4 d-flex justify-content-end">
            <div className="row p-0">
              <div className="col-12 ToDoWidget"> boop
                {/* <ToDoWidget /> */}
              </div>
            </div>
          </div>
            ) : (
          <div className="col-12 p-5 d-flex justify-content-center">
            <span className="fs-1 text-white blueBlur rounded-pill px-3 d-flex align-items-center">
              <i className="mdi mdi-tire mdi-spin"></i>
              <p className="mb-0 mx-3 fs-3">LOADING</p>
              <i className="mdi mdi-tire mdi-spin"></i>
            </span>
          </div>
          )}
          
      </section>
    </div>
  </div>
  )
}