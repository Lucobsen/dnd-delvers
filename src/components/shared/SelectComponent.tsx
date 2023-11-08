import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
} from "@mui/material";
import React from "react";

interface SelectComponentProps {
  isFetching?: boolean;
  onValueChange: (newValue: string) => void;
  options: string[];
  label: string;
  value: string | undefined;
}

export const SelectComponent = ({
  isFetching = false,
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
            SelectDisplayProps={{
              style: { paddingRight: "14px", textOverflow: "unset" },
            }}
            IconComponent={() => null}
            value={value}
            label={label}
            onChange={(event) => onValueChange(event.target.value)}
          >
            {options.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </>
  );
};
