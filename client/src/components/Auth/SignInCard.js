import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { signinThunk } from "../../slices/user";
import { Link as ReactLink } from "react-router-dom";

export default function SigninCard() {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(signinThunk(formData));
  };

  return (
    <Flex minH={"100%"} align={"center"} justify={"center"}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          <Text fontSize={"lg"} fontWeight={"medium"} color={"brandDark.600"}>
            to do some math
          </Text>
        </Stack>
        <Box rounded={"lg"} bg={"brandDark.700"} boxShadow={"lg"} p={8}>
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <FormControl id="username">
                <FormLabel>Username</FormLabel>
                <Input
                  focusBorderColor="brandDark.400"
                  type="text"
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input
                  focusBorderColor="brandDark.400"
                  type="password"
                  onChange={handleChange}
                />
              </FormControl>
              <Stack spacing={10}>
                <Button
                  type="submit"
                  loadingText="Submitting"
                  size="lg"
                  bg={"brandDark.800"}
                  color={"white"}
                  _hover={{
                    bg: "brandDark.900",
                  }}
                  _active={{
                    bg: "brandDark.800",
                  }}
                >
                  Sign in
                </Button>
              </Stack>
              <Stack align={"center"}>
                <ReactLink to="/signup">
                  <Text color={"brandDark.200"} fontWeight={"medium"}>
                    Create an Account
                  </Text>
                </ReactLink>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
