const initialState = {
    // ============ 0.Auth ============ //
    token: null,
    refresh: null,
    username: null,

    // ============ 1.Common ============ //
    summery: {
        "COMPLETED": 0,
        "CREATED": 0,
        "REMOVED": 0
    },
    summery_task: {
        active: [],
        done: []
    },
    observation:{
        "create": "-",
        "complete": "-"
    },
    aphorism:{
        slip:{
            id: 0,
            advice: "-"
        }
    },
    // ============ 2.Dashboard ============ //
    categories: [],

    // ============ 3.Todos ============ //
    active_tasks: {
        has_previous: false,
        has_next: false,
        num_page: 1,
        tasks: []
    },
    done_tasks: {
        has_previous: false,
        has_next: false,
        num_page: 1,
        tasks: []
    }
}


export default initialState;