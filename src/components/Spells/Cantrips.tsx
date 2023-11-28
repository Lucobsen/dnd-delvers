import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { Hero } from "../../models/hero.models";
import { TextList } from "../shared/TextList";
import { useParams } from "react-router-dom";
import { updateHero } from "../../store/slices/HeroHoardSlice";

export const Cantrips = () => {
  const { id } = useParams();
  const hero = useAppSelector((state) =>
    state.heroHoard.find(({ id: heroId }) => heroId === id)
  );
  const dispatch = useAppDispatch();

  if (!hero) return null;

  const { spells } = hero;

  const handleDeleteCantrip = (index: number) => {
    const tempCantrips = [...spells.cantrips];
    tempCantrips.splice(index, 1);

    const updatedHero: Hero = {
      ...hero,
      spells: { ...spells, cantrips: [...tempCantrips] },
    };
    dispatch(updateHero(updatedHero));
  };

  const handleUpdateCantrip = (value: string, index: number) => {
    const tempCantrips = [...spells.cantrips];
    tempCantrips[index] = value;

    const updatedHero: Hero = {
      ...hero,
      spells: { ...spells, cantrips: [...tempCantrips] },
    };
    dispatch(updateHero(updatedHero));
  };

  const handleAddCantrip = (newCantrip: string) => {
    const updatedHero: Hero = {
      ...hero,
      spells: { ...spells, cantrips: [...spells.cantrips, newCantrip] },
    };
    dispatch(updateHero(updatedHero));
  };

  return (
    <TextList
      onDelete={handleDeleteCantrip}
      onUpdate={handleUpdateCantrip}
      onAdd={handleAddCantrip}
      title="Cantrips"
      placeholder="Add Cantrip"
      items={spells.cantrips}
    />
  );
};
