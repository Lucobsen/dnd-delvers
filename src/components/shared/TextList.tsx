import {
  IconButton,
  List,
  ListItem,
  ListSubheader,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

interface TextListProps {
  onDelete: (index: number) => void;
  onUpdate: (value: string, index: number) => void;
  onAdd: (value: string) => void;
  title: string;
  items: string[];
  placeholder?: string;
  disableGutters?: boolean;
}

export const TextList = ({
  onDelete,
  title,
  onAdd,
  items,
  onUpdate,
  placeholder = "",
  disableGutters = true,
}: TextListProps) => {
  const [newItem, setNewItem] = useState("");

  return (
    <List dense sx={{ pt: 0 }}>
      <ListSubheader
        sx={{ height: 30, color: "rgb(25, 118, 210)" }}
        disableGutters
      >
        {title}
      </ListSubheader>
      {items.map((item, index) => (
        <ListItem
          key={index}
          dense
          disableGutters={disableGutters}
          secondaryAction={
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={() => onDelete(index)}
              color="error"
            >
              <DeleteIcon />
            </IconButton>
          }
        >
          <TextField
            fullWidth
            variant="standard"
            value={item}
            placeholder={placeholder}
            onBlur={(event) => {
              if (event.target.value === "") onDelete(index);
            }}
            onChange={(event) => onUpdate(event.target.value, index)}
          />
        </ListItem>
      ))}
      <ListItem
        dense
        disableGutters={disableGutters}
        secondaryAction={
          <IconButton
            disabled={newItem === ""}
            edge="end"
            aria-label="add"
            color="success"
            onClick={() => {
              onAdd(newItem);
              setNewItem("");
            }}
          >
            <AddIcon />
          </IconButton>
        }
      >
        <TextField
          fullWidth
          variant="standard"
          placeholder={placeholder}
          value={newItem}
          onChange={(event) => setNewItem(event.target.value)}
        />
      </ListItem>
    </List>
  );
};
