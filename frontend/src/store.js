import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { forgotPasswordReducer, userReducer } from './reducers/userReducers'

const reducer = combineReducers({
    user: userReducer,
    forgotPassword: forgotPasswordReducer,
})

let initialState = {

}
const middlerware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middlerware))

)
export default store