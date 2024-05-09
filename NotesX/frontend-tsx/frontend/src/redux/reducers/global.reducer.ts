import { combineReducers } from "redux";
import authReducer from "./auth.reducer";
import noteReducer from "./note.reducer";
import tagReducer from "./tag.reducer";


const rootReducer = combineReducers({
    auth: authReducer,
    note: noteReducer,
    tag: tagReducer
})

export default rootReducer;