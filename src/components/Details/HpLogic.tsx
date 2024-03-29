import { Grid, LinearProgress } from "@mui/material";
import React from "react";
import { TextBox } from "../shared/TextBox";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { Hero } from "../../models/hero.models";
import { useParams } from "react-router-dom";
import { updateHero } from "../../store/slices/HeroHoardSlice";

const getBarColor = (hp: number) => {
  if (hp >= 50) return "success";
  if (hp >= 25) return "warning";
  return "error";
};

const getHpValue = (currentHp: string, maxHp: string) => {
  const currentHpValue = Number.parseInt(currentHp);
  const maxHpValue = Number.parseInt(maxHp);

  if (Number.isNaN(currentHpValue) || Number.isNaN(maxHpValue)) return 0;

  const hpValue = (currentHpValue / maxHpValue) * 100;

  return hpValue > 100 ? 100 : hpValue;
};

const setHpValue = (newValue: string, currentValue: string) => {
  const parsedNewValue = Number.parseInt(newValue);

  if (parsedNewValue > 999) return currentValue;

  return newValue;
};

interface HpLogicProps {
  onDeathSaveChange: (showModal: boolean) => void;
}

export const HpLogic = ({ onDeathSaveChange }: HpLogicProps) => {
  const { id } = useParams();
  const hero = useAppSelector((state) =>
    state.heroHoard.find(({ id: heroId }) => heroId === id)
  );
  const dispatch = useAppDispatch();

  if (!hero) return null;

  const { hp } = hero;

  const onHpChange = (newValue: string) => {
    let newHpValue = "0";

    if (newValue !== "0.0") {
      newHpValue = setHpValue(newValue, hp.current);
    } else {
      onDeathSaveChange(true);
    }

    const updatedHero: Hero = {
      ...hero,
      hp: { ...hp, current: newHpValue },
    };
    dispatch(updateHero(updatedHero));
  };

  const onMaxHpChange = (newValue: string) => {
    const newHpValue = setHpValue(newValue, hp.max);
    const updatedHero: Hero = {
      ...hero,
      hp: { ...hp, max: newHpValue },
    };
    dispatch(updateHero(updatedHero));
  };

  return (
    <Grid container>
      <Grid item xs={6}>
        <TextBox
          value={hp.current}
          label="HP"
          isNumber
          variant="standard"
          onChange={onHpChange}
        />
      </Grid>

      <Grid item xs={6}>
        <TextBox
          value={hp.max}
          label="Max HP"
          isNumber
          variant="standard"
          onChange={onMaxHpChange}
        />
      </Grid>

      <Grid item xs={12} mt={0.5}>
        <LinearProgress
          color={getBarColor(getHpValue(hp.current, hp.max))}
          variant="determinate"
          value={getHpValue(hp.current, hp.max)}
        />
      </Grid>
    </Grid>
  );
};
