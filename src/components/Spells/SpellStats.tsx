import { Box, Grid } from "@mui/material";
import React from "react";
import { TextBox } from "../shared/TextBox";
import { useAppSelector } from "../../hooks/hooks";
import { useClassSpellcastingInfo } from "../../services/classes/classes.service";
import { getModifier } from "../../models/abilities.models";

const getSpellSaveDc = (proficiencyBonus: string, modifier: string) => {
  const proficiencyBonusValue = Number.parseInt(proficiencyBonus);
  const modifierValue = Number.parseInt(modifier);

  if (Number.isNaN(proficiencyBonusValue) || Number.isNaN(modifierValue))
    return "8";

  return (8 + proficiencyBonusValue + getModifier(modifierValue)).toString();
};

const getSpellAttackBonus = (proficiencyBonus: string, modifier: string) => {
  const proficiencyBonusValue = Number.parseInt(proficiencyBonus);
  const modifierValue = Number.parseInt(modifier);

  if (Number.isNaN(proficiencyBonusValue) || Number.isNaN(modifierValue))
    return "0";

  return (proficiencyBonusValue + getModifier(modifierValue)).toString();
};

export const SpellStats = () => {
  const { classId, proficiencyBonus, stats } = useAppSelector(
    (state) => state.hero
  );
  const { spellcastingAbility } = useClassSpellcastingInfo(classId);

  return (
    <Box mb={1}>
      <Grid container spacing={1}>
        <Grid item xs={4}>
          <TextBox
            value={spellcastingAbility?.toUpperCase() ?? "-"}
            label="Ability"
            readOnly
          />
        </Grid>

        <Grid item xs={4}>
          <TextBox
            value={
              spellcastingAbility
                ? getSpellSaveDc(proficiencyBonus, stats[spellcastingAbility])
                : "-"
            }
            label="Save DC"
            readOnly
          />
        </Grid>

        <Grid item xs={4}>
          <TextBox
            value={
              spellcastingAbility
                ? getSpellAttackBonus(
                    proficiencyBonus,
                    stats[spellcastingAbility]
                  )
                : "-"
            }
            label="Atk. Bonus"
            readOnly
          />
        </Grid>
      </Grid>
    </Box>
  );
};
