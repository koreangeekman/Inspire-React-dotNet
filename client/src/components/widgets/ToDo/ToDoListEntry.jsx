import React from "react";
import Pop from "../../../utils/Pop";
import { toDoService } from "../../../services/Widgets/ToDoService.js";
import Icon from "@mdi/react";
import {
  mdiPencil,
  mdiTrashCan,
  mdiCancel,
  mdiContentSave
} from '@mdi/js';
import "../../../assets/scss/widget/ToDo/ToDoListEntry.scss"

export default function ToDoListEntry({todo}) { 

  async function toggleCompleted(todoObj) {
    try {
      !todoObj.isCompleted;
      await toDoService.updateToDo(todoObj);
    } catch (error) { Pop.error(error) }
  }

  function enableEdit(todoObj) {
    toDoService.enableEdit(todoObj);
    document.getElementById('enableEdit')?.addEventListener('click', () => {
      document.getElementById('editMe')?.focus();
    })
  }

  function cancelEdit(todoObj) {
    toDoService.cancelEdit(todoObj);
  }

  async function saveEdit(todoObj) {
    try {
      await toDoService.updateToDo(todoObj);
    } catch (error) { Pop.error(error); }
  }

  async function removeToDo(todoObj) {
    try {
      const yes = await Pop.confirm('Remove this ToDo entry?');
      if (!yes) { return }
      await toDoService.removeToDo(todoObj);
    } catch (error) { Pop.error(error); }
  }

  function drawEditOptions1() {
    if (todo.edit) {
      return (
        <button className="text-secondary" type="button" title="Cancel edit" tabIndex={0} onClick={cancelEdit}>
          <Icon path={mdiCancel} />
        </button>
      )
    }
    if (!todo.edit) {
      return (
        <input ref={todo.isCompleted} type="checkbox" onChange={toggleCompleted} checked={todo.isCompleted} />
      )
    }
    if (todo.edit) {
      return (
        <input ref={todo.body} id="editMe" type="text" className="ms-2 me-3 form-control" onBlur={saveEdit} />
      )
    } else {
      return (
        <p className="`listItem px-1 mx-1 mb-0 ${todo.isCompleted ? 'text-secondary' : ''}`" tabIndex={0}>
          { todo.isCompleted ? (<s>{todo.body}</s>) : (<span>{ todo.body }</span>) }
        </p>
      )
    }
  }

  function drawEditOptions2() {
    if (!todo.edit && todo.isCompleted) {
      return (
        <button className="invisible mdiPencil">
          <Icon path={mdiPencil} size={1} />
        </button>
      )
    } else if (!todo.edit) {
      return (
        <button title="Edit entry" id="enableEdit" tabIndex={0} className="text-secondary mdiPencil" onClick={enableEdit}>
          <Icon path={mdiPencil} size={1} />
        </button>
      )
    } else {
      return (
        <button className="text-primary mdiContentSave" type="button" tabIndex={0} title="Save edits" onClick={saveEdit} >
          <Icon path={mdiContentSave} size={1} />
        </button>
      )
    }
  }
  
  return (
  <div className="d-flex align-items-center justify-content-end rounded shadow p-1 ps-2 pb-2">
    <span className="d-flex w-100 shown">
        { drawEditOptions1() }
    </span>
    <span className={'d-flex' + !todo.edit ? ' hidden' : ''}>
      <span className="d-flex mx-3">
          { drawEditOptions2() }
      </span>
      <button className="text-danger mdiTrashCan" type="button" tabIndex={0} title="Remove entry" onClick={removeToDo}>
        <Icon path={mdiTrashCan} />
      </button>
    </span>
  </div>
  )
}