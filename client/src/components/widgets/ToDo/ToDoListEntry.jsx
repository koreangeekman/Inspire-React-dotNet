import React, { useRef } from "react";
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
import { logger } from "../../../utils/Logger.js";

export default function ToDoListEntry({ todo }) { 
  
  async function toggleCompleted() {
    try {
      !todo.isCompleted;
      await toDoService.updateToDo(todo);
    } catch (error) { Pop.error(error); }
  }

  function enableEdit() {
    toDoService.enableEdit(todo);
    document.getElementById('enableEdit')?.addEventListener('click', () => {
      document.getElementById('editMe')?.focus();
    })
  }

  function cancelEdit() {
    toDoService.cancelEdit(todo);
  }

  async function saveEdit() {
    try {
      await toDoService.updateToDo(todo);
    } catch (error) { Pop.error(error); }
  }

  async function removeToDo() {
    try {
      const yes = await Pop.confirm('Remove this ToDo entry?');
      if (!yes) { return }
      await toDoService.removeToDo(todo);
    } catch (error) { Pop.error(error); }
  }

  const todoData = useRef({ body: todo.body });
  
  logger.log('todoData',todoData.current.body);
  function drawEditOptions1() {
    if (todo.edit) {
      return (
      <>
        <button className="text-secondary mdiCancel btn p-0" type="button" title="Cancel edit" tabIndex={0} onClick={cancelEdit}>
          <Icon path={mdiCancel} size={1} />
        </button>
        <input ref={todoData.current} name="body" type="text" className="ms-2 me-3 form-control" onBlur={saveEdit} />
      </>
    )
    } else {
      return (
      <>
        <input type="checkbox" onChange={toggleCompleted} />
        <p className={'listItem px-1 mx-1 mb-0' + (todo.isCompleted ? ' text-secondary' : '')} tabIndex={0}>
          { todo.isCompleted ? (<s>{todo.body}</s>) : (<span>{ todo.body }</span>) }
      </p>
      </>
      )
    }
  }

  function drawEditOptions2() {
    if (!todo.edit && todo.isCompleted) {
      return (
        <button className="invisible mdiPencil btn p-0">
          <Icon path={mdiPencil} size={1} />
        </button>
      )
    } else if (!todo.edit) {
      return (
        <button className="text-secondary mdiPencil btn p-0" title="Edit entry" id="enableEdit" tabIndex={0} onClick={enableEdit}>
          <Icon path={mdiPencil} size={1} />
        </button>
      )
    } else {
      return (
        <button className="text-primary mdiContentSave btn p-0" title="Save edits" tabIndex={0} onClick={saveEdit} >
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
    <span className={!todo.edit ? 'd-flex hidden' : 'd-flex'}>
      <span className="d-flex mx-3">
          { drawEditOptions2() }
      </span>
      <button className="text-danger mdiTrashCan btn p-0" type="button" tabIndex={0} title="Remove entry" onClick={removeToDo}>
        <Icon path={mdiTrashCan} size={1} />
      </button>
    </span>
  </div>
  )
}