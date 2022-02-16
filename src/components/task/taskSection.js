import TaskRow from "@cpt/task/taskRow";
import { useBus } from "react-bus";
import Pagination from "../common/Pagination";

import styled from "styled-components";
const TaskWrapper = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding-bottom: 60px;
`;

function TasksSection(props) {
    const { tasks, title, setPage, page, refetchPage } = props;
    const bus = useBus();

    const checkCallback = () => {
        bus.emit("activeRefetch");
        bus.emit("doneRefetch");
    };

    return (
        <section>
            <h3>{title}</h3>
            <TaskWrapper>
                {tasks.tasks.map((task) => (
                    <TaskRow
                        key={task.task}
                        task={task}
                        refetchPage={refetchPage}
                        checkCallback={checkCallback}
                    />
                ))}
            </TaskWrapper>
            <Pagination />
        </section>
    );
}

export default TasksSection;
