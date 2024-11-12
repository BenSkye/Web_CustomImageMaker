import React from 'react';
import { Button, ChakraProvider, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';

const EllipsisButton = () => {
  return (
    <ChakraProvider>
      <Menu>
        <MenuButton as={Button}>
          ...
        </MenuButton>
        <MenuList>
          <MenuItem>Training material</MenuItem>
          <MenuItem>Edit program</MenuItem>
          <MenuItem>Dublicate program</MenuItem>
          <MenuItem>De-activate program</MenuItem>
          <MenuItem>Delete program</MenuItem>
        </MenuList>
      </Menu>
    </ChakraProvider>
  );
};

export default EllipsisButton;