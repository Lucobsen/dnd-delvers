import { Checkbox, Dialog, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React, { useState } from "react";

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "Level",
    disableColumnMenu: true,
    width: 60,
    hideSortIcons: true,
  },
  {
    field: "total",
    headerName: "Total",
    editable: true,
    sortable: false,
    disableColumnMenu: true,
    width: 60,
    hideSortIcons: true,
  },
  {
    field: "used",
    headerName: "Used",
    editable: true,
    sortable: false,
    disableColumnMenu: true,
  },
];

const rows = [
  { id: 1, total: 4, used: 0 },
  { id: 2, total: 4, used: 0 },
  { id: 3, total: 4, used: 0 },
];

interface SpellListProps {
  open: boolean;
  onClose: () => void;
}

export const SpellList = ({ open, onClose }: SpellListProps) => {
  const [slots, setSlots] = useState(4);
  let slotBoxes: JSX.Element[] = [];

  for (let i = 0; i < slots; i++) {
    slotBoxes.push(<Checkbox key={`slot-${i}`} size="small" />);
  }

  return (
    <Dialog onClose={onClose} open={open} fullWidth>
      <DataGrid
        columns={columns}
        rows={rows}
        rowHeight={30}
        hideFooterPagination
      />
    </Dialog>
  );
};
