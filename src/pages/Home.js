import { Box, Center, Heading, HStack, Input, VStack,Button } from "@chakra-ui/react"
import ClassName from '../json/classname.json'
import LinkedChip from '../components/LinkedChip'
import ItemBox from "../components/ItemBox"
import {useContext,useEffect,useState} from 'react'
import HtaskContext from "../context/HtaskContext"
import {useHistory} from 'react-router-dom'
const Home = ()=>{
    const {Htaskdata} = useContext(HtaskContext)
    const [hdatevalue, sethdatevalue] = useState([])
    const [rawhdatevalue, setrawhdatevalue] = useState([])
    const [searchtext,setsearchtext] = useState(null)
    const history = useHistory()
    const [isloading,setisloading] = useState(true)
    const [ismoreday,setismoreday] = useState(null)
    const checksetismoreday = (bool)=>{
        if(bool !== ismoreday){
            setismoreday(bool)
        }
    }
    const countdown = (dueDate)=>{
        const today = new Date()
        const target = new Date(dueDate)
        const one_day=1000*60*60*24;
        const dayleft = Math.ceil((target.getTime()-today.getTime())/(one_day))
        // console.log(dueDate + " " + dayleft)
        if(dayleft < 0){
            checksetismoreday(false)
            return false
        }
        return true
    }
    
    const comparedate = (a,b)=>{
        if(a !== b){
            return a
        }else{
            return b
        }
    }
    
    useEffect(()=>{
        // console.log(Htaskdata)
        if(Htaskdata && !searchtext){
            // console.log(Htaskdata)
            setrawhdatevalue(Htaskdata)
            
        }
        if(Htaskdata && searchtext){
            const ehtask = Htaskdata.filter(item=>{
                if(item.description.includes(searchtext) || item.name.includes(searchtext)){
                    return item
                }
                return null
            })
            // console.log(ehtask)
            setrawhdatevalue(ehtask)
            setisloading(false)
        }
    },[Htaskdata,searchtext])

    useEffect(
        ()=>{
            if(rawhdatevalue.length > 0){
            let arrofday = []
            for(let i = 0; i < rawhdatevalue.length; i++){

                let item;
                if(!rawhdatevalue[i+1] && !rawhdatevalue[i-1]){
                    item = rawhdatevalue[i].dueDate
                }
                else if(rawhdatevalue[i+1]){
                    item = comparedate(rawhdatevalue[i].dueDate,rawhdatevalue[i+1].dueDate)
                }
                else if(!rawhdatevalue[i+1]){
                    item = comparedate(rawhdatevalue[i].dueDate,rawhdatevalue[i-1].dueDate)  
                }
                // console.log(item)
                if(!arrofday.includes(item)){
                    arrofday = [...arrofday,item]
                }
            
            }
            // console.log(arrofday)
            sethdatevalue(arrofday)

        }else if(rawhdatevalue.length === 0){
            sethdatevalue([])
        }
        // setisloading(false)
            
        },[rawhdatevalue]
    )
    // useEffect(()=>{
    //     const timer = setTimeout(()=>{setisloading(false)},[1000])
    //     return ()=>{
    //         clearTimeout(timer)
    //     }
    // },[])
    // console.log(isloading)
    // console.log(hdatevalue)
    
    return(
        <Center>
            
        <Box mt={10} w={["90%","80%","70%","65%"]} mw="sm" >
        <VStack align="left">
        <Heading as="h1" size="4xl" className="colorstrip">การบ้าน</Heading>
        </VStack>
        <Box w="100%"  pt={10} pb={10}   >
        <Input size="lg"  placeholder="Search" className="search-input" onChange={(e)=>{setsearchtext(e.target.value)}} focusBorderColor="#314253"/>            
        </Box>
        <Box overflow={["scroll","hidden","hidden","hidden"]}>
        <HStack wrap={["nowrap","wrap","wrap","wrap"]}>
            {ClassName.map(item=>{
                return(
                    <LinkedChip key={item.s} name={item.c} color={item.co} sub={`/subject/${item.s}`} />
                )
            })}
        </HStack>      
              
        </Box>
        {hdatevalue.length !== 0 && ismoreday !== null && <Box width="100%" mt={10} >
            <Center>
            <Button colorScheme={ismoreday ? "yellow" : "teal"} onClick={()=>{checksetismoreday(!ismoreday)}}>{ismoreday ? "ซ่อนวันก่อนหน้าวันนี้" : "โหลดวันก่อนหน้าวันนี้"}</Button>    
            </Center>
            </Box>}
        {hdatevalue.length === 0 ? <Box w="100%" mt={10}><Center><Heading size="2xl">{isloading ? 'loading' : '404 - ไม่พบไม่เจอการบ้าน'}</Heading> </Center></Box>: hdatevalue.sort().map(item=>(
        <Box mt={5} key={item} display={ismoreday ? "block" : countdown(item) ? "block" : "none"}>
        <VStack>
            <Box width="100%" mt={8} mb={8}>
                <HStack width="100%">
                    <Heading>{item}</Heading>
                    <div style={{display:"flex",flexGrow:"1",backgroundColor:"white",height:"10px"}}></div>
                </HStack>
            </Box>

            
            {rawhdatevalue.map(hitem=>{
                // console.log(hitem)
                if(hitem.dueDate === item){
                return(
                    <div key={hitem._id} style={{width:"100%",zIndex:0}} onClick={()=>{history.push(`/homework/${hitem._id}`)}}>
                <ItemBox hitem={hitem} />
                </div>) }
                return null
            } )
                }
               
            
            
        </VStack>
    </Box>
        ))}



        </Box>
        </Center>

    )
}

export default Home