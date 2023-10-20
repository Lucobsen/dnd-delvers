import {
  ListItemButton,
  ListItemIcon,
  Radio,
  ListItemText,
} from "@mui/material";
import React, { useState } from "react";

export const SkillButton = ({
  skillName,
  handleToggle,
  checked,
}: {
  skillName: string;
  checked: boolean;
  handleToggle: () => void;
}) => {
  const [isProficient, setIsProficient] = useState(false);

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
        secondary={`(${isProficient ? "2" : "0"})`}
      />
    </ListItemButton>
  );
};
