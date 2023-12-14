import React, { useEffect, useState } from "react";
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

export default function ToDoListEntry({ todoEntry }) {
  const [todo, setToDo] = useState(todoEntry);

  useEffect(() => {

  }, [])

  // SECTION 'controller' functions

  async function toggleCompleted() {
    try {
      todo.isCompleted = !todo.isCompleted;
      setToDo({ ...todo });
      await toDoService.updateToDo(todo);
    } catch (error) { Pop.error(error); }
  }

  function enableEdit() {
    todo.edit = true;
    setToDo({ ...todo });
    logger.log('enableEdit(): Editing enabled', `on "${todo.body}"`);
    // document.getElementById('enableEdit')?.addEventListener('click', () => {
    //   document.getElementById('editMe')?.focus();
    // })
  }

  function cancelEdit() {
    todo.edit = false;
    setToDo({ ...todo });
    logger.log('cancelEdit(): Editing cancelled', `on "${todo.body}"`)
  }

  async function saveEdit() {
    try {
      await toDoService.updateToDo(todo);
      todo.edit = false;
      setToDo({ ...todo });
    } catch (error) { Pop.error(error); }
  }

  async function removeToDo() {
    try {
      const yes = await Pop.confirm('Remove this ToDo entry?');
      if (!yes) { return }
      await toDoService.removeToDo(todo);
    } catch (error) { Pop.error(error); }
  }

  // SECTION functions for draw

  function drawEditOptions1() {
    if (todo.edit) {
      return (
        <>
          <button className="text-secondary mdiCancel btn p-0" type="button" title="Cancel edit" tabIndex={0} onClick={cancelEdit}>
            <Icon path={mdiCancel} size={1} />
          </button>
          <input name="body" type="text" className="ms-2 me-3 form-control" onBlur={saveEdit} />
        </>
      )
    } else {
      return (
        <>
          <input type="checkbox" onChange={toggleCompleted} checked={todo.isCompleted} />
          <p className={todo.isCompleted ? 'listItem px-1 mx-1 mb-0 text-secondary' : 'listItem px-1 mx-1 mb-0'} tabIndex={0}>
            {todo.isCompleted ? (<s>{todo.body}</s>) : (<span>{todo.body}</span>)}
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

  // SECTION return html content

  return (
    <div className="d-flex align-items-center justify-content-end rounded shadow p-1 ps-2 pb-2">
      <span className="d-flex w-100 shown">
        {drawEditOptions1()}
      </span>
      <span className={!todo.edit ? 'd-flex hidden' : 'd-flex'}>
        <span className="d-flex mx-3">
          {drawEditOptions2()}
        </span>
        <button className="text-danger mdiTrashCan btn p-0" type="button" tabIndex={0} title="Remove entry" onClick={removeToDo}>
          <Icon path={mdiTrashCan} size={1} />
        </button>
      </span>
    </div>
  )
}