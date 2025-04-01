import { useEffect } from "react";
import { Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { reset } from "../../slices/game";

const Landing = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.authData);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(reset());
  }, []);

  useEffect(() => {
    if (user) {
      navigate("/home", { replace: true });
    } else {
      navigate("/signin", { replace: true });
    }
  }, [user]);

  return <Text>Loading...</Text>;
};

export default Landing;
