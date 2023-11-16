import { Container, TextareaAutosize, Typography } from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { updateFeats } from "../store/slices/HeroSlice";

const Feats = () => {
  const { feats } = useAppSelector((state) => state.hero);
  const dispatch = useAppDispatch();

  const onFeatsChange = (newValue: string) => {
    localStorage.setItem("feats", JSON.stringify(newValue));
    dispatch(updateFeats(newValue));
  };

  return (
    <Container sx={{ my: 6 }}>
      <Typography color="rgb(25, 118, 210)" variant="h6" align="left">
        Features & Traits
      </Typography>
      <TextareaAutosize
        placeholder="Record your features and traits here hero!"
        minRows={20}
        onChange={(event) => onFeatsChange(event.target.value)}
        defaultValue={feats}
        style={{ width: "100%" }}
      />
    </Container>
  );
};

export default Feats;
