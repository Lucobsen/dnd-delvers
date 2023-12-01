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
import { Hero, SpellInfo } from "../../models/hero.models";
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

  const { spellInfo } = hero;

  const handleUsedSlotsChange = (id: number, slots: number | undefined) => {
    const tempSpellInfo = [...spellInfo];
    const index = tempSpellInfo.findIndex((info) => info.id === id);

    if (index >= 0 && slots !== undefined) {
      tempSpellInfo[index] = {
        ...tempSpellInfo[index],
        usedSlots: slots,
      };

      updateHeroSpellInfo(tempSpellInfo);
    }
  };

  const handleTotalSlotsChange = (id: number, slots: number | undefined) => {
    const tempSpellInfo = [...spellInfo];
    const index = tempSpellInfo.findIndex((info) => info.id === id);

    if (index >= 0 && slots !== undefined) {
      tempSpellInfo[index] = {
        ...tempSpellInfo[index],
        totalSlots: slots,
        usedSlots:
          slots < tempSpellInfo[index].usedSlots
            ? slots
            : tempSpellInfo[index].usedSlots,
      };

      updateHeroSpellInfo(tempSpellInfo);
    }
  };

  const updateHeroSpellInfo = (updatedSpellInfo: SpellInfo[]) => {
    const updatedHero: Hero = {
      ...hero,
      spellInfo: updatedSpellInfo,
    };
    dispatch(updateHero(updatedHero));
  };

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{ border: "1px solid rgba(0, 0, 0, 0.23)" }}
      >
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
            {spellInfo.map(({ id, totalSlots, usedSlots }) => (
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
                      onClick={() => handleTotalSlotsChange(id, ++totalSlots)}
                    >
                      <ArrowDropUpRoundedIcon />
                    </StyledStepperButton>

                    <Typography fontSize="small">{totalSlots}</Typography>

                    <StyledStepperButton
                      disabled={totalSlots === 0}
                      onClick={() => handleTotalSlotsChange(id, --totalSlots)}
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

                          handleUsedSlotsChange(id, newUsedCount);
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
