import ActionTypes from "./type";
import initialState from "./state";

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        //  ============== 0. Auth ==============  //
        case ActionTypes.SET_TOKEN:
            const { username, token, refresh } = action.payload;
            localStorage.setItem("username", username);
            localStorage.setItem("token", token);
            localStorage.setItem("refresh", refresh);
            return Object.assign({}, state, {
                token: token,
                refresh: refresh,
                username: username,
            });

        case ActionTypes.REFRESH_TOKEN:
            return Object.assign({}, state, {
                token: action.payload,
            });
        case ActionTypes.LOGOUT:
            return Object.assign({}, state, {
                token: null,
                refresh: null,
                username: null,
            });
        case ActionTypes.ADD_CATEGORY:
            return Object.assign({}, state, {
                categories: [...state.categories, action.payload],
            });
        case ActionTypes.GET_CATEGORIES:
            return Object.assign({}, state, {
                categories: action.payload,
            });
        case ActionTypes.GET_SUMMERY:
            return Object.assign({}, state, {
                summery: action.payload,
            });
        case ActionTypes.GET_TASK_SUMMERY:
            return Object.assign({}, state, {
                summery_task: action.payload,
            });
        case ActionTypes.GET_OBSERVATION:
            return Object.assign({}, state, {
                observation: action.payload,
            });
        case ActionTypes.GET_APHORISM:
            return Object.assign({}, state, {
                aphorism: action.payload,
            });
        case ActionTypes.GET_ACITVE_TASKS:
            return Object.assign({}, state, {
                active_tasks: action.payload,
            });
        case ActionTypes.GET_DONE_TASKS:
            return Object.assign({}, state, {
                done_tasks: action.payload,
            });
        case ActionTypes.UPDATE_TASK:
            return Object.assign({}, state, {
                active_tasks: {
                    ...state.active_tasks,
                    tasks: state.active_tasks.tasks.map((at) => {
                        if (at.id === action.payload.id) {
                            return action.payload;
                        } else {
                            return at;
                        }
                    }),
                },
            });
        default:
            return state;
    }
}
