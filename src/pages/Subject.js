import { Box, Center, Heading, HStack, Input, VStack } from "@chakra-ui/react"
import ClassName from '../json/classname.json'
import LinkedChip from '../components/LinkedChip'
import ItemBox from "../components/ItemBox"
import {useContext,useEffect,useState} from 'react'
import HtaskContext from "../context/HtaskContext"
import {useHistory,useParams} from 'react-router-dom'
const Subject = ()=>{
    let {cid} = useParams()
    const {Htaskdata} = useContext(HtaskContext)
    const [hdatevalue, sethdatevalue] = useState([])
    const [rawhdatevalue, setrawhdatevalue] = useState([])
    const [searchtext,setsearchtext] = useState(null)
    const history = useHistory()
    const comparedate = (a,b)=>{
        if(a !== b){
            return a
        }else{
            return b
        }
    }
    useEffect(()=>{
        // console.log(Htaskdata)
        if(Htaskdata && !searchtext && cid){
            // console.log(Htaskdata)
            const ehtask = Htaskdata.filter(item=>{
                if(item.subject === cid){
                    return item
                }
                return null
            })
            setrawhdatevalue(ehtask)
        }
        if(Htaskdata && searchtext && cid){
            const ehtask = Htaskdata.filter(item=>{
                if(item.description.includes(searchtext) || item.name.includes(searchtext)){
                    if(item.subject === cid){
                    return item                        
                    }

                }
                return null
            })
            // console.log(ehtask)
            setrawhdatevalue(ehtask)
        }
    },[Htaskdata,searchtext,cid])

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
            
        },[rawhdatevalue]
    )
    
    return(
        <Center>
        <Box mt={10} w={["90%","80%","70%","65%"]} mw="sm" >
        <VStack align="left">
        <Heading as="h1" size="4xl" className="colorstrip">{cid}</Heading>
        </VStack>
        <Box w="100%"  pt={10} pb={10}   >
        <Input size="lg"  placeholder="Search" className="search-input" onChange={(e)=>{setsearchtext(e.target.value)}} focusBorderColor="#314253"/>            
        </Box>
        <Box overflow={["scroll","hidden","hidden","hidden"]}>
        <HStack wrap={["nowrap","wrap","wrap","wrap"]}>
            {ClassName.map(item=>{
                return(
                    <LinkedChip key={item.s} name={item.c} color={cid === item.s ? item.co : "#333"} sub={cid === item.s ? '/' : `/subject/${item.s}`} />
                )
            })}
        </HStack>            
        </Box>

        {hdatevalue.length === 0 ? <Box w="100%" mt={10}><Center><Heading as="h2" fontSize="2xl">404 - ไม่พบไม่เจอการบ้าน</Heading> </Center></Box>: hdatevalue.map(item=>(
        <Box mt={5} key={item}>
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

export default Subject