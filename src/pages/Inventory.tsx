import { Container, Stack, Typography } from "@mui/material";
import React from "react";
import { TextBox } from "../components/shared/TextBox";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import {
  updateCopperPieces,
  updateGoldPieces,
  updatePlatinumPieces,
  updateSilverPieces,
} from "../store/slices/HeroSlice";

const checkCoinAmount = (newValue: string, currentValue: string) => {
  const amount = Number.parseInt(newValue);

  if (Number.isNaN(amount)) return "";

  if (amount > 999) return currentValue;

  return newValue;
};

const Inventory = () => {
  const { coin } = useAppSelector((state) => state.hero);
  const dispatch = useAppDispatch();

  return (
    <Container sx={{ mt: 6 }}>
      <Typography color="rgb(25, 118, 210)" mb={1} variant="h6" align="left">
        Inventory
      </Typography>
      <Stack direction="row" spacing={1}>
        <TextBox
          label="CP"
          value={coin.cp}
          isNumber
          onChange={(value) =>
            dispatch(updateCopperPieces(checkCoinAmount(value, coin.cp)))
          }
        />
        <TextBox
          label="SP"
          value={coin.sp}
          isNumber
          onChange={(value) =>
            dispatch(updateSilverPieces(checkCoinAmount(value, coin.sp)))
          }
        />
        <TextBox
          label="GP"
          value={coin.gp}
          isNumber
          onChange={(value) =>
            dispatch(updateGoldPieces(checkCoinAmount(value, coin.gp)))
          }
        />
        <TextBox
          label="PP"
          value={coin.pp}
          isNumber
          onChange={(value) =>
            dispatch(updatePlatinumPieces(checkCoinAmount(value, coin.pp)))
          }
        />
      </Stack>
    </Container>
  );
};

export default Inventory;
