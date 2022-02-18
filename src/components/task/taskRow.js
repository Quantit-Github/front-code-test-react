import { ReactComponent as Check } from "@asset/check.svg";
import { ReactComponent as Edit } from "@asset/edit.svg";
import { ReactComponent as Trash } from "@asset/trash.svg";
import { useState } from "react";
import { ApiMap } from "src/api";
import UpdateTaskModal from "@cpt/modal/updateTask";

function TaskRow(props) {
  const { task, refetchPage, checkCallback } = props;
  const [select, isSelected] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  console.log(task);

  const selecting = (event) => {
    if (
      (event.target.value !== undefined && event.target.value === 13) ||
      event.target.tagName === "SPAN"
    ) {
      isSelected(!select);
    }
  };

  const check = () => {
    const status = task.status === "ct" ? "cp" : "ct";
    ApiMap.updateTaskStatus({ tid: task.id, status: status }).then((rep) => {
      if (rep.status === 200) {
        checkCallback();
      }
    });
  };

  const remove = () => {
    ApiMap.updateTaskStatus({ tid: task.id, status: "rm" }).then((rep) => {
      if (rep.status === 200) {
        refetchPage();
      }
    });
  };

  const isDone = () => task.status === "cp";

  return (
    <li
      className={select ? "task-row select" : "task-row"}
      onClick={selecting}
      value="13"
    >
      <div className="info">
        <div className="check-box"></div>
        <span>{task.task}</span>
        <div className="category-box" style={{ backgroundColor: "red" }}>
          <div>{task.category.name}</div>
        </div>
      </div>

      <UpdateTaskModal
        isOpen={isOpen}
        task={task}
        onRequestClose={() => {
          isSelected(false);
          setOpen(false);
        }}
      ></UpdateTaskModal>
    </li>
  );
}

export default TaskRow;
