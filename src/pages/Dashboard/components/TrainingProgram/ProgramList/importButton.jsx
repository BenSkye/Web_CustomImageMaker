import React from 'react';
import { Button } from '@chakra-ui/react';
import { CgImport } from "react-icons/cg";
import { MdOutlineAddCircleOutline } from "react-icons/md";


const RedImportButton = ({ onClick }) => (
    <>
        <Button colorScheme="red" color={'white'} width={'7rem'}>
            <CgImport color='white' />
            Import
        </Button>
    </>
);



export { RedImportButton};