import React, { ReactElement, ReactNode } from "react";
import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightAddon
} from "@chakra-ui/react";
import { BsSearch } from "react-icons/bs";
import { IoFilter } from "react-icons/io5";

export const SearchBar = () => {
  return (
    <>
      <Box width={'20rem'} textAlign={'left'}>
        <InputGroup borderRadius={5} size="sm">
          <InputLeftElement
            pointerEvents="none"
            children={<BsSearch color="gray.600" />}
          />
          <Input type="text" placeholder="Search by..." border="1px solid #949494" />
          <InputRightAddon
            p={0}
            border="none"
          >
            <Button size="sm" borderLeftRadius={0} borderRightRadius={3.3} border="1px solid #949494">
              <IoFilter/>
              Filter
            </Button>
          </InputRightAddon>
        </InputGroup>
      </Box>
    </>
  );
};