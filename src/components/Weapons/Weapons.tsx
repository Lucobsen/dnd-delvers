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
import { Hero, Weapon } from "../../models/hero.models";
import { TextBox } from "../shared/TextBox";
import { useParams } from "react-router-dom";
import { updateHero } from "../../store/slices/HeroHoardSlice";

const StyledTableCell = styled(TableCell)`
  padding: 0 4px;
  font-size: 10px;
`;

export const Weapons = () => {
  const { id } = useParams();
  const hero = useAppSelector((state) =>
    state.heroHoard.find(({ id: heroId }) => heroId === id)
  );
  const dispatch = useAppDispatch();

  if (!hero) return null;

  const { weapons } = hero;

  const handleUpdateWeapon = (updatedWeapon: Weapon) => {
    const tempWeapons = [...weapons];

    const index = tempWeapons.findIndex(({ id }) => id === updatedWeapon.id);

    if (index < 0) return;

    tempWeapons[index] = updatedWeapon;

    const updatedHero: Hero = { ...hero, weapons: tempWeapons };
    dispatch(updateHero(updatedHero));
  };

  return (
    <Container disableGutters sx={{ my: 1 }}>
      <Typography variant="body2" color="rgb(25, 118, 210)">
        Weapons
      </Typography>

      <TableContainer
        component={Paper}
        sx={{ width: "unset", p: 1, border: "1px solid rgba(0, 0, 0, 0.23)" }}
      >
        <Table size="small" padding="none">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell width={10}>Attack</StyledTableCell>
              <StyledTableCell width={60}>Damage</StyledTableCell>
              <StyledTableCell width={40}>Range</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {weapons.map((weapon) => (
              <TableRow key={weapon.id}>
                <StyledTableCell>
                  <TextBox
                    size="small"
                    variant="standard"
                    value={weapon.name ?? ""}
                    onChange={(value) =>
                      handleUpdateWeapon({ ...weapon, name: value })
                    }
                  />
                </StyledTableCell>

                <StyledTableCell>
                  <TextBox
                    size="small"
                    variant="standard"
                    value={weapon.attack ?? ""}
                    onChange={(value) =>
                      handleUpdateWeapon({ ...weapon, attack: value })
                    }
                  />
                </StyledTableCell>

                <StyledTableCell>
                  <TextBox
                    size="small"
                    variant="standard"
                    value={weapon.damage ?? ""}
                    onChange={(value) =>
                      handleUpdateWeapon({ ...weapon, damage: value })
                    }
                  />
                </StyledTableCell>

                <StyledTableCell>
                  <TextBox
                    size="small"
                    variant="standard"
                    value={weapon.range ?? ""}
                    onChange={(value) =>
                      handleUpdateWeapon({ ...weapon, range: value })
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
