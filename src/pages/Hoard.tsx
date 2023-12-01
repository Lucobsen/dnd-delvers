import { Button, Container, Stack } from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { addHero } from "../store/slices/HeroHoardSlice";
import { HeroButton } from "../components/Buttons/HeroButton";

const Hoard = () => {
  const hoard = useAppSelector((state) => state.heroHoard);
  const dispatch = useAppDispatch();

  return (
    <Container sx={{ mt: 10 }}>
      <Stack spacing={4}>
        {hoard.length > 0 &&
          hoard.map(({ id, name }) => (
            <HeroButton id={id} name={name} key={id} />
          ))}
      </Stack>
      <Button
        disabled={hoard.length >= 5}
        color="success"
        variant="contained"
        sx={{ borderRadius: 10, fontSize: "12px", mt: 2 }}
        onClick={() => dispatch(addHero())}
      >
        Create Hero
      </Button>
    </Container>
  );
};

export default Hoard;
