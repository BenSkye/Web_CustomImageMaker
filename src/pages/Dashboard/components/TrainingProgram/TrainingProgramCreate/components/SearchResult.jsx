import { React } from 'react';
import { Box } from "@chakra-ui/react";

export const SearchResult = ({ searchResult, setSyllabusID, addSelectedOption}) => {
    return (
        <>
            <Box 
            marginTop={'10px'}
            bgColor={'#FFFFFF'}
            _hover={{ backgroundColor: '#ECECEC' }}
            color={'#000000'}
            borderRadius={'8px'}
            padding={'5px'}
            shadow={'md'}
            width={'100%'}
            onClick={(searchResult) => setSyllabusID(searchResult.topicCode).then(() => addSelectedOption())}
            >{searchResult.topicName}</Box>
        </>
    )
}