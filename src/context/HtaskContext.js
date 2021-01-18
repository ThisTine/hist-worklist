import {createContext} from 'react'

const HtaskContext = createContext(
{    Htaskdata : [{
                    _id:"asdkjakdjiwasd",
                    description: "loading",
                    dueDate: "1/5/2021",
                    name:"loading",
                    subject:"ส30111",
                    username: null,
                    cDate : "1/9/2021"}],
    Htaskloading: true
})

export default HtaskContext