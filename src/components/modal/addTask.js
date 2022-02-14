import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import {useBus} from 'react-bus'
import DatePicker from "react-datepicker";

import {priorityMap} from '@model/enum'
import { useSelector } from 'react-redux';
import { ApiMap } from 'src/api';

function AddTodoModal(props){
  const bus = useBus()
  const categories = useSelector(state => state.categories);

  const [todo, setTodo] = useState('');
  const [date, setDate] = useState(new Date());
  const [categoryId, setCategoryId] = useState();
  const [priority, setPriority] = useState(Object.keys(priorityMap)[2]);

  useEffect(() => {
    if(categories.length !== 0){
      setCategoryId(categories[0].id)
    } 
  }, [categories])

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

  const onRequestClose = () => {
    setTodo('');
    setDate(new Date());
    setCategoryId('');
    setPriority(Object.keys(priorityMap)[2])
    props.onRequestClose()
  }

  const addClick = async () => {
    await ApiMap.addTask({
      'task': todo,
      'cid': categoryId,
      'due_date': date,
      'priority': priority,
    }).then((rep) => {
      if(rep.status === 200){
        props.onRequestClose()
        bus.emit('activeRefetch')
        alert("Task 추가 성공")
      }
    })
  }

  return( 
    <Modal 
      isOpen={props.isOpen}
      onRequestClose={onRequestClose}
      id={"task-modal"}
      overlayClassName={"overlay"}
      className={"content"}
    >
      <h4>Add a new task</h4>        
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
        <button onClick={onRequestClose}>Cancel</button>
        <button onClick={addClick}>Add</button>
      </div> 
    </Modal>
  ) 
}

AddTodoModal.defaultProps = {
    isOpen: false,
    onRequestClose: () => console.log('close'),
}

export default AddTodoModal;