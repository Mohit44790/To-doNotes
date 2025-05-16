import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import notesReducer from './notesSlice';

const rootReducer = combineReducers({
   auth: authReducer,
    notes: notesReducer,
});

export default rootReducer;
