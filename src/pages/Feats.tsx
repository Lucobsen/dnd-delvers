import { Container, TextareaAutosize, Typography } from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { updateFeats } from "../store/slices/HeroSlice";

const Feats = () => {
  const { feats } = useAppSelector((state) => state.hero);
  const dispatch = useAppDispatch();

  return (
    <Container sx={{ my: 6 }}>
      <Typography color="rgb(25, 118, 210)" variant="h6" align="left">
        Features & Traits
      </Typography>
      <TextareaAutosize
        placeholder="Record your features and traits here hero!"
        minRows={20}
        onChange={({ target }) => dispatch(updateFeats(target.value))}
        defaultValue={feats}
        style={{ width: "100%" }}
      />
    </Container>
  );
};

export default Feats;
