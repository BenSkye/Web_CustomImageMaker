import React from 'react';
import { Button } from '@chakra-ui/react';

import { MdOutlineAddCircleOutline } from "react-icons/md";

const BlackAddNewButton = ({onclick}) =>  (
    <>
        <Button colorScheme="green" color={'white'} width={'7rem'}
            marginLeft={'10px'}
        >
            <MdOutlineAddCircleOutline color='white' />
            Add new
        </Button>
    </>
)

export {BlackAddNewButton };