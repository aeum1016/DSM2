import React from "react";
import {
  Button,
  Flex,
  Heading,
  HStack,
  IconButton,
  Spacer,
} from "@chakra-ui/react";
import { FaHome, FaTrophy, FaUser } from "react-icons/fa";
import { motion } from "framer-motion";

const Navbar = () => {
  const myColor = "#EDF5FD";
  const myColor2 = "#171B27";

  return (
    <Flex
      direction="horizontal"
      paddingX="40px"
      height="80px"
      align="center"
      width="100vw"
      boxShadow="dark-lg"
    >
      <Heading color={myColor}>DoSomeMath</Heading>
      <Spacer />
      <HStack spacing="16px" align="center">
        <IconButton
          color={myColor}
          variant="ghost"
          fontSize="20px"
          icon={<FaHome />}
          _hover={{
            background: { myColor2 },
            opacity: "0.8",
          }}
          _active={{
            background: { myColor2 },
            transform: "scale(0.98)",
          }}
        />
        <IconButton
          color={myColor}
          variant="ghost"
          fontSize="20px"
          icon={<FaTrophy />}
          _hover={{
            background: { myColor2 },
            opacity: "0.8",
          }}
          _active={{
            background: { myColor2 },
            transform: "scale(0.98)",
          }}
        />
        <Flex
          align="center"
          as={motion.div}
          whileHover={{
            background: { myColor2 },
            opacity: "0.8",
          }}
          whileTap={{
            background: { myColor2 },
            scale: 0.98,
          }}
        >
          <IconButton
            color={myColor}
            variant="ghost"
            fontSize="20px"
            icon={<FaUser />}
            _hover={{
              background: { myColor2 },
            }}
            _active={{
              background: { myColor2 },
            }}
          />
          <Button
            color={myColor}
            variant="ghost"
            fontWeight="bold"
            marginLeft="-18px"
            _hover={{
              background: { myColor2 },
            }}
            _active={{
              background: { myColor2 },
            }}
          >
            Sign Up
          </Button>
        </Flex>
      </HStack>
    </Flex>
  );
};

export default Navbar;
