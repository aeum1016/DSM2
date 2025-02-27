import React from "react";
import { Flex, Heading, HStack, IconButton, Spacer } from "@chakra-ui/react";
import { FaHome, FaTrophy, FaUser } from "react-icons/fa";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <Flex direction="column" minH="100%" minW="100%">
      <Flex
        direction="row"
        padding="20px 40px"
        align="center"
        boxShadow="dark-lg"
      >
        <Heading>DoSomeMath</Heading>
        <Spacer />
        <HStack spacing="16px" align="center">
          <IconButton
            color="brandLight.100"
            variant="ghost"
            fontSize="20px"
            icon={<FaHome />}
            _hover={{
              color: "brandDark.200",
            }}
            _active={{
              transform: "scale(0.95)",
            }}
            onClick={() => navigate("/home")}
          />
          <IconButton
            color="brandLight.100"
            variant="ghost"
            fontSize="20px"
            icon={<FaTrophy />}
            _hover={{
              color: "brandDark.200",
            }}
            _active={{
              transform: "scale(0.95)",
            }}
            onClick={() => navigate("/leaderboard")}
          />
          <IconButton
            color="brandLight.100"
            variant="ghost"
            fontSize="20px"
            icon={<FaUser />}
            _hover={{
              color: "brandDark.200",
            }}
            _active={{
              transform: "scale(0.95)",
            }}
            onSubmit={() => navigate("/user")}
          />
        </HStack>
      </Flex>
      <Flex height="100%" justify="center" align="center">
        <Outlet />
      </Flex>
    </Flex>
  );
};

export default Navbar;
