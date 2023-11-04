import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
} from "@mui/material";
import React from "react";

interface SelectComponentProps {
  isFetching: boolean;
  onValueChange: (newValue: string) => void;
  options: string[];
  label: string;
  value: string | undefined;
}

export const SelectComponent = ({
  isFetching,
  onValueChange,
  options,
  label,
  value,
}: SelectComponentProps) => {
  return (
    <>
      {isFetching ? (
        <Skeleton width="100%" height="56px" />
      ) : (
        <FormControl fullWidth sx={{ textAlign: "left" }}>
          <InputLabel>{label}</InputLabel>
          <Select
            value={value}
            label={label}
            onChange={(event) => onValueChange(event.target.value)}
          >
            {options.map((option) => (
              <MenuItem
                sx={{ alignItems: "flex-start" }}
                key={option}
                value={option}
              >
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </>
  );
};
