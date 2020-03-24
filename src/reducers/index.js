import { combineReducers } from 'redux';

// reducers
import userReducer from './user_reducer';

const rootReducer = combineReducers({
    userReducer
})

export default rootReducer;