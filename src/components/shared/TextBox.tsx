import { TextField } from "@mui/material";
import React from "react";

interface TextBoxProps {
  value: string;
  label: string;
  isNumber?: boolean;
  variant?: "filled" | "standard" | "outlined" | undefined;
  onChange?: (newValue: string) => void;
  placeholder?: string;
  readOnly?: boolean;
}

export const TextBox = ({
  value,
  label,
  isNumber,
  variant = "outlined",
  onChange,
  placeholder,
  readOnly,
}: TextBoxProps) => (
  <TextField
    InputLabelProps={{ sx: { overflow: "visible" } }}
    fullWidth
    value={value}
    label={label}
    InputProps={{
      readOnly,
      disableUnderline: true,
    }}
    placeholder={placeholder}
    type={isNumber ? "number" : "text"}
    variant={variant}
    onChange={(event) => onChange?.(event.target.value)}
  />
);
