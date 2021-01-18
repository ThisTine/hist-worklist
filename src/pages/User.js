import {Center,Box, VStack,Heading, FormControl, FormLabel, Input, Switch,Button,HStack,Text, Skeleton} from '@chakra-ui/react'

import {useContext} from 'react'
import firebase from '../firebase/firebase'
import UserContext from '../context/UserContext'
const auth = firebase.auth()
const User = ()=>{
    const {userconfig,userdata} = useContext(UserContext)
    const logout = ()=>{
        auth.signOut()
        window.location.reload()
    }
    return(
        <Center>
        <Box mt={10} w={["90%","80%","70%","65%"]} mw="sm" >
        <VStack align="left">
        {userconfig.loading ? <Skeleton width="100%" height="50px" /> : <Heading as="h1" size="4xl" className="colorstrip">สวัสดี  {userconfig.uname}</Heading>}
        </VStack>
        <VStack alignItems="flex-start" mt={10} spacing={5}>
        <Heading>ระบบ user ยังไม่เปิดใช้งาน</Heading>
        <form style={{width:"100%"}}>
        <VStack spacing={10} alignItems="flex-start">
        <FormControl>
        <FormLabel htmlFor="uname">username</FormLabel>
        {userconfig.loading ? <Skeleton width="100%" height="50px" />  :<Input name="uname" size="lg" defaultValue={userconfig.uname} isDisabled placeholder="username"  />      }            
        </FormControl>
        <HStack alignItems="flex-start">
        <Text>Darkmode</Text>
        <Switch colorScheme="purple" size="lg" isDisabled isChecked={true}/>
        </HStack>
        <Box pt={10} width="100%">
         <Button colorScheme="teal" width="100%" size="lg" isDisabled>Save</Button>            
        </Box>

                   
        </VStack>
        </form>
        <Box pt={20} width="100%">
        {userdata.udata && <Button bg="#c53030" size="lg" width={["100%","100%","100%","fit-content"]} onClick={()=>{logout()}} >Logout</Button>      }      
        </Box>

      
        </VStack>

        
        </Box>
        </Center>
    )
}
export default User