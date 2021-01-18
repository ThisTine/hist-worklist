import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import NavBar from './components/Nav';
import { extendTheme, ChakraProvider, Alert, AlertIcon, Button, Box,  } from "@chakra-ui/react"
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Add from './pages/Add';
import Subject from './pages/Subject'
// import mockupdata from './json/mockupdata.json'
import HtaskContext from './context/HtaskContext'
import Homework from './pages/Homework';
import {useState,useEffect} from 'react'
import Edit from './pages/Edit';
import User from './pages/User';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import firebase from './firebase/firebase'
import { useAuthState } from 'react-firebase-hooks/auth';
import UserContext from './context/UserContext';
import LoadingPage from './pages/Loading';
const config = {
  useSystemColorMode: false,
  initialColorMode: "dark",
}


const db = firebase.firestore()
const auth = firebase.auth()

const styles = {
  global:( {colorMode }) => ({
    body: {
      color: colorMode === "dark" ? 'whiteAlpha.900' : 'gray.800',
      bg: colorMode === "dark" ?'#1D2935' : '#141214',
    },
  }),
};
const customTheme = extendTheme({config,styles})





function App() {
  const [offlinemode,setofflinemode] = useState(false)
  const [udata,setudata] = useState({
    uname: null,
    done: [],
    loading: true
})
  const [htask,sethtask] = useState(null)
  const [user, uloading, uerror] = useAuthState(auth);
  const [donedata,setdonedata] = useState(JSON.parse(localStorage.getItem('done')) || [])
  // const [userdata, userdataloading, userdataerror] = useDocumentData(db.doc(`users/${user.uid ||"nullasd"}`),{
  //   snapshotListenOptions:{ includeMetadataChanges: true}
  // } )

  useEffect(()=>{
    // console.log("user", user)
    // console.log(uloading)
      if(user && !uloading && !uerror){
         db.collection("users").doc(user.uid).onSnapshot({includeMetadataChanges: true},doc=>{
            // console.log(doc.data())
            // console.log("Active !")
            if(doc.exists && user){
              localStorage.setItem('done',JSON.stringify(doc.data().done))
              setudata({...doc.data(),loading:false})
            }
            
          },(err)=>{
            console.log(err)
          }
          
          )
      }else{
        setudata({
          uname: null,
          done: donedata || [],
          loading: true
      })
      }
  },[user,donedata,uerror,uloading])




  const [values, loading, error] = useCollectionData(db.collection("homeworkset"),{
    snapshotListenOptions: { includeMetadataChanges: true },
    idField: "_id"
  })
  // console.log('rawvalue',values)

  useEffect(() => {
    if(values && offlinemode === false){
      // console.log("active")
      setofflinemode(false)
      const rhtask = values.map(item=>{
        // console.log("udata",udata.done)
        return {...item,done: udata.done ? udata.done.includes(item._id) ? true : false : false}
      })
      // console.log('rhtask',rhtask)
      localStorage.setItem('udata',JSON.stringify(rhtask))
      sethtask(rhtask)
    }
    if(error){
      setofflinemode(true)
      sethtask(JSON.parse(localStorage.getItem('udata')))
    }
  }, [values,udata,error,offlinemode])

  
  const markdonedata = (id)=>{
          //  const newmdata = htask.map(item=>{
          //    if(item._id === id){
          //      return {...item, done: !item.done }
          //    }
          //    return {...item}
          //  })
          //  sethtask(newmdata)
          let newdonedata = [...udata.done]
          // console.log("donedata",newdonedata)
          if(udata.done.includes(id)){
            newdonedata = newdonedata.filter(item=>{
              if(item !== id){
                return item
              }
              return null
            })
          }else if(!udata.done.includes(id)){
            newdonedata = [...newdonedata,id]
          }
          if(!newdonedata){
            newdonedata = []
          }
          localStorage.setItem('done', JSON.stringify(newdonedata))
          console.log(newdonedata)
          setdonedata(newdonedata)
          if(user){
          db.collection('users').doc(user.uid).update({
            done : [...newdonedata]
          })
          // .then(doc=>{
          //   console.log(doc)
          // })
          .catch(err=>{console.log(err)})}
  }

  return (
    <UserContext.Provider value={{userdata:{
      udata:user,loading:uloading,error:uerror
    },userconfig: udata }}>
    <HtaskContext.Provider value={{Htaskdata:htask,Htaskloading:loading}}>
    <ChakraProvider theme={customTheme} >
    <BrowserRouter>
{offlinemode &&    <Alert status="warning" justifyContent="flex-end">
      <AlertIcon/>
      offlinemode is on
      <Box marginLeft={8}>
      <Button colorScheme="teal" mr={8} onClick={()=>setofflinemode(false)}>online</Button>        
      </Box>

    </Alert>}
    <NavBar/>
    <Switch>
      <Route path="/" exact>
      <Home/>
      </Route>
      <Route path="/login" exact>
      {uloading ? <LoadingPage/>   : user && !uloading ? <Redirect to="/user"/>: <Login/> }
      </Route>
      
      <Route path="/register" exact>
      {uloading ? <LoadingPage/>   : user && !uloading ? <Redirect to="/user"/>: <Register/> }
        
      </Route>
      <Route path="/add" exact>
      {uloading ? <LoadingPage/>   : user && !uloading ?  <Add/> : <Redirect to="/login"/>}
        {/* <Add/> */}
      </Route>
      <Route path="/homework/:hid">
        <Homework markdonedata={markdonedata}/>
      </Route>
      <Route path="/edit/:hid">
        {uloading ? <LoadingPage/>  : user && !uloading ? <Edit/> : <Redirect to="/"/> }
      </Route>
      <Route path="/subject/:cid">
        <Subject/>
      </Route>
      <Route path="/user" exact>
        {uloading ? <LoadingPage/>   : user && !uloading ? <User/> : <Redirect to="/login"/>}
      </Route>
    </Switch>
    <footer></footer>
    </BrowserRouter>
    </ChakraProvider>
    </HtaskContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
