import DashboardHeader from '@cpt/common/dashHeader';
import TasksSection from '@cpt/task/taskSection';

import BaseView from '@views//base';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ApiMap } from 'src/api';
import { GetAactiveTaskAction, GetDoneTaskAction } from 'src/store/action';
import { Provider as BusProvier, useListener} from 'react-bus'

function TodoList() {
  return (
    <BaseView type={"dashboard"}>
      <BusProvier>
      <div className='content'>
          <DashboardHeader/>
          <article className='todo'>
            <ActiveTasksSection/>
            <DoneTasksSection/>
          </article>
      </div>
      </BusProvier>
    </BaseView>
  );
}
  
export default TodoList;


function ActiveTasksSection(){
  const [page, setPage] = useState(1)
  const active_tasks = useSelector(state => state.active_tasks);
  const dispatch = useDispatch()

  useEffect(() => {
    ApiMap.getActiveTasks(page).then(
      (rep) => {
        if(rep.status === 200){
          dispatch(GetAactiveTaskAction(rep.data))
        }
      }
    )
  }, [page, dispatch])

  const activeRefetch = () => {
    ApiMap.getActiveTasks(page).then(
      (rep) => {
        if(rep.status === 200){
          if(page > rep.data.num_page){
            setPage(rep.data.num_page)
          }else{
            dispatch(GetAactiveTaskAction(rep.data))
          }
        }
      }
    )
  }
  
  useListener('activeRefetch', activeRefetch)
  
  return (
    <TasksSection
      tasks={active_tasks}
      title={'Active Tasks'}
      setPage={setPage}
      refetchPage={activeRefetch}
      page={page}
      />
  )
}

function DoneTasksSection(){
  const [page, setPage] = useState(1)
  const done_tasks = useSelector(state => state.done_tasks);
  const dispatch = useDispatch()

  useEffect(() => {
    ApiMap.getDoneTasks(page).then(
      (rep) => {
        if(rep.status === 200){
          dispatch(GetDoneTaskAction(rep.data))
        }
      }
    )
  }, [page, dispatch])

  const doneRefetch = () => {
    ApiMap.getDoneTasks(page).then(
      (rep) => {
        if(rep.status === 200){
          if(page > rep.data.num_page){
            setPage(rep.data.num_page)
          }else{
            dispatch(GetDoneTaskAction(rep.data))
          }
        }
      }
    )
  }

  useListener('doneRefetch', doneRefetch)
  
  return (
    <TasksSection
      tasks={done_tasks}
      title={'Completed Tasks'}
      setPage={setPage}
      refetchPage={doneRefetch}
      page={page}
    />
  )
}




