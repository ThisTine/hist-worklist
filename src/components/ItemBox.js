import { Box, HStack,Heading,Text,VStack } from "@chakra-ui/react"
// import LinkedChip from "./LinkedChip"
import Chip from "./Chip"
import clas from '../json/classname.json'
const ItemBox = ({hitem})=>{
    const {description,name,done,dueDate,subject} = hitem
    const text = description
    const stem = clas.filter(i=>{
        if(subject === i.s){
            return i
        }
        return null
    })
    const countdown = (dueDate)=>{
        const today = new Date()
        const target = new Date(dueDate)
        const one_day=1000*60*60*24;
        let color = "green"
        const dayleft = Math.ceil((target.getTime()-today.getTime())/(one_day))
        if(dayleft<5){
            color = "orange"
        }
        if(dayleft < 2){
            color = "red"
        }
        if(dayleft < 0){
            color = "purple"
        }
        if(dayleft > 1){
            return({m:dayleft+" days left",co:color})
        }
        if(dayleft === 1 || dayleft === 0){
            return({m:dayleft+" day left",co:color})
        }if(dayleft === -1){
            return({m:dayleft+" day late",co:color})
        }
        if(dayleft < -1){
            return({m:dayleft+" days late",co:color})
        }
        return({m:dayleft+" days late",co:"green"})
    }
    // console.log(stem)
    
    return(
        <Box borderRadius="20px" mt={8} mb={8} className={done ? 'itembox done' : 'itembox'} width="100%" minH={["250px","250px","250px","200px"]} p="20px">
            <VStack justifyContent="space-between" height={["250px","250px","250px","200px"]}width="100%" alignItems="flex-start">
            <VStack width="100%" alignItems="flex-start">
            <Heading whiteSpace="normal" width="100%">{name}</Heading>
            <Box height="70px" width="100%" overflow="hidden">
            {text.split("\n").map(i=><Text key={i}>{i}</Text>)}
            </Box>

            </VStack>
            <HStack width="100%" justifyContent="space-between">
                <Chip name={stem[0].c} color={stem[0].co}/>
                <HStack >
                    {/* <Box display={['none','none','block','block']}>
                    <LinkedChip name="Edit" color="darkyellow" sub={`/edit/${_id}`}/>                        
                    </Box> */}
                    <Chip name={countdown(dueDate).m} color={countdown(dueDate).co}/>
                </HStack>
            </HStack>                
            </VStack>

        </Box>
    )
}

export default ItemBox