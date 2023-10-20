import { Grid, InputAdornment, TextField } from "@mui/material";
import React, { useState } from "react";
import { AbilityScores } from "../../models/abilities.models";

type Stats = Record<string, string>;

export const CharacterStats = () => {
  const [stats, setStats] = useState<Stats>({
    str: "10",
    dex: "10",
    con: "10",
    int: "10",
    wis: "10",
    char: "10",
  });

  return (
    <Grid container spacing={1}>
      {AbilityScores.map((score) => {
        const value = Number.parseInt(stats[score.id]);

        return (
          <Grid item xs={4}>
            <TextField
              label={score.id.toUpperCase()}
              variant="outlined"
              value={stats[score.id]}
              onChange={(event) =>
                setStats({
                  ...stats,
                  [score.id]: event.target.value,
                })
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {!Number.isNaN(value)
                      ? `(${
                          value >= 10
                            ? Math.floor((value - 10) / 2)
                            : Math.ceil((value - 10) / 2)
                        })`
                      : "(0)"}
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
