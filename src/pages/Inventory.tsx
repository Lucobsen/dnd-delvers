import { Container, Stack } from "@mui/material";
import React from "react";
import { TextBox } from "../components/shared/TextBox";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import {
  updateCopperPieces,
  updateGoldPieces,
  updatePlatinumPieces,
  updateSilverPieces,
} from "../store/slices/HeroSlice";

const Inventory = () => {
  const { coin } = useAppSelector((state) => state.hero);
  const dispatch = useAppDispatch();

  return (
    <Container sx={{ mt: 7 }}>
      <Stack direction="row" spacing={1}>
        <TextBox
          label="CP"
          value={coin.cp}
          isNumber
          onChange={(value) => dispatch(updateCopperPieces(value))}
        />
        <TextBox
          label="SP"
          value={coin.sp}
          isNumber
          onChange={(value) => dispatch(updateSilverPieces(value))}
        />
        <TextBox
          label="GP"
          value={coin.gp}
          isNumber
          onChange={(value) => dispatch(updateGoldPieces(value))}
        />
        <TextBox
          label="PP"
          value={coin.pp}
          isNumber
          onChange={(value) => dispatch(updatePlatinumPieces(value))}
        />
      </Stack>
    </Container>
  );
};

export default Inventory;
