import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import AddTodoMoal from '@cpt/modal/addTask';

function DashboardHeader() {
  const [isOpen, setOpen] =  useState(false);
  const username = useSelector(state => state.username) || localStorage.getItem("username");

  const openModal = () => setOpen(true);
  
  return (
    <header>
        <button onClick={openModal}>
          <AddCircleOutlineIcon/>
          <span>Add Todo</span>
        </button>
        <div className='profile'>
          <span>{username}</span>
          <AccountCircleIcon/>
        </div>
        
        <AddTodoMoal 
          isOpen={isOpen} 
          onRequestClose={()=>setOpen(false)}
        >
        </AddTodoMoal>
    </header>
  );
}
    
export default DashboardHeader;