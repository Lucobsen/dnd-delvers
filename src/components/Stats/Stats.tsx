import { Grid, InputAdornment, TextField } from "@mui/material";
import React from "react";
import { abilityScores, getModifier } from "../../models/abilities.models";
import { useAppSelector, useAppDispatch } from "../../hooks/hooks";
import { Stats, updateStats } from "../../store/slices/HeroSlice";

export const HeroStats = () => {
  const { stats } = useAppSelector((state) => state.hero);
  const dispatch = useAppDispatch();

  const onStatsChange = (statId: string, value: string) => {
    const newStats: Stats = {
      ...stats,
      [statId]: value,
    };

    localStorage.setItem("stats", JSON.stringify(newStats));
    dispatch(updateStats(newStats));
  };

  return (
    <Grid container spacing={1}>
      {abilityScores.map((score) => {
        const value = Number.parseInt(stats[score.id]);

        return (
          <Grid item xs={4} key={score.id}>
            <TextField
              label={score.id.toUpperCase()}
              variant="outlined"
              value={stats[score.id]}
              onChange={(event) => onStatsChange(score.id, event.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {`(${getModifier(value)})`}
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};
