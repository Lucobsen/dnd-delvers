import {
  Button,
  Checkbox,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { SpellModal } from "./SpellModal";
import { Hero } from "../../models/hero.models";
import { StyledStepperButton } from "../shared/StepperButton";
import ArrowDropUpRoundedIcon from "@mui/icons-material/ArrowDropUpRounded";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import { useParams } from "react-router-dom";
import { updateHero } from "../../store/slices/HeroHoardSlice";

export const SpellList = () => {
  const { id } = useParams();
  const hero = useAppSelector((state) =>
    state.heroHoard.find(({ id: heroId }) => heroId === id)
  );
  const dispatch = useAppDispatch();

  const [openSpellDialog, setOpenSpellDialog] = useState(false);
  const [selectedSpellLevel, setSelectedSpellLevel] = useState<number | null>(
    null
  );

  if (!hero) return null;

  const { spells } = hero;

  const handleSlotsChange = (
    id: number,
    type: "total" | "used",
    slots: number | undefined
  ) => {
    const tempSpells = [...spells.spellList];
    const index = tempSpells.findIndex((info) => info.id === id);

    if (index >= 0 && slots !== undefined) {
      if (type === "total") {
        tempSpells[index].totalSlots = slots;

        if (slots < tempSpells[index].usedSlots) {
          tempSpells[index].usedSlots = slots;
        }
      } else if (type === "used") {
        tempSpells[index].usedSlots = slots;
      }
    }

    const updatedHero: Hero = {
      ...hero,
      spells: { ...hero.spells, spellList: tempSpells },
    };
    dispatch(updateHero(updatedHero));
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Typography variant="body2" color="rgb(25, 118, 210)">
          Spell List
        </Typography>
        <Table padding="none" size="small">
          <TableHead>
            <TableRow>
              <TableCell padding="normal">Level</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Used</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {spells.spellList.map(({ id, totalSlots, usedSlots }) => (
              <TableRow key={id}>
                <TableCell sx={{ width: 80 }}>
                  <Button
                    onClick={() => {
                      setSelectedSpellLevel(id);
                      setOpenSpellDialog(true);
                    }}
                  >
                    {id}
                  </Button>
                </TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <StyledStepperButton
                      disabled={totalSlots === 4}
                      onClick={() => {
                        handleSlotsChange(id, "total", ++totalSlots);
                      }}
                    >
                      <ArrowDropUpRoundedIcon />
                    </StyledStepperButton>

                    <Typography fontSize="small">{totalSlots}</Typography>

                    <StyledStepperButton
                      disabled={totalSlots === 0}
                      onClick={() => {
                        handleSlotsChange(id, "total", --totalSlots);
                      }}
                    >
                      <ArrowDropDownRoundedIcon />
                    </StyledStepperButton>
                  </Stack>
                </TableCell>
                <TableCell sx={{ width: 100 }}>
                  <Stack direction="row">
                    {Array.from(Array(totalSlots)).map((_, index) => (
                      <Checkbox
                        key={index}
                        size="small"
                        sx={{ padding: 0 }}
                        checked={
                          index + 1 <= Array.from(Array(usedSlots)).length
                        }
                        onChange={(_, checked) => {
                          const newUsedCount = checked
                            ? ++usedSlots
                            : --usedSlots;

                          handleSlotsChange(id, "used", newUsedCount);
                        }}
                      />
                    ))}
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <SpellModal
        selectedSpellLevel={selectedSpellLevel}
        open={openSpellDialog}
        onClose={() => {
          setSelectedSpellLevel(null);
          setOpenSpellDialog(false);
        }}
      />
    </>
  );
};
