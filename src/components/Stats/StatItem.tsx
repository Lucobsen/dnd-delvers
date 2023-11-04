import { Grid, InputAdornment, TextField, styled } from "@mui/material";
import React from "react";
import { getModifier } from "../../models/abilities.models";

const StyledTextField = styled(TextField, {
  shouldForwardProp: (prop) => prop !== "$isSaveProficient",
})<{ $isSaveProficient: boolean }>(({ $isSaveProficient }) => ({
  ...($isSaveProficient && {
    label: {
      color: "rgb(25, 118, 210)",
      fontWeight: "bold",
      textDecoration: "underline",
    },
  }),
}));

interface StatItemProps {
  statId: string;
  statValue: number;
  isSaveProficient: boolean;
  onStatsChange: (statId: string, value: string) => void;
}

export const StatItem = ({
  statId,
  onStatsChange,
  statValue,
  isSaveProficient,
}: StatItemProps) => (
  <Grid item xs={4} key={statId}>
    <StyledTextField
      $isSaveProficient={isSaveProficient}
      label={statId.toUpperCase()}
      variant="outlined"
      value={statValue}
      onChange={(event) => onStatsChange(statId, event.target.value)}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            {`(${getModifier(statValue)})`}
          </InputAdornment>
        ),
      }}
    />
  </Grid>
);
