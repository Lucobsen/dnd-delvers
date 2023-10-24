import { Grid, InputAdornment, TextField } from "@mui/material";
import React, { useState } from "react";
import { AbilityScores } from "../../models/abilities.models";

const getInitialStats = () => {
  const stats = localStorage.getItem("stats");

  return stats
    ? JSON.parse(stats)
    : {
        str: "10",
        dex: "10",
        con: "10",
        int: "10",
        wis: "10",
        char: "10",
      };
};

type Stats = Record<string, string>;

export const Stats = () => {
  const [stats, setStats] = useState<Stats>(getInitialStats());

  return (
    <Grid container spacing={1}>
      {AbilityScores.map((score) => {
        const value = Number.parseInt(stats[score.id]);

        return (
          <Grid item xs={4} key={score.id}>
            <TextField
              label={score.id.toUpperCase()}
              variant="outlined"
              value={stats[score.id]}
              onChange={(event) => {
                const newStats: Stats = {
                  ...stats,
                  [score.id]: event.target.value,
                };

                localStorage.setItem("stats", JSON.stringify(newStats));
                setStats(newStats);
              }}
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
