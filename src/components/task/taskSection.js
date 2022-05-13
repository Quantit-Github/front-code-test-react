import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import TaskRow from "@cpt/task/taskRow";
import { useBus } from "react-bus";
import { useState, useEffect } from "react";

function TasksSection(props) {
  const { tasks, title, setPage, page, refetchPage } = props;

  const [pageArray, setPageArray] = useState([1]);

  const range = (size, startAt) => {
    return [...Array(size).keys()].map((i) => i + startAt);
  };

  useEffect(() => {
    if (tasks.num_page < 6) {
      setPageArray([...Array(tasks.num_page).keys()]);
    } else {
      const min = page < 3 ? 1 : page - 2;
      const max = page < 3 ? 5 : page + 2;
    }
  }, []);

  const bus = useBus();

  console.log("tasksP", tasks.num_page);
  const checkCallback = () => {
    bus.emit("activeRefetch");
    bus.emit("doneRefetch");
  };

  return (
    <section>
      <h3>{title}</h3>
      <ul>
        {tasks.tasks.map((task) => (
          <TaskRow
            key={task.task}
            task={task}
            refetchPage={refetchPage}
            checkCallback={checkCallback}
          />
        ))}
      </ul>
      TODO. 페이지 네이션 구현
    </section>
  );
}

export default TasksSection;
