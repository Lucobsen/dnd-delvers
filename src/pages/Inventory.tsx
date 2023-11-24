import { Container, Typography } from "@mui/material";
import React from "react";
import { Coins } from "../components/Coins/Coins";
import { Weapons } from "../components/Weapons/Weapons";
import { Equipment } from "../components/Equipment/Equipment";

const Inventory = () => {
  return (
    <Container sx={{ my: 6 }}>
      <Typography color="rgb(25, 118, 210)" mb={1} variant="h6" align="left">
        Inventory
      </Typography>
      <Coins />
      <Weapons />
      <Equipment />
    </Container>
  );
};

export default Inventory;
