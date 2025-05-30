import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  IconButton,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { signupThunk } from "../../slices/user";
import { Link as ReactLink, redirect, useNavigate } from "react-router-dom";

export default function SignupCard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.authData);

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(signupThunk(formData));
  };

  useEffect(() => {
    if (user) {
      navigate("/home", { replace: true });
    }
  }, [user]);

  return (
    <Flex minH={"100%"} align={"center"} justify={"center"}>
      <Stack spacing={4} mx={"auto"} maxW={"lg"}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign Up
          </Heading>
          <Text fontSize={"lg"} fontWeight={"medium"} color={"brandDark.600"}>
            to do some math
          </Text>
        </Stack>
        <Box rounded={"lg"}>
          <form onSubmit={handleSubmit}>
            <Stack spacing={4} minW="20rem">
              <FormControl id="username" isRequired>
                <FormLabel>Username</FormLabel>
                <Input
                  borderColor="brandDark.300"
                  focusBorderColor="brandDark.400"
                  type="text"
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input
                  borderColor="brandDark.300"
                  focusBorderColor="brandDark.400"
                  type="email"
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    borderColor="brandDark.300"
                    focusBorderColor="brandDark.400"
                    type={showPassword ? "text" : "password"}
                    onChange={handleChange}
                  />
                  <InputRightElement h={"full"}>
                    {showPassword ? (
                      <IconButton
                        color="brandLight.100"
                        variant="ghost"
                        fontSize="20px"
                        size="sm"
                        icon={<FaEye />}
                        onClick={() =>
                          setShowPassword((showPassword) => !showPassword)
                        }
                        _hover={{
                          bg: "brandDark.400",
                        }}
                        _active={{
                          bg: "brandDark.400",
                        }}
                      />
                    ) : (
                      <IconButton
                        color="brandLight.100"
                        variant="ghost"
                        fontSize="20px"
                        size="sm"
                        icon={<FaEyeSlash />}
                        onClick={() =>
                          setShowPassword((showPassword) => !showPassword)
                        }
                        _hover={{
                          bg: "brandDark.400",
                        }}
                        _active={{
                          bg: "brandDark.400",
                        }}
                      />
                    )}
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  type="submit"
                  loadingText="Submitting"
                  size="lg"
                  bg={"brandDark.600"}
                  color={"white"}
                  _hover={{
                    bg: "brandDark.700",
                  }}
                  _active={{
                    bg: "brandDark.600",
                  }}
                >
                  Sign up
                </Button>
              </Stack>
              <Stack align={"center"}>
                <ReactLink to="/signin">
                  <Text color={"brandDark.200"} fontWeight={"medium"}>
                    Already a user?
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
