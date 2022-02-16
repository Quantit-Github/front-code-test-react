const ActionTypes = {
    //  ============== 0. Auth ==============  //
    SET_TOKEN: "SET_TOKEN",
    REFRESH_TOKEN: "REFRESH_TOKEN",
    LOGOUT: "LOGOUT",

    //  ============== 1. Common ==============  //
    GET_CATEGORIES: "GET_CATEGORIES",
    ADD_CATEGORY: "ADD_CATEGORY",

    //  ============== 2. Dashboard ==============  //
    GET_SUMMERY: "GET_SUMMERY",
    GET_TASK_SUMMERY: "GET_TASK_SUMMERY",
    GET_OBSERVATION: "GET_OBSERVATION",
    GET_APHORISM: "GET_APHORISM",

    //  ============== 3. Todos ==============  //
    GET_ACITVE_TASKS: "GET_ACITVE_TASKS",
    GET_DONE_TASKS: "GET_DONE_TASKS",
    UPDATE_TASK: "UPDATE_TASK",
};

export default ActionTypes;
