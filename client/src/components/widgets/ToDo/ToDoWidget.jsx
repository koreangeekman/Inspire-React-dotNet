import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { AppState } from "../../../AppState.js";
import { toDoService } from "../../../services/Widgets/ToDoService.js";
import ToDoListEntry from "./ToDoListEntry.jsx";
import Pop from "../../../utils/Pop";
import "../../../assets/scss/widget/ToDo/ToDoWidget.scss"
import Icon from "@mdi/react";
import { mdiPlusBox, mdiSortBoolAscendingVariant, mdiBroom } from '@mdi/js';
import { logger } from "../../../utils/Logger.js";

function ToDoWidget() {
  const [todos, setToDos] = useState([...AppState.todos]);

  const [incomplete, filterIncomplete] = useState([...AppState.todos.filter(todo => !todo.isCompleted)]);
  const [completed, filterCompleted] = useState([...AppState.todos.filter(todo => todo.isCompleted)]);

  // TODO  update counts, get filtering working

  // SECTION 'controller' functions

  function toggleCompleted() {
    toDoService.toggleCompleted()
    drawToDos();
  }

  // useEffect(() => { getToDos() }, []); // extracted to home page due to conditional draw requiring todos

  // async function getToDos() {
  //   try {
  //     await toDoService.getToDos();
  //     setToDos(AppState.todos);
  //   }
  //   catch (error) { Pop.error(error); }
  // }

  function drawToDos() {
    let arr = [...AppState.todos];
    let set = AppState.settings.todo;
    // function sortList() {
    // if (set.sortOpt == 'alpha') { return arr.sort((a, b) => a.body - b.body) }
    // if (set.sortOpt == '-alpha') { return arr.sort((a, b) => b.body - a.body) }
    // if (set.sortOpt == 'created') { return arr.sort((a, b) => a.createdAt - b.createdAt) }
    // if (set.sortOpt == '-created') { return arr.sort((a, b) => b.createdAt - a.createdAt) }
    // if (set.sortOpt == 'updated') { return arr.sort((a, b) => a.updatedAt - b.updatedAt) }
    // if (set.sortOpt == '-updated') { return arr.sort((a, b) => b.updatedAt - a.updatedAt) }
    // if (set.sortOpt == 'length') { return arr.sort((a, b) => a.body.length - b.body.length) }
    // if (set.sortOpt == '-length') { return arr.sort((a, b) => b.body.length - a.body.length) }
    //   return arr;
    // }

    // arr = sortList();

    if (set.showAll) {
      setToDos(arr);
      logger.log('show all')
    } else {
      setToDos(arr.filter(todo => !todo.isCompleted));
    }
  }

  async function createToDo(event) {
    try {
      event.preventDefault();
      await toDoService.createToDo({ body: event.target.body.value });
      filterIncomplete([...AppState.todos.filter(todo => !todo.isCompleted)]);
      event.target.reset();
    }
    catch (error) { Pop.error(error); }
  }

  async function removeAllCompleted() {
    try {
      const yes = await Pop.confirm('Remove all completed entries?');
      if (!yes) { return }
      await toDoService.removeAllCompleted();
      filterCompleted([...AppState.todos.filter(todo => todo.isCompleted)])
    } catch (error) { Pop.error(error); }
  }

  // SECTION functions for conditionally inserting content

  function remainingToDo() {
    if (todos.length == incomplete.length) {
      return (
        <p className="fs-6 mb-0 px-3 orange showToggleNote" tabIndex={0}>
          <b>{todos.length}</b> things To Do
        </p>
      )
    } else if (todos.length > 0 && incomplete.length == 0) {
      return (
        <p className="fs-5 mb-0 px-3 orange showToggleNote" tabIndex={0}>
          <b> Great job! </b>
        </p>
      )
    } else {
      return (
        <p className="fs-6 mb-0 px-3 orange" tabIndex={0}>
          Remaining: <b>{incomplete.length}</b> of <b>{todos.length}</b>
        </p>
      )
    }
  }

  // SECTION return html content

  return (
    <div>
      <form className="d-flex align-items-center rounded my-2 blur sticky-top todoForm" id="newToDoForm" onSubmit={createToDo}>
        <input className="form-control ms-2 shadow" type="text" name="body" placeholder="New ToDo?" required />
        <button className="btn p-1 mdiPlusBox d-flex" type="submit" tabIndex={0} title="Add ToDo">
          <Icon path={mdiPlusBox} size={1.86} />
        </button>
      </form>

      <section className="card p-2" id="todoList">
        <div className="d-flex justify-content-between todoSmall m-1">

          <button className="d-flex align-items-center pe-3 headerIcon btn" tabIndex={0} onClick={drawToDos}>
            <p className="fs-6 mb-0 me-1 px-1 orange">Sort List</p>
            <Icon path={mdiSortBoolAscendingVariant} size={1} />
          </button>

          <div className="bar"></div>

          <button type="button" onClick={toggleCompleted} className="position-relative btn">
            {remainingToDo()}
            {completed.length > 0 ? (
              <p className="hiddenToggleNote position-absolute text-nowrap card border pb-1 px-2 rounded">
                {completed.length} completed task{completed.length > 1 ? 's' : ''} hidden </p>
            ) : ''}
          </button>

          <div className="bar"></div>

          <button className="d-flex align-items-center ps-2 headerIcon btn" type="button" onClick={removeAllCompleted}>
            <p className="fs-6 mb-0 me-1 px-1 orange">Clean up list</p>
            <Icon path={mdiBroom} size={1} />
          </button>

        </div>

        <hr className="my-1" />

        {AppState.todos.map(todo => <ToDoListEntry key={todo.id} todoEntry={todo} />)}

      </section>
    </div>
  )
}

export default observer(ToDoWidget);