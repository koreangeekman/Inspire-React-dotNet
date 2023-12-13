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

export default function ToDoListEntry(props) { 

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
  
  return (
  <div className="d-flex align-items-center justify-content-end rounded shadow p-1 ps-2 pb-2">
    <span className="d-flex w-100 shown">
      <Icon v-if="todo.edit" path={mdiCancel} className="text-secondary" type="button" title="Cancel edit" tabIndex={0}
        onClick={cancelEdit(props.todo)} />
      <input v-if="!todo.edit" v-model="todo.isCompleted" type="checkbox" onChange={toggleCompleted(props.todo)}
        checked={props.todo.isCompleted} />
      <input v-if="todo.edit" v-model="todo.body" id="editMe" type="text" maxLength="200" className="ms-2 me-3 form-control"
        onBlur={saveEdit(props.todo)} />
      <p v-else className="`listItem px-1 mx-1 mb-0 ${todo.isCompleted ? 'text-secondary' : ''}`" tabIndex={0}>
        <s v-if="todo.isCompleted">{ props.todo.body }</s>
        <span v-else>{ props.todo.body }</span>
      </p>
    </span>
    <span className="d-flex" className="!todo.edit ? 'hidden' : ''">
      <span className="d-flex mx-3">
        <Icon v-if="!todo.edit && todo.isCompleted" path={mdiPencil} className="invisible" />
        <Icon v-else-if="!todo.edit" className="fs-4 text-secondary mdi mdi-pencil" id="enableEdit" type="button"
          title="Edit entry" onClick={enableEdit(props.todo)} tabIndex={0} />
        <Icon v-else path={mdiContentSave} className="text-primary" type="button" tabIndex={0} title="Save edits"
          onClick={saveEdit(props.todo)} />
      </span>
      <Icon path={mdiTrashCan} className="text-danger" type="button" tabIndex={0} title="Remove entry"
        onClick={removeToDo(props.todo)} />
    </span>
  </div>
  )
}