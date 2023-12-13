import React from "react";
import Pop from "../../../utils/Pop";
import { toDoService } from "../../../services/Widgets/ToDoService.js";
import ToDoListEntry from "./ToDoListEntry.jsx";

export default function ToDoWidget() {
  let todos = [];
      // account: computed(() => AppState.account),
      // todos: computed(() => {
      //   let arr = AppState.todos;
      //   if (AppState.settings.todo.showAll) {
      //     if (sortOpt.value == 'alpha') { return arr.sort((a, b) => a.body - b.body) }
      //     return arr
      //   } else {
      //     return arr.filter(todo => !todo.isCompleted)
      //   }
      // }),
      // incomplete: computed(() => AppState.todos.filter(todo => !todo.isCompleted)),
      // completed: computed(() => AppState.todos.filter(todo => todo.isCompleted)),

      async function createToDo() {
    try {
      await toDoService.createToDo(newToDo.value);
      newToDo.value = {};
    }
    catch (error) { Pop.error(error); }
  }


  async function removeAllCompleted() {
    try {
      const yes = await Pop.confirm('Remove all completed entries?');
      if (!yes) { return }
      await toDoService.removeAllCompleted();
    } catch (error) { Pop.error(error) }
  }

  function toggleCompleted() {
    toDoService.toggleCompleted()
  }
  
  return (
    <div>
      <form className="d-flex align-items-center rounded my-2 blur sticky-top todoForm" onSubmit={createToDo}>
        <input v-model="newToDo.body" className="form-control ms-2 shadow" type="text" name="body" placeholder="New ToDo?" maxLength="200" required />
        <button className="btn p-0" type="submit" tabIndex={0} title="Add ToDo">
          <i className="fs-1 p-1 mdi mdi-plus-box"></i>
        </button>
      </form>

      <section v-if="todos.length > 0" className="card p-2" id="todoList">
        <div className="d-flex justify-content-between todoSmall mx-1 my-2">

          <span className="d-flex align-items-center pe-3" type="button" tabIndex={0} onClick={'sortList'}>
            <p className="fs-5 mb-0 px-1 orange">Sort List</p>
            <i className="fs-4 ms-1 headerIcon mdi mdi-sort-bool-ascending-variant"></i>
          </span>

          <div className="bar"></div>

          <span type="button" onClick={toggleCompleted} className="position-relative">
            <p className="fs-5 mb-0 px-3 orange showToggleNote" tabIndex={0} v-if="todos.length == incomplete.length">
              <b>{ todos.length }</b> things To Do
            </p>
            <p className="fs-4 mb-0 px-3 orange showToggleNote" tabIndex={0}
              v-else-if="todos.length > 0 && incomplete.length == 0">
              <b> Great Job! </b>
            </p>
            <p className="fs-5 mb-0 px-3 orange" v-else tabIndex={0}>
              Remaining: <b>{ incomplete.length }</b> of <b>{ todos.length }</b>
            </p>
            <p v-if="completed.length > 0"
              className="hiddenToggleNote position-absolute text-nowrap card border pb-1 px-2 rounded">
              { completed.length } completed task{ completed.length > 1 ? 's' : '' } hidden </p>
          </span>

          <div className="bar"></div>

          <span className="d-flex align-items-center ps-2" type="button" onClick={removeAllCompleted}>
            <p className="fs-5 mb-0 px-1 orange">Clean up list</p>
            <i className="fs-3 ms-1 headerIcon mdi mdi-broom"></i>
          </span>

        </div>

        <hr className="my-1" />

        {todos.map(todo => {
          return (
            <div key={todo.id}>
              <ToDoListEntry todo={todo} />
            </div>
          )
        })}
      </section>
    </div>
  )
}