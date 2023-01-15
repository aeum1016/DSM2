import React, { useState, useEffect } from "react";
import { Box, Heading } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import decode from "jwt-decode";

import { usersSlice } from "../../slices/user";

const Navbar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { logout } = usersSlice.actions;

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) {
        dispatch(logout());
        setUser(null);
      }
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <Box bg="blue">
      <Heading color="black">This is my user: {user?.token}</Heading>
    </Box>
  );
};

export default Navbar;
