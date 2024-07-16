import { Button } from "@chakra-ui/react";
import React from "react";

function SideBarButton(props) {
  return (
    <Button
      id="side-bar-button"
      onClick={props.uiOpen}
      color="white"
      bg="none"
      shadow="none"
      w="100%"
      h={10}
      justifyContent="flex-start"
      alignItems="center"
      lineHeight='1rem'
      style={{
        backgroundColor: props.isSelected === props.number ? "#DC3545" : "",
      }}
      _hover={{ bg: "#475671", boxShadow: "none", border: "none" }}
    >
      <i style={{ color: "white", marginRight: ".5rem" }}>{props.icon}</i>
      <span style={{ marginBottom: ".25rem" }}>{props.text}</span>
      <i id="right-icon" style={{ color: "white" }}>{props.icon}</i>
    </Button>
  );
}

export default SideBarButton;
