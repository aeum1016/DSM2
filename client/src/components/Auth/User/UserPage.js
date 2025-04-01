import { Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { reset } from "../../../slices/game";

const User = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(reset());
  }, []);

  return <Text>User Page under construction...</Text>;
};

export default User;
