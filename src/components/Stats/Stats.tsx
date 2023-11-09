import { Grid, Typography } from "@mui/material";
import React from "react";
import { abilityScores } from "../../models/abilities.models";
import { useAppSelector, useAppDispatch } from "../../hooks/hooks";
import { Stats, updateStats } from "../../store/slices/HeroSlice";
import { StatItem } from "./StatItem";
import { useClassSavingThrows } from "../../services/classes/classes.service";

export const HeroStats = () => {
  const { stats, classId } = useAppSelector((state) => state.hero);
  const dispatch = useAppDispatch();
  const { savingThrows } = useClassSavingThrows(classId);

  const onStatsChange = (statId: string, value: string) => {
    const newStats: Stats = {
      ...stats,
      [statId]: value,
    };

    localStorage.setItem("stats", JSON.stringify(newStats));
    dispatch(updateStats(newStats));
  };

  return (
    <>
      <Typography my={0.5} color="rgb(25, 118, 210)">
        Abilities
      </Typography>
      <Grid container spacing={1}>
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
    </>
  );
};
