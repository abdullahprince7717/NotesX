import { createStore } from "redux"
import userReducer from "./reducer"

const reduxStore = createStore(userReducer);

export default reduxStore;