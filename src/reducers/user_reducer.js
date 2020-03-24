const tempUser = {
    "email" : "123ea43e",
    "password" : "temporary",
    "favorites" : [],
    "isLoggedIn" : false
}

export default function(state=tempUser, action){
    switch(action.type){
        case 'USER_UPDATE':
            return action.payload;
        default:
            return state
    }
}