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
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as ReactLink, useNavigate } from "react-router-dom";

import { signinThunk } from "../../slices/user";

export default function SigninCard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const user = useSelector((state) => state.user.authData);

  useEffect(() => {
    if (user) {
      navigate("/home", { replace: true });
    }
  }, [user]);

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
          <Heading fontSize={"4xl"}>Sign in</Heading>
          <Text fontSize={"lg"} fontWeight={"medium"} color={"brandDark.600"}>
            and do some math
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
