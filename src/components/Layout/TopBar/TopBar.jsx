import {
  Flex,
  Menu,
  MenuButton,
  Button,
  Avatar,
  MenuList,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react";
import TopBarButton from "./TopBarButton";

const TopBar = (props) => {
  return (
    <Flex
      bg="#2D3748"
      w="100%"
      h="5rem"
      pr="2rem"
      position="absolute"
      flexDirection="row-reverse"
      alignItems="center"
      color="white"
    >
      <Menu>
        <MenuButton
          as={Button}
          rounded={"full"}
          variant={"link"}
          cursor={"pointer"}
          minW={0}
        >
          <Avatar
            size={"sm"}
            src={
              "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
            }
          />
        </MenuButton>
        <MenuList>
          <MenuItem>Link 1</MenuItem>
          <MenuItem>Link 2</MenuItem>
          <MenuDivider />
          <MenuItem>Link 3</MenuItem>
        </MenuList>
      </Menu>
      {props.setSelectedPage === "Usuários" && (
        <TopBarButton text={"Adicionar Usuário +"} />
      )}
    </Flex>
  );
};

export default TopBar;
