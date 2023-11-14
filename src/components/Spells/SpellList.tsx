import { Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React from "react";

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "Level",
    disableColumnMenu: true,
    width: 60,
    sortable: false,
    hideSortIcons: true,
    align: "center",
  },
  {
    field: "total",
    headerName: "Total Slots",
    editable: true,
    sortable: false,
    disableColumnMenu: true,
    hideSortIcons: true,
    type: "number",
    align: "center",
  },
  {
    field: "used",
    headerName: "Used Slots",
    editable: true,
    sortable: false,
    disableColumnMenu: true,
    type: "number",
    align: "center",
  },
];

const rows = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
  { id: 7 },
  { id: 8 },
  { id: 9 },
];

export const SpellList = () => {
  return (
    <>
      <Typography variant="body2" color="rgb(25, 118, 210)">
        Spell List
      </Typography>
      <DataGrid
        columns={columns}
        rows={rows}
        rowHeight={30}
        hideFooterPagination
        hideFooter
      />
    </>
  );
};
