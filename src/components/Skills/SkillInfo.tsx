import { Radio, TableRow, TableCell, Typography, styled } from "@mui/material";
import React, { useState } from "react";

const StyledCell = styled(TableCell)(() => ({
  border: "none",
}));

interface SkillInfoProps {
  skillName: string;
  checked: boolean;
  handleToggle: () => void;
  modifier: number;
  bonus: number;
  stat: string;
}

export const SkillInfo = ({
  skillName,
  handleToggle,
  checked,
  bonus,
  modifier,
  stat,
}: SkillInfoProps) => {
  const [isProficient, setIsProficient] = useState(checked);

  const onToggle = () => {
    setIsProficient(!isProficient);
    handleToggle();
  };

  return (
    <TableRow>
      <StyledCell align="center" padding="checkbox">
        <Radio
          edge="start"
          checked={checked}
          disableRipple
          size="small"
          onClick={onToggle}
        />
      </StyledCell>
      <StyledCell>
        <Typography fontSize="small">{stat.toUpperCase()}</Typography>
      </StyledCell>
      <StyledCell>
        <Typography fontSize="small">{skillName}</Typography>
      </StyledCell>
      <StyledCell align="center">
        <Typography>{`(${
          isProficient ? bonus + modifier : modifier
        })`}</Typography>
      </StyledCell>
    </TableRow>
  );
};
