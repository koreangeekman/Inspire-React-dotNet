import React, { useState } from "react";
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

export default function ToDoListEntry({ todoEntry, drawToDos }) {
  const [todo, setToDo] = useState(todoEntry);

  // SECTION 'controller' functions

  async function toggleCompleted() {
    try {
      todo.isCompleted = !todo.isCompleted;
      setToDo({ ...todo }); // spread operator forces the state to register a change
      await toDoService.updateToDo(todo);
      drawToDos()
    } catch (error) { Pop.error(error); }
  }

  function enableEdit() {
    todo.edit = true;
    setToDo({ ...todo });
    logger.log('enableEdit(): Editing enabled', `on "${todo.body}"`);
    // document.getElementById('editMe')?.innerHTML = todo.body;
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
      todo.body = newBody;
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
      drawToDos()
    } catch (error) { Pop.error(error); }
  }

  // SECTION functions for conditionally showing list entry draw (edit vs normal)

  const [newBody, setNewBody] = useState(todo.body); // todo body 'bind'

  function bodyChangeHandler(event) {
    setNewBody(event.target.value)
  }

  function drawModeElementsStart() { // Cancel + input[text] --vs-- input[checkbox] + p
    if (todo.edit) {
      return (
        <>
          <button className="text-secondary mdiCancel btn p-0" type="button" title="Cancel edit" tabIndex={0} onClick={cancelEdit}>
            <Icon path={mdiCancel} size={1} />
          </button>
          <input defaultValue={newBody} id="editMe" name="body" type="text" className="ms-2 me-3 form-control" onChange={bodyChangeHandler} />
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

  function drawModeElementsEnd() { // buttons
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
    <div className="d-flex align-items-center justify-content-end rounded shadow p-1 ps-2 mb-1">
      <span className="d-flex w-100 shown">
        {drawModeElementsStart()}
      </span>
      <span className={!todo.edit ? 'd-flex hiddenBtn' : 'd-flex'}>
        <span className="d-flex mx-3">
          {drawModeElementsEnd()}
        </span>
        <button className="text-danger mdiTrashCan btn p-0" type="button" tabIndex={0} title="Remove entry" onClick={removeToDo}>
          <Icon path={mdiTrashCan} size={1} />
        </button>
      </span>
    </div>
  )
}