import {combineReducers} from 'redux'
const init = {

    id:'',
    username:''

}

const AuthReducer = (state = init,action) => {
    switch (action.type){
// akan menyalin property di state untuk kemudian diubah 'id' dan 'username'
        case 'LOGIN_SUCCESS':
        return {...state,
            id: action.payload.id, 
            username:action.payload.username
        }

        case 'LOGOUT_SUCCESS':
            return {...state,
                id: '',
                username:''
            }
        ;

    default:
        
        return state

    }

}

const reducers = combineReducers(
    {
        auth : AuthReducer
    }
)
export default reducers




// pertama kali app running, reducer akan menjalankan kode yang ada di dalam 'default
// pada default kita akan return 'state' yang berisi object 'init' sebagai data awal