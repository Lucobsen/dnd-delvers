import { Stack } from "@mui/material";
import React from "react";
import { useAppSelector, useAppDispatch } from "../../hooks/hooks";
import {
  updateCopperPieces,
  updateSilverPieces,
  updateGoldPieces,
  updatePlatinumPieces,
} from "../../store/slices/HeroSlice";
import { TextBox } from "../shared/TextBox";

const checkCoinAmount = (newValue: string, currentValue: string) => {
  const amount = Number.parseInt(newValue);

  if (Number.isNaN(amount)) return "";

  if (amount > 999) return currentValue;

  return newValue;
};

export const Coins = () => {
  const { coin } = useAppSelector((state) => state.hero);
  const dispatch = useAppDispatch();

  return (
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
  );
};
