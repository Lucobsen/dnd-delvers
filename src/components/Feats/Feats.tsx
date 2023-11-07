import { Dialog, TextareaAutosize } from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { updateFeats } from "../../store/slices/HeroSlice";

interface FeatsProps {
  open: boolean;
  onClose: () => void;
}

export const Feats = ({ open, onClose }: FeatsProps) => {
  const { feats } = useAppSelector((state) => state.hero);
  const dispatch = useAppDispatch();

  const onFeatsChange = (newValue: string) => {
    localStorage.setItem("feats", JSON.stringify(newValue));
    dispatch(updateFeats(newValue));
  };

  return (
    <Dialog onClose={onClose} open={open} fullWidth>
      <TextareaAutosize
        placeholder="Record your features and traits here hero!"
        minRows={100}
        onChange={(event) => onFeatsChange(event.target.value)}
        defaultValue={feats}
      />
    </Dialog>
  );
};
