import { Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const user = useSelector((state) => state.user.authData);
  const navigate = useNavigate();

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
