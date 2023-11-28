import { Button, Container, Stack } from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { NavLink } from "react-router-dom";
import { addHero } from "../store/slices/HeroHoardSlice";
import { HeroButton } from "../components/HeroButton/HeroButton";

const Hoard = () => {
  const hoard = useAppSelector((state) => state.heroHoard);
  const dispatch = useAppDispatch();

  const hoardList = Object.values(hoard);
  return (
    <Container sx={{ mt: 10 }}>
      <Stack spacing={4}>
        {hoardList.length > 0 &&
          hoardList.map((hero) => <HeroButton hero={hero} key={hero.id} />)}

        {hoardList.length < 3 && (
          <Button
            fullWidth
            color="success"
            variant="contained"
            onClick={() => dispatch(addHero())}
          >
            Create Hero
          </Button>
        )}
      </Stack>
    </Container>
  );
};

export default Hoard;
