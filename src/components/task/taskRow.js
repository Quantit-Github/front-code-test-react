import { ReactComponent as Check } from "@asset/check.svg";
import { ReactComponent as Edit } from "@asset/edit.svg";
import { ReactComponent as Trash } from "@asset/trash.svg";
import { useState } from "react";
import { ApiMap } from "src/api";
import styled from "styled-components";
import UpdateTaskModal from "@cpt/modal/updateTask";

const TaskRowWrapper = styled.li`
    display: flex;
    align-items: center;
    padding: 16px;
    border: 1px solid rgba(40, 40, 70, 0.1);
    box-sizing: border-box;
    border-radius: 10px;

    background: ${({ select }) =>
        select ? "rgba(41, 161, 156, 0.1)" : "#ffffff"};

    text-decoration: ${({ done }) => (done ? "line-through" : "initial")};
    gap: 10px;

    &:hover {
        background: rgba(41, 161, 156, 0.1);
    }
`;

const CheckWrapper = styled.button`
    all: unset;
    width: 20px;
    height: 20px;
    border: 1px solid #29a19c;
    box-sizing: border-box;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const OptionWrapper = styled.div`
    margin-left: auto;
    display: inline-flex;
    gap: 12px;
`;

const EditBtnWrapper = styled.button`
    all: unset;
    border-radius: 4px;

    &:hover {
        background-color: rgba(40, 40, 70, 0.1);
    }
`;

const RemoveBtnWrapper = styled.button`
    all: unset;
    border-radius: 4px;

    &:hover {
        background-color: rgba(40, 40, 70, 0.1);
    }
`;

const CategoryWrapper = styled.div`
    padding: 0 12px;
    border-radius: 99px;
    height: 16px;
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;
    background-color: ${({ bgColor }) => bgColor};
    text-decoration: none;
    color: #fff;
`;

function TaskRow(props) {
    const { task, refetchPage, checkCallback } = props;
    const [select, isSelected] = useState(false);
    const [isOpen, setOpen] = useState(false);
    const openModal = () => setOpen(true);

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
        ApiMap.updateTaskStatus({ tid: task.id, status: status }).then(
            (rep) => {
                if (rep.status === 200) {
                    checkCallback();
                }
            }
        );
    };

    const remove = () => {
        ApiMap.updateTaskStatus({ tid: task.id, status: "rm" }).then((rep) => {
            if (rep.status === 200) {
                refetchPage();
            }
        });
    };

    const edit = () => {
        openModal();
    };

    const isDone = () => task.status === "cp";

    console.log(task);

    return (
        <TaskRowWrapper
            done={isDone()}
            select={select}
            className={select ? "task-row select" : "task-row"}
            onClick={selecting}
            value="13"
        >
            {select && (
                <CheckWrapper onClick={check}>
                    {isDone() && <Check />}
                </CheckWrapper>
            )}

            {task.task}
            <CategoryWrapper bgColor={task.category.color}>
                {task.category.name}
            </CategoryWrapper>
            {select && (
                <OptionWrapper>
                    <EditBtnWrapper onClick={edit}>
                        <Edit />
                    </EditBtnWrapper>
                    <RemoveBtnWrapper onClick={remove}>
                        <Trash />
                    </RemoveBtnWrapper>
                </OptionWrapper>
            )}
            <UpdateTaskModal
                isOpen={isOpen}
                task={task}
                onRequestClose={() => {
                    isSelected(false);
                    setOpen(false);
                }}
            ></UpdateTaskModal>
        </TaskRowWrapper>
    );
}

export default TaskRow;
