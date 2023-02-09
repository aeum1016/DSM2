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
  Link,
  IconButton,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { signupThunk } from "../../slices/user";

export default function SignupCard() {
  const dispatch = useDispatch();

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
    console.log(formData);
    const user = await dispatch(signupThunk(formData));
  };

  return (
    <Flex minH={"100%"} align={"center"} justify={"center"}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign Up
          </Heading>
          <Text fontSize={"lg"} fontWeight={"medium"} color={"brandDark.600"}>
            to do some math
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          //   bg={useColorModeValue("brandLight.100", "brandDark.700")}
          bg={"brandDark.700"}
          boxShadow={"lg"}
          p={8}
        >
          <form onSubmit={handleSubmit}>
            <Stack spacing={4} minW="20rem">
              <FormControl id="username" isRequired>
                <FormLabel>Username</FormLabel>
                <Input
                  focusBorderColor="brandDark.800"
                  type="text"
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input
                  focusBorderColor="brandDark.800"
                  type="email"
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    focusBorderColor="brandDark.800"
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
                  bg={"brandDark.800"}
                  color={"white"}
                  _hover={{
                    bg: "brandDark.900",
                  }}
                  _active={{
                    bg: "brandDark.400",
                  }}
                >
                  Sign up
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={"center"}>
                  Already a user? <Link color={"blue.400"}>Login</Link>
                </Text>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
