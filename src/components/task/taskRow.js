import { ReactComponent as Check } from "@asset/check.svg";
import { ReactComponent as Edit } from "@asset/edit.svg";
import { ReactComponent as Trash } from "@asset/trash.svg";
import { useEffect, useState } from "react";
import { ApiMap } from "src/api";
import UpdateTaskModal from "@cpt/modal/updateTask";
import styled from "@emotion/styled";

const TaskBox = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  gap: 10px;

  width: 335px;
  height: 20px;

  background: rgba(41, 161, 156, 0.02);
  border: 1px solid rgba(40, 40, 70, 0.1);
  border-radius: 10px;
`;

function TaskRow(props) {
  const { task, refetchPage, checkCallback } = props;
  const [select, isSelected] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  console.log("task", task);

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
      <TaskBox>
        <span>{task.task}</span>
        <span>{task.category.name}</span>
        <UpdateTaskModal
          isOpen={isOpen}
          task={task}
          onRequestClose={() => {
            isSelected(false);
            setOpen(false);
          }}
        ></UpdateTaskModal>
      </TaskBox>
    </li>
  );
}

export default TaskRow;
