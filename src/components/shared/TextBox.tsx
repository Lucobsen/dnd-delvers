import { TextField } from "@mui/material";
import React from "react";

interface TextBoxProps {
  value: string;
  label?: string;
  isNumber?: boolean;
  variant?: "filled" | "standard" | "outlined" | undefined;
  onChange?: (newValue: string) => void;
  placeholder?: string;
  readOnly?: boolean;
  size?: "small" | "medium" | "large";
}

export const TextBox = ({
  value,
  label,
  isNumber,
  variant = "outlined",
  onChange,
  placeholder,
  readOnly,
  size = "medium",
}: TextBoxProps) => (
  <TextField
    InputLabelProps={{ sx: { overflow: "visible" } }}
    fullWidth
    value={value}
    label={label}
    InputProps={{
      readOnly,
      disableUnderline: true,
      style: {
        fontSize: size === "small" ? 12 : "inherit",
      },
    }}
    placeholder={placeholder}
    type={isNumber ? "number" : "text"}
    variant={variant}
    onChange={(event) => onChange?.(event.target.value)}
  />
);
