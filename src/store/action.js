import ActionTypes from "./type"

//  ============== 0. Auth ==============  //
// TODO. 1 로그인 페이지 디자인 및 로그인 기능 구현 
// export function LoginAction


export function RefreshTokenAction(token){
    localStorage.setItem("token", token)
    return {
        type: ActionTypes.REFRESH_TOKEN,
        payload: token,
    };
}

export function LogoutAction(){
    localStorage.clear()
    return {
        type: ActionTypes.LOGOUT,
        payload: null,
    };
}

export function AddCategoryAction(data){
    return {
        type: ActionTypes.ADD_CATEGORY,
        payload: data,
    };
}


export function GetCategoriesAction(data){
    return {
        type: ActionTypes.GET_CATEGORIES,
        payload: data,
    };
}

export function GetSummeryAction(data){
    return {
        type: ActionTypes.GET_SUMMERY,
        payload: data,
    };
}

export function GetTaskSummeryAction(data){
    return {
        type: ActionTypes.GET_TASK_SUMMERY,
        payload: data,
    };
}

export function GetObservationAction(data){
    return {
        type: ActionTypes.GET_OBSERVATION,
        payload: data,
    };
}

export function GetAphorismAction(data){
    return {
        type: ActionTypes.GET_APHORISM,
        payload: data,
    };
}

export function GetAactiveTaskAction(data){
    return {
        type: ActionTypes.GET_ACITVE_TASKS,
        payload: data,
    };
}

export function GetDoneTaskAction(data){
    return {
        type: ActionTypes.GET_DONE_TASKS,
        payload: data,
    };
}

export function UpdateTaskAction(data){
    return {
        type: ActionTypes.UPDATE_TASK,
        payload: data,
    };
}


