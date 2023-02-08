import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const passwordsDontMatch = password !== confirmPassword;
  const invalidPassword = password.length < 7;

  return (
    <Box bg="brandDark.700" padding="40px" borderRadius={4} align="center">
      <Heading>Create Your Account</Heading>
      <Text fontSize="xl" fontWeight="medium" pb="25px">
        To Start Playing
      </Text>
      <form onSubmit={handleSubmit}>
        <Stack spacing="16px" align="center">
          <HStack spacing="16px" align="center">
            <FormControl isRequired>
              <FormLabel fontSize="18px">Username</FormLabel>
              <Input
                bg="brandLight.100"
                color="brandDark.800"
                fontWeight="medium"
                onChange={(event) => setUsername(event.currentTarget.value)}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel fontSize="18px">Email</FormLabel>
              <Input
                type="email"
                bg="brandLight.100"
                color="brandDark.800"
                fontWeight="medium"
                onChange={(event) => setEmail(event.currentTarget.value)}
              />
            </FormControl>
          </HStack>
          <FormControl isRequired isInvalid={invalidPassword}>
            <FormLabel fontSize="18px">Password</FormLabel>
            <Input
              type="password"
              bg="brandLight.100"
              color="brandDark.800"
              fontWeight="medium"
              onChange={(event) => setPassword(event.currentTarget.value)}
            />
            <FormErrorMessage>
              Please make sure that your password has more than 7 characters
            </FormErrorMessage>
          </FormControl>
          <FormControl isRequired isInvalid={passwordsDontMatch}>
            <FormLabel fontSize="18px">Confirm Password</FormLabel>
            <Input
              type="password"
              bg="brandLight.100"
              color="brandDark.800"
              fontWeight="medium"
              onChange={(event) =>
                setConfirmPassword(event.currentTarget.value)
              }
            />
            <FormErrorMessage>Passwords do not match</FormErrorMessage>
          </FormControl>
        </Stack>
        <Button
          width="full"
          mt="25px"
          bg="brandDark.800"
          fontSize="18px"
          fontWeight="medium"
          type="submit"
          _hover={{
            background: "brandDark.800",
          }}
          _active={{
            background: "brandDark.900",
          }}
        >
          Sign Up
        </Button>
      </form>
    </Box>
  );
};

export default SignUp;
