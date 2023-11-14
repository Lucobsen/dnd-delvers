import { Button, Typography } from "@mui/material";
import {
  DataGrid,
  GridCellParams,
  GridColDef,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import React, { useState } from "react";
import { useAppSelector } from "../../hooks/hooks";
import { SpellModal } from "./SpellModal";
import { SpellInfo } from "../../store/slices/HeroSlice";

const columns: GridColDef<SpellInfo>[] = [
  {
    field: "id",
    headerName: "Level",
    disableColumnMenu: true,
    width: 60,
    sortable: false,
    hideSortIcons: true,
    type: "number",
    align: "center",
    valueGetter: ({ row }) => row.id,
    renderCell: ({ row }) => <Button>{row.id}</Button>,
  },
  {
    field: "totalSlots",
    headerName: "Total Slots",
    editable: true,
    sortable: false,
    disableColumnMenu: true,
    hideSortIcons: true,
    type: "number",
    align: "center",
    valueGetter: ({ row, value }: GridValueGetterParams<SpellInfo, number>) =>
      value ?? row.totalSlots,
  },
  {
    field: "usedSlots",
    headerName: "Used Slots",
    editable: true,
    sortable: false,
    disableColumnMenu: true,
    type: "number",
    align: "center",
    valueGetter: ({ row, value }: GridValueGetterParams<SpellInfo, number>) =>
      value ?? row.usedSlots,
  },
];

export const SpellList = () => {
  const { spells } = useAppSelector((state) => state.hero.spells);
  const [openSpellDialog, setOpenSpellDialog] = useState(false);
  const [selectedSpellLevel, setSelectedSpellLevel] = useState<number | null>(
    null
  );

  return (
    <>
      <Typography variant="body2" color="rgb(25, 118, 210)">
        Spell List
      </Typography>
      <DataGrid
        columns={columns}
        rows={spells}
        rowHeight={30}
        hideFooter
        onCellEditStop={({ value }: GridCellParams<SpellInfo, number>) =>
          console.log("%cSpellList.tsx line:63 value", "color: #007acc;", value)
        }
        onCellClick={({ row, field }: GridCellParams<SpellInfo>) => {
          if (field !== "id") return;

          setSelectedSpellLevel(row.id);
          setOpenSpellDialog(true);
        }}
      />

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
