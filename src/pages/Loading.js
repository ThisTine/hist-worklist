import { Box, Skeleton, VStack,Center, Spinner } from "@chakra-ui/react"

const LoadingPage = ()=>{
    return(
        <Center>
        <Box mt={10} w={["90%","80%","70%","65%"]} mw="sm" h="75vh" >
            <VStack height="100%" justifyContent="center" >
                <Box mt={8} mb={10}>
                <Spinner size="xl"/>
                </Box>
                
                {/* <Heading alignItems="center">Hist</Heading> */}
                <Skeleton h="20px" w="100%"/>
                <Skeleton h="20px" w="100%"/>
                <Skeleton h="20px" w="100%"/>
                <Skeleton h="20px" w="100%"/>

            </VStack>
        </Box>
        </Center>
    )
}
export default LoadingPage