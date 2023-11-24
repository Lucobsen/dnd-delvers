import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { updateCantrips } from "../../store/slices/HeroSlice";
import { TextList } from "../shared/TextList";

export const Cantrips = () => {
  const { spells } = useAppSelector((state) => state.hero);
  const dispatch = useAppDispatch();

  const handleDeleteCantrip = (index: number) => {
    const tempCantrips = [...spells.cantrips];
    tempCantrips.splice(index, 1);
    dispatch(updateCantrips([...tempCantrips]));
  };

  const handleUpdateCantrip = (value: string, index: number) => {
    const tempCantrips = [...spells.cantrips];
    tempCantrips[index] = value;
    dispatch(updateCantrips([...tempCantrips]));
  };

  const handleAddCantrip = (newCantrip: string) => {
    dispatch(updateCantrips([...spells.cantrips, newCantrip]));
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
