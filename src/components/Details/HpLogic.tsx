import { Grid, LinearProgress } from "@mui/material";
import React, { useState } from "react";
import { getInitialStorageValue } from "../../utils/get-initial-storage-value";
import { TextBox } from "../shared/TextBox";

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
  const [currentHp, setCurrentHp] = useState(
    getInitialStorageValue("currentHp")
  );
  const [maxHp, setMaxHp] = useState(getInitialStorageValue("maxHp"));

  const onHpChange = (newValue: string) => {
    let newHpValue = "0";

    if (newValue !== "0.0") {
      newHpValue = setHpValue(newValue, currentHp);
    } else {
      onDeathSaveChange(true);
    }

    localStorage.setItem("currentHp", JSON.stringify(newHpValue));
    setCurrentHp(newHpValue);
  };

  const onMaxHpChange = (newValue: string) => {
    const newHpValue = setHpValue(newValue, maxHp);
    localStorage.setItem("maxHp", JSON.stringify(newHpValue));
    setMaxHp(newHpValue);
  };

  return (
    <Grid container>
      <Grid item xs={6}>
        <TextBox
          value={currentHp}
          label="HP"
          isNumber
          variant="standard"
          onChange={onHpChange}
        />
      </Grid>

      <Grid item xs={6}>
        <TextBox
          value={maxHp}
          label="Max HP"
          isNumber
          variant="standard"
          onChange={onMaxHpChange}
        />
      </Grid>

      <Grid item xs={12} mt={0.5}>
        <LinearProgress
          color={getBarColor(getHpValue(currentHp, maxHp))}
          variant="determinate"
          value={getHpValue(currentHp, maxHp)}
        />
      </Grid>
    </Grid>
  );
};
