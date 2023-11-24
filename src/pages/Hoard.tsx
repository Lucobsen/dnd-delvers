import { Button, Container, Stack } from "@mui/material";
import React from "react";
import { useAppSelector } from "../hooks/hooks";
import { NavLink } from "react-router-dom";

const Hoard = () => {
  const { id, name } = useAppSelector((state) => state.hero);

  return (
    <Container sx={{ mt: 10 }}>
      <Stack>
        <NavLink to={`../${id}/details`}>
          <Button variant="outlined">
            {name === "" ? "Create New Hero" : name}
          </Button>
        </NavLink>
      </Stack>
    </Container>
  );
};

export default Hoard;
