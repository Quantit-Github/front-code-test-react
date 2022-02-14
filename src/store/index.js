import {applyMiddleware, createStore} from "redux"
import promiseMiddleware from "redux-promise";
import reduxThunk from "redux-thunk";

import rootReducer from "./reducer"

const createStoreWithMiddleware = applyMiddleware(
    promiseMiddleware,
    reduxThunk
)(createStore);

const store = createStoreWithMiddleware(rootReducer)

export default store
