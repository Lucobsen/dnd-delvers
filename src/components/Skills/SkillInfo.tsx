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
    <TableRow>
      <StyledCell padding="checkbox">
        <Radio
          checked={checked}
          disableRipple
          size="small"
          onClick={onToggle}
        />
      </StyledCell>
      <StyledCell>
        <Typography>{`(${
          isProficient ? bonus + modifier : modifier
        })`}</Typography>
      </StyledCell>
      <StyledCell>
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
