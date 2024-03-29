import {
  Radio,
  TableRow,
  TableCell,
  Typography,
  styled,
  Stack,
} from "@mui/material";
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
    <TableRow onClick={onToggle}>
      <StyledCell padding="none" align="left" sx={{ width: 30 }}>
        <Radio checked={checked} disableRipple size="small" sx={{ pl: 0 }} />
      </StyledCell>

      <StyledCell padding="none" align="left" sx={{ width: 20 }}>
        <Typography>{`(${
          isProficient ? bonus + modifier : modifier
        })`}</Typography>
      </StyledCell>

      <StyledCell align="left">
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography fontSize="small">{skillName}</Typography>
          <Typography fontSize={12} color="grey">
            ({stat.toUpperCase()})
          </Typography>
        </Stack>
      </StyledCell>
    </TableRow>
  );
};
