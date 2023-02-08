import React from "react";
import {
  Button,
  Flex,
  Heading,
  HStack,
  IconButton,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { FaHome, FaTrophy, FaUser } from "react-icons/fa";
import { motion } from "framer-motion";
import { Outlet } from "react-router-dom";

const Navbar = () => {
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
              background: "brandDark.800",
            }}
            _active={{
              transform: "scale(0.98)",
            }}
          />
          <IconButton
            color="brandLight.100"
            variant="ghost"
            fontSize="20px"
            icon={<FaTrophy />}
            _hover={{
              background: "brandDark.800",
            }}
            _active={{
              transform: "scale(0.98)",
            }}
          />
          <Flex
            align="center"
            as={motion.div}
            whileHover={{
              background: "brandDark.800",
            }}
            whileTap={{
              scale: 0.98,
            }}
          >
            <IconButton
              color="brandLight.100"
              variant="ghost"
              fontSize="20px"
              icon={<FaUser />}
              _hover={{
                background: "brandDark.800",
              }}
              _active={{
                background: "brandDark.800",
              }}
            />
            <Text
              color="brandLight.100"
              fontWeight="bold"
              cursor="pointer"
              _hover={{
                background: "brandDark.800",
              }}
              _active={{
                background: "brandDark.800",
              }}
            >
              Sign Up
            </Text>
          </Flex>
        </HStack>
      </Flex>
      <Flex height="100%" justify="center" align="center">
        <Outlet />
      </Flex>
    </Flex>
  );
};

export default Navbar;
