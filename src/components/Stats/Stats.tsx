import { Grid } from "@mui/material";
import React from "react";
import { abilityScores } from "../../models/abilities.models";
import { useAppSelector, useAppDispatch } from "../../hooks/hooks";
import { Hero, Stats } from "../../models/hero.models";
import { StatItem } from "./StatItem";
import { useClassSavingThrows } from "../../services/classes/classes.service";
import { useParams } from "react-router-dom";
import { updateHero } from "../../store/slices/HeroHoardSlice";

export const HeroStats = () => {
  const { id } = useParams();
  const hero = useAppSelector((state) =>
    state.heroHoard.find(({ id: heroId }) => heroId === id)
  );
  const dispatch = useAppDispatch();

  const { savingThrows } = useClassSavingThrows(hero?.classId);

  if (!hero) return null;

  const { stats } = hero;

  const onStatsChange = (statId: string, value: string) => {
    const newStats: Stats = {
      ...stats,
      [statId]: value,
    };

    const updatedHero: Hero = { ...hero, stats: newStats };
    dispatch(updateHero(updatedHero));
  };

  return (
    <Grid container spacing={1} mt={1}>
      {abilityScores.map((score) => {
        const value = Number.parseInt(stats[score.id]);

        return (
          <StatItem
            isSaveProficient={savingThrows.includes(score.id)}
            key={score.id}
            statValue={Number.isNaN(value) ? 0 : value}
            statId={score.id}
            onStatsChange={onStatsChange}
          />
        );
      })}
    </Grid>
  );
};
