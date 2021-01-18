import {Center,Box, VStack,Heading, FormControl, FormLabel, Input, FormErrorMessage,Button,Link,Stack,SlideFade,Alert,AlertIcon} from '@chakra-ui/react'
import { useForm } from "react-hook-form";
import { Link as ReachLink  } from 'react-router-dom';
import {useState,useEffect} from 'react'
import firebase from '../firebase/firebase'
import {useHistory} from 'react-router-dom'

const Register = ()=>{
    const history = useHistory()
    const [ucount,setcount] = useState(0)
    const {register,handleSubmit,errors,reset} = useForm()
    const [message,setmessage] = useState()
    const [issubmiting,setissubmiting] = useState(false)
    const regSubmit = (data)=>{
        setissubmiting(true)
        const auth = firebase.auth()
        const db = firebase.firestore()
        auth.createUserWithEmailAndPassword(
            data.email,
            data.pwd
        ).then(res=>{
            return db.collection('users').doc(res.user.uid).set({
                uname: data.uname,
                done : []
            }).then(res=>{
                setcount(0)
                reset()
                setissubmiting(false)
                history.push('/login')
            })
        }).catch(err=>{
            console.log(err)
            setmessage({
                status:"error",
                m:err.message
            })
            setissubmiting(false)
        })
        // console.log(data)

    }
    useEffect(() => {
        if(message){
            const timer = setTimeout(()=>{setmessage(null)},5000)
        return () => {
            clearTimeout(timer)
        }}
    }, [message])
    const Vemail = (val)=>{
        if(!val.includes("@")){
            return("อีเมล์จำเป็นต้องมี @")
        }
        else{
            return true
        }
    }
    const Vuname = (val) =>{
        // console.log(val.length)
        if(val.length > 20){
            return("Username ยาวเกิน 20 ตัวอักษร")
        }
        else{
            return true
        }
    }
    const vsc = (val) =>{
        if(val !== "YOUR GROUP SECRETKEY"){
            return("โค้ดไม่ถูกต้อง กรุณาดูกลุ่มห้องนะ")
        }
        else{
            return true
        }
    }
    return(
        <Center>
        <Box position="fixed" top="0" right="0" zIndex="999">
        <SlideFade in={message ? true : false}>
        <Alert  status={message ? message.status : "error"} variant="solid">
        <AlertIcon />
            {message ? message.m : "error"}</Alert>            
        </SlideFade>   
        </Box> 
        <Box mt={10} w={["90%","80%","70%","65%"]} mw="sm" >
        <VStack align="left">
        <Heading as="h1" size="3xl" className="colorstrip">Registration</Heading>
        </VStack>
        <VStack width="100%" mt={10}>
        <form style={{width:"100%"}} onSubmit={handleSubmit(regSubmit)}>
            <FormControl mt={8} mb={8} isInvalid={errors.uname}>
                <FormLabel htmlFor="uname">Username ({ucount > 20 ? <span style={{color:"red"}}>{ucount}</span> : ucount}/20)</FormLabel>
                <Input autoComplete="none" name="uname" placeholder="username" size="lg" ref={register({required:true,validate:Vuname})} className="search-input" focusBorderColor="#9b59b6" onChange={(e)=>{setcount(e.target.value.length)}}/>
                <FormErrorMessage>
                {errors.email && errors.email.type === "required" && "กรุณากรอก Username"}
                </FormErrorMessage>
            </FormControl>
            <FormControl mt={8} mb={8} isInvalid={errors.email}>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input name="email" placeholder="email"  size="lg" className="search-input" focusBorderColor="#9b59b6" ref={register({required:true,validate:Vemail})} />
                <FormErrorMessage>
                    {errors.email && errors.email.type === "required" && "กรุณากรอก Email"}
                    {errors.email && errors.email.type !== "required" && errors.email.message}
                </FormErrorMessage>
            </FormControl>
            <FormControl  mt={8} mb={8} isInvalid={errors.pwd} >
                <FormLabel htmlFor="pwd">Password</FormLabel>
                <Input name="pwd" placeholder="password" type="password" size="lg" className="search-input" focusBorderColor="#9b59b6" ref={register({required:true})}/>
                <FormErrorMessage>
                {errors.pwd && errors.pwd.type === "required" && "กรุณากรอกรหัสผ่าน"}
                </FormErrorMessage>
            </FormControl>
            <FormControl  mt={8} mb={8} isInvalid={errors.ipwd} >
                <FormLabel htmlFor="ipwd">Secret code</FormLabel>
                <Input name="ipwd" placeholder="secret code" type="text" size="lg" className="search-input" focusBorderColor="#9b59b6" ref={register({required:true,validate:vsc})}/>
                <FormErrorMessage>
                {errors.ipwd && errors.ipwd.message}
                </FormErrorMessage>
            </FormControl>
            <Stack align="left" direction={["column","column","column","row"]} >
            <Button mt={3} colorScheme="teal" width={['100%','100%','100%','fit-content']} isLoading={issubmiting} type="submit" >Register</Button>
            <Box pt={5} width="fit-content">
            <Link to="/login"  as={ReachLink}>Login</Link>                   
            </Box>
             
            </Stack>

        </form>
        </VStack>
        </Box>
        </Center>
    )
}
export default Register