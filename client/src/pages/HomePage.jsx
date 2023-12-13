import React, { useState } from "react";
import { observer } from "mobx-react";
import { AppState } from "../AppState";
import { mdiTire } from "@mdi/js"
import Icon from "@mdi/react";
import "../assets/scss/pages/HomePage.scss"
import Pop from "../utils/Pop";
import ToDoWidget from "../components/widgets/ToDo/ToDoWidget.jsx";
import { toDoService } from "../services/Widgets/ToDoService";

function HomePage() {
  async function getToDos() {
    try { await toDoService.getToDos(); }
    catch (error) { Pop.error(error); }
  }
  // getToDos()

  return (
  <div className="position-relative">
    <div className="container-fluid">
        <section className="row justify-content-center p-0">
          
        { AppState.account?.id && AppState.todos.length > 0 ? 
          (
          <div className="col-12 p-0 pt-md-4 pe-md-4 d-flex justify-content-end">
            <div className="row p-0">
              <div className="col-12 ToDoWidget">
                <ToDoWidget />
              </div>
            </div>
          </div>
            ) : (
          <div className="col-12 p-5 d-flex justify-content-center">
            <button className="fs-1 text-white blueBlur rounded-pill px-3 d-flex align-items-center" onClick={getToDos}>
              <Icon path={mdiTire} size={2} className="mdiSpin" />
              <p className="mb-0 mx-3 fs-3">LOADING</p>
              <Icon path={mdiTire} size={2} className="mdiSpin" />
            </button>
          </div>
          )}
          
      </section>
    </div>
  </div>
  )
}

export default observer(HomePage);