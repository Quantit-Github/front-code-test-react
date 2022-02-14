import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import TaskRow from '@cpt/task/taskRow';
import { useBus } from 'react-bus';

function TasksSection(props){
  const {tasks, title, setPage, page, refetchPage} = props
  const bus = useBus()


  const checkCallback = () => {
    bus.emit('activeRefetch')
    bus.emit('doneRefetch')
  }

  return (
    <section>
      <h3>{title}</h3>
      <ul>
      {tasks.tasks.map(
        (task) => <TaskRow key={task.task} task={task} refetchPage={refetchPage} checkCallback={checkCallback}/>
      )}
      </ul>
      TODO. 페이지 네이션 구현
    </section> 
  )
}

export default TasksSection;

