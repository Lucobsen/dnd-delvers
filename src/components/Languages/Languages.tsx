import React from "react";
import { TextList } from "../shared/TextList";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { useParams } from "react-router-dom";
import { updateHero } from "../../store/slices/HeroHoardSlice";
import { Hero } from "../../models/hero.models";
import { Container, Paper } from "@mui/material";

export const Languages = () => {
  const { id } = useParams();
  const hero = useAppSelector((state) =>
    state.heroHoard.find(({ id: heroId }) => heroId === id)
  );
  const dispatch = useAppDispatch();

  if (!hero) return null;

  const { languages } = hero;

  const handleDeleteLanguage = (index: number) => {
    const tempLanguages = [...languages];
    tempLanguages.splice(index, 1);

    const updatedHero: Hero = { ...hero, languages: [...tempLanguages] };
    dispatch(updateHero(updatedHero));
  };

  const handleUpdateLanguage = (value: string, index: number) => {
    const tempLanguages = [...languages];
    tempLanguages[index] = value;

    const updatedHero: Hero = { ...hero, languages: [...tempLanguages] };
    dispatch(updateHero(updatedHero));
  };

  const handleAddLanguage = (newLanguage: string) => {
    const updatedHero: Hero = {
      ...hero,
      languages: [...languages, newLanguage],
    };
    dispatch(updateHero(updatedHero));
  };

  return (
    <Container
      component={Paper}
      sx={{ my: 1, border: "1px solid rgba(0, 0, 0, 0.23)" }}
    >
      <TextList
        onDelete={handleDeleteLanguage}
        onUpdate={handleUpdateLanguage}
        onAdd={handleAddLanguage}
        title="Languages"
        placeholder="Add language"
        items={languages}
      />
    </Container>
  );
};
