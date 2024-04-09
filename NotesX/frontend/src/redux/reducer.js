
const INITIAL_STATE = {
    user: {}
}

const userReducer = (state = INITIAL_STATE, action) => {
    console.log(action);
    console.log(state);

    if (action.type == 'LOGIN') {
        return {
            ...state,
            user: action.payload.userInfo
        }
    }
    else {
        return state; // when first time reducer is called, as there is no action is created then this else will return the initial state.
    }
}

export default userReducer;