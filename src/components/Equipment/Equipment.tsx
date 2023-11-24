import React from "react";
import { TextList } from "../shared/TextList";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { updateEquipment } from "../../store/slices/HeroSlice";

export const Equipment = () => {
  const { equipment } = useAppSelector((state) => state.hero);
  const dispatch = useAppDispatch();

  const handleDeleteEquipment = (index: number) => {
    const tempEquipment = [...equipment];
    tempEquipment.splice(index, 1);
    dispatch(updateEquipment([...tempEquipment]));
  };

  const handleUpdateEquipment = (value: string, index: number) => {
    const tempEquipment = [...equipment];
    tempEquipment[index] = value;
    dispatch(updateEquipment([...tempEquipment]));
  };

  const handleAddEquipment = (newEquipment: string) => {
    dispatch(updateEquipment([...equipment, newEquipment]));
  };

  return (
    <TextList
      onDelete={handleDeleteEquipment}
      onUpdate={handleUpdateEquipment}
      onAdd={handleAddEquipment}
      title="Equipment"
      items={equipment}
    />
  );
};
