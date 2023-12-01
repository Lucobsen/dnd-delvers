import React from "react";
import { TextList } from "../shared/TextList";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { useParams } from "react-router-dom";
import { updateHero } from "../../store/slices/HeroHoardSlice";
import { Hero } from "../../models/hero.models";
import { Container, Paper } from "@mui/material";

export const Equipment = () => {
  const { id } = useParams();
  const hero = useAppSelector((state) =>
    state.heroHoard.find(({ id: heroId }) => heroId === id)
  );
  const dispatch = useAppDispatch();

  if (!hero) return null;

  const { equipment } = hero;

  const handleDeleteEquipment = (index: number) => {
    const tempEquipment = [...equipment];
    tempEquipment.splice(index, 1);

    const updatedHero: Hero = { ...hero, equipment: [...tempEquipment] };
    dispatch(updateHero(updatedHero));
  };

  const handleUpdateEquipment = (value: string, index: number) => {
    const tempEquipment = [...equipment];
    tempEquipment[index] = value;

    const updatedHero: Hero = { ...hero, equipment: [...tempEquipment] };
    dispatch(updateHero(updatedHero));
  };

  const handleAddEquipment = (newEquipment: string) => {
    const updatedHero: Hero = {
      ...hero,
      equipment: [...equipment, newEquipment],
    };
    dispatch(updateHero(updatedHero));
  };

  return (
    <Container component={Paper} sx={{ mb: 1 }}>
      <TextList
        onDelete={handleDeleteEquipment}
        onUpdate={handleUpdateEquipment}
        onAdd={handleAddEquipment}
        title="Equipment"
        placeholder="Add equipment"
        items={equipment}
      />
    </Container>
  );
};
