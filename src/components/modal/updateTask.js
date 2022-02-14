import { useState } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import {priorityMap} from '@model/enum'

import DatePicker from "react-datepicker";
import { ApiMap } from 'src/api';
import { UpdateTaskAction } from 'src/store/action';


function UpdateTaskModal(props){
  const {task} = props
  const categories = useSelector(state => state.categories);
  const dispatch = useDispatch();

  const [todo, setTodo] = useState(task.task);
  const [categoryId, setCategoryId] = useState(task.category.id);
  const [date, setDate] = useState(new Date(task.due_date));
  const [priority, setPriority] = useState(task.priority);
  

  const todoChange = (event) => {
    setTodo(event.target.value);
  };

  const categoryChange = (event) => {
    setCategoryId(event.target.value);
  };

  const handleDateChange = (date) => {
    setDate(date)
  }

  const priorityChange = (event) => {
    setPriority(event.target.value);
  };

  const updateClick = async () =>{
    await ApiMap.updateTask({
      'tid': task.id,
      "task": todo,
      "cid": categoryId,
      "due_date": date,
      "priority": priority
    }).then((rep) => {
      if(rep.status === 200){
        props.onRequestClose()
        dispatch(UpdateTaskAction(rep.data))
        alert("업데이트 성공")
      }
    })
  }


  return( 
    <Modal 
      isOpen={props.isOpen}
      onRequestClose={props.onRequestClose}
      id={"task-modal"}
      overlayClassName={"overlay"}
      className={"content"}
    >
      <h4>Update task</h4>        
      <form className="todo-input">
        <span>What should be done?</span>
        <input
          name="todo"
          className='input-field'
          value={todo} 
          onChange={todoChange}
          type={'text'}
          placeholder={"Please enter your to-do"}
        />
      </form>
      <div className='todo-info'>
        <div className='category'>
          <span>Category</span>
          <select name="category" value={categoryId} onChange={categoryChange}>
            {categories.map((c) => 
            <option key={`category-${c.id}`} value={c.id}>{c.name}</option>)
            }
          </select>
        </div>
        <div className='due-date'>
          <span>Due date</span>
          <DatePicker
            selected={date}
            onChange={handleDateChange}
            showTimeSelect
            dateFormat="yyyy-MM-dd HH:mm"
          />
        </div>
        <div className='priority'>
          <span>Task Priority</span>
          <select name="priority" value={priority} onChange={priorityChange}>
            {Object.entries(priorityMap).map((p) => 
              <option key={`priority-${p[0]}`} value={p[0]}>{p[1]}</option>)
            }
          </select>
        </div>
      </div>
      <div className="todo-buttons">
        <button onClick={props.onRequestClose}>Cancel</button>
        <button onClick={updateClick}>Update</button>
      </div> 
    </Modal>
  ) 
}

UpdateTaskModal.defaultProps = {
    task: {},
    isOpen: false,
    onRequestClose: () => console.log('close'),
}

export default UpdateTaskModal;

