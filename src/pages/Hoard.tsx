import {
  Button,
  Container,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { addHero } from "../store/slices/HeroHoardSlice";
import { HeroButton } from "../components/Buttons/HeroButton";
import { NavBar } from "../components/Navbar/Navbar";
import { Sidebar } from "../components/Sidebar/Sidebar";

const Hoard = () => {
  const { breakpoints } = useTheme();
  const isMobile = useMediaQuery(breakpoints.down("sm"));

  const hoard = useAppSelector((state) => state.heroHoard);
  const dispatch = useAppDispatch();

  return (
    <>
      {isMobile ? <NavBar /> : <Sidebar />}
      <Container sx={{ mt: 2 }}>
        <Stack spacing={4}>
          {hoard.length > 0 &&
            hoard.map(({ id, name, classId, level, race }) => (
              <HeroButton
                id={id}
                name={name}
                key={id}
                classId={classId}
                level={level}
                race={race}
              />
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
    </>
  );
};

export default Hoard;
