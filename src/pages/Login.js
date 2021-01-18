import {Center,Box, VStack,Heading, FormControl, FormLabel, Input, FormErrorMessage,Button,Link,Stack,SlideFade,Alert,AlertIcon} from '@chakra-ui/react'
import { useForm } from "react-hook-form";
import { Link as ReachLink,useHistory  } from 'react-router-dom';
import firebase from '../firebase/firebase'
import {useState,useEffect} from 'react'
const auth = firebase.auth()
const Login = ()=>{
    const history = useHistory()
    const {register,handleSubmit,errors,reset} = useForm()
    const [isSubmitting,setisSubmitting] = useState(false)
    const [message,setmessage] = useState(null)
    const loginSubmit = (data)=>{
        // console.log(data)
        setisSubmitting(true)
        auth.signInWithEmailAndPassword(data.email,data.pwd).then((data)=>{

           setTimeout(() => {
            setisSubmitting(false)
            reset()
            history.push('/user')
           }, 200); 
        }).catch((err)=>{
            setisSubmitting(false)
            setmessage({status:'error',m:err.message})
            console.log(err)
        })

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
        <Heading as="h1" size="4xl" className="colorstrip">Login</Heading>
        </VStack>
        <VStack width="100%" mt={10}>
        <form style={{width:"100%"}} onSubmit={handleSubmit(loginSubmit)}>
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
            <Stack align="left" direction={["column","column","column","row"]} >
            <Button mt={3} colorScheme="teal" width={['100%','100%','100%','fit-content']} isLoading={isSubmitting} type="submit" >Login</Button>
            <Box pt={5} width="fit-content">
            <Link to="/register"  as={ReachLink}>Register</Link>                   
            </Box>
             
            </Stack>

        </form>
        </VStack>
        </Box>
        </Center>
    )
}
export default Login