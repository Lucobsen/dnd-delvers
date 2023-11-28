import { Stack } from "@mui/material";
import React from "react";
import { useAppSelector, useAppDispatch } from "../../hooks/hooks";
import { TextBox } from "../shared/TextBox";
import { useParams } from "react-router-dom";
import { updateHero } from "../../store/slices/HeroHoardSlice";
import { Hero } from "../../models/hero.models";

const checkCoinAmount = (newValue: string, currentValue: string) => {
  const amount = Number.parseInt(newValue);

  if (Number.isNaN(amount)) return "";

  if (amount > 999) return currentValue;

  return newValue;
};

export const Coins = () => {
  const { id } = useParams();
  const hero = useAppSelector((state) =>
    state.heroHoard.find(({ id: heroId }) => heroId === id)
  );
  const dispatch = useAppDispatch();

  if (!hero) return null;

  const { coin } = hero;

  const handleUpdateCopper = (cp: string) => {
    const updatedHero: Hero = { ...hero, coin: { ...coin, cp } };
    dispatch(updateHero(updatedHero));
  };

  const handleUpdateSilver = (sp: string) => {
    const updatedHero: Hero = { ...hero, coin: { ...coin, sp } };
    dispatch(updateHero(updatedHero));
  };

  const handleUpdateGold = (gp: string) => {
    const updatedHero: Hero = { ...hero, coin: { ...coin, gp } };
    dispatch(updateHero(updatedHero));
  };

  const handleUpdatePlatinum = (pp: string) => {
    const updatedHero: Hero = { ...hero, coin: { ...coin, pp } };
    dispatch(updateHero(updatedHero));
  };

  return (
    <Stack direction="row" spacing={1}>
      <TextBox
        label="CP"
        value={coin.cp}
        isNumber
        onChange={(value) =>
          handleUpdateCopper(checkCoinAmount(value, coin.cp))
        }
      />
      <TextBox
        label="SP"
        value={coin.sp}
        isNumber
        onChange={(value) =>
          handleUpdateSilver(checkCoinAmount(value, coin.sp))
        }
      />
      <TextBox
        label="GP"
        value={coin.gp}
        isNumber
        onChange={(value) => handleUpdateGold(checkCoinAmount(value, coin.gp))}
      />
      <TextBox
        label="PP"
        value={coin.pp}
        isNumber
        onChange={(value) =>
          handleUpdatePlatinum(checkCoinAmount(value, coin.pp))
        }
      />
    </Stack>
  );
};
