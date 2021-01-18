import {createContext} from 'react'

const UserContext = createContext(
{    userdata: {
    udata: null,
    loading: true,
    error: null
},
    userconfig: {
        uname: null,
        done: [],
        loading: true
    }
})

export default UserContext