import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  styled,
} from "@mui/material";
import React from "react";
import { useAppSelector, useAppDispatch } from "../../hooks/hooks";
import { Weapon, updateWeapons } from "../../store/slices/HeroSlice";
import { TextBox } from "../shared/TextBox";

const StyledTableCell = styled(TableCell)`
  padding: 0 4px;
  font-size: 10px;
`;

export const Weapons = () => {
  const { weapons } = useAppSelector((state) => state.hero);
  const dispatch = useAppDispatch();

  const handleUpdateWeapon = (updatedWeapon: Weapon) => {
    const tempWeapons = [...weapons];

    const index = tempWeapons.findIndex(({ id }) => id === updatedWeapon.id);

    if (index < 0) return;

    tempWeapons[index] = updatedWeapon;

    dispatch(updateWeapons(tempWeapons));
  };

  return (
    <Container disableGutters>
      <Typography variant="body2" color="rgb(25, 118, 210)" sx={{ mt: 2 }}>
        Weapons
      </Typography>

      <TableContainer component={Paper} sx={{ p: 1 }}>
        <Table size="small" padding="none">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Attack</StyledTableCell>
              <StyledTableCell>Damage</StyledTableCell>
              <StyledTableCell>Range</StyledTableCell>
              <StyledTableCell>Ammo</StyledTableCell>
              <StyledTableCell>Used</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {weapons.map((weapon) => (
              <TableRow key={weapon.id}>
                <StyledTableCell>
                  <TextBox
                    variant="standard"
                    value={weapon.name ?? ""}
                    onChange={(value) =>
                      handleUpdateWeapon({ ...weapon, name: value })
                    }
                  />
                </StyledTableCell>

                <StyledTableCell>
                  <TextBox
                    variant="standard"
                    value={weapon.attack ?? ""}
                    onChange={(value) =>
                      handleUpdateWeapon({ ...weapon, attack: value })
                    }
                  />
                </StyledTableCell>

                <StyledTableCell>
                  <TextBox
                    variant="standard"
                    value={weapon.damage ?? ""}
                    onChange={(value) =>
                      handleUpdateWeapon({ ...weapon, damage: value })
                    }
                  />
                </StyledTableCell>

                <StyledTableCell>
                  <TextBox
                    variant="standard"
                    value={weapon.range ?? ""}
                    onChange={(value) =>
                      handleUpdateWeapon({ ...weapon, range: value })
                    }
                  />
                </StyledTableCell>

                <StyledTableCell>
                  <TextBox
                    variant="standard"
                    value={weapon.ammo ?? ""}
                    onChange={(value) =>
                      handleUpdateWeapon({ ...weapon, ammo: value })
                    }
                  />
                </StyledTableCell>

                <StyledTableCell>
                  <TextBox
                    variant="standard"
                    value={weapon.used ?? ""}
                    onChange={(value) =>
                      handleUpdateWeapon({ ...weapon, used: value })
                    }
                  />
                </StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};