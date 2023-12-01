import { Container, TextareaAutosize, Typography } from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { useParams } from "react-router-dom";
import { updateHero } from "../store/slices/HeroHoardSlice";
import { Hero } from "../models/hero.models";
import { Languages } from "../components/Languages/Languages";

const Feats = () => {
  const { id } = useParams();
  const hero = useAppSelector((state) =>
    state.heroHoard.find(({ id: heroId }) => heroId === id)
  );
  const dispatch = useAppDispatch();

  if (!hero) return null;

  const { feats } = hero;

  const handleUpdateFeats = (newFeats: string) => {
    const updatedHero: Hero = { ...hero, feats: newFeats };
    dispatch(updateHero(updatedHero));
  };

  return (
    <Container sx={{ my: 6 }}>
      <Typography color="rgb(25, 118, 210)" variant="h6" align="left">
        Features & Traits
      </Typography>
      <TextareaAutosize
        placeholder="Record your features and traits here hero!"
        minRows={20}
        onChange={({ target }) => handleUpdateFeats(target.value)}
        defaultValue={feats}
        style={{ width: "100%" }}
      />
      <Languages />
    </Container>
  );
};

export default Feats;
