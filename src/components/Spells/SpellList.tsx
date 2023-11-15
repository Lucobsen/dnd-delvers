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
import UseNumberInputCompact from "../shared/NumberInput";
import { updateSpellSlots } from "../../store/slices/HeroSlice";

export const SpellList = () => {
  const { spells } = useAppSelector((state) => state.hero.spells);
  const dispatch = useAppDispatch();
  const [openSpellDialog, setOpenSpellDialog] = useState(false);
  const [selectedSpellLevel, setSelectedSpellLevel] = useState<number | null>(
    null
  );

  const handleSlotsChange = (
    id: number,
    type: "total" | "used",
    slots: number | undefined
  ) => {
    dispatch(updateSpellSlots({ id, type, slots: slots ?? 0 }));
  };

  return (
    <>
      <Typography variant="body2" color="rgb(25, 118, 210)">
        Spell List
      </Typography>

      <TableContainer component={Paper}>
        <Table padding="none" size="small">
          <TableHead>
            <TableRow>
              <TableCell padding="normal">Level</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Used</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {spells.map(({ id, totalSlots, usedSlots }) => (
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
                  <UseNumberInputCompact
                    onChange={(value) => handleSlotsChange(id, "total", value)}
                    initialValue={totalSlots}
                  />
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
