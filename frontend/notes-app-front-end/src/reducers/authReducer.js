const authReducer = (state = {}, action) => {
    switch(action.type){
        case 'LOGIN_SUCCESS':
        case 'CURRENT_USER':
            return action.user
        case 'LOGOUT_SUCCESS':
            return {}
        default:
            return state
    }

}

export default authReducer