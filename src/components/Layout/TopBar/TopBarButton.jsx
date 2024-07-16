import { Button } from "@chakra-ui/react";

function TopBarButton(props) {
  return (
    <Button mr="1rem" h="2rem" boxShadow="none" colorScheme="red">
      {props.text}
    </Button>
  );
}

export default TopBarButton;
