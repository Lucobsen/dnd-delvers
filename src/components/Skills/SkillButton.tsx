import {
  ListItemButton,
  ListItemIcon,
  Radio,
  ListItemText,
} from "@mui/material";
import React, { useState } from "react";

interface SkillButtonProps {
  skillName: string;
  checked: boolean;
  handleToggle: () => void;
  bonus: number;
}

export const SkillButton = ({
  skillName,
  handleToggle,
  checked,
  bonus,
}: SkillButtonProps) => {
  const [isProficient, setIsProficient] = useState(checked);

  const onToggle = () => {
    setIsProficient(!isProficient);
    handleToggle();
  };

  return (
    <ListItemButton
      onClick={() => onToggle()}
      dense
      disableRipple
      disableGutters
    >
      <ListItemIcon sx={{ minWidth: "unset" }}>
        <Radio edge="start" checked={checked} disableRipple size="small" />
      </ListItemIcon>
      <ListItemText
        sx={{ display: "flex", justifyContent: "space-between" }}
        primary={skillName}
        secondary={`(${isProficient ? `${bonus}` : "0"})`}
      />
    </ListItemButton>
  );
};
