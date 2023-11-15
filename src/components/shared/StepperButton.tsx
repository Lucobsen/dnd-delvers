import { styled } from "@mui/material";

const blue = {
  100: "#DAECFF",
  200: "#80BFFF",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  700: "#0059B2",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

export const StyledStepperButton = styled("button")(
  ({ theme }) => `
    display: flex;
    flex-flow: nowrap;
    justify-content: center;
    align-items: center;
    font-size: 1px;
    box-sizing: border-box;
    border: 0;
    padding: 0;
    color: inherit;
    background: ${theme.palette.mode === "dark" ? grey[900] : grey[50]};
  
    &:hover {
      cursor: pointer;
      background: ${theme.palette.mode === "dark" ? blue[700] : blue[500]};
      color: ${grey[50]};
    }
  
    &:focus-visible {
      outline: 0;
      box-shadow: 0 0 0 3px ${
        theme.palette.mode === "dark" ? blue[700] : blue[200]
      };
    }
  
    &.increment {
      grid-area: increment;
    }
  
    &.decrement {
      grid-area: decrement;
    }
  `
);
