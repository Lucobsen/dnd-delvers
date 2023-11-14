import {
  Container,
  IconButton,
  List,
  ListItem,
  ListSubheader,
  Paper,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { updateCantrips } from "../../store/slices/HeroSlice";

export const Cantrips = () => {
  const { spells } = useAppSelector((state) => state.hero);
  const dispatch = useAppDispatch();

  const [newCantrip, setNewCantrip] = useState("");

  const handleDeleteCantrip = (index: number) => {
    const tempCantrips = [...spells.cantrips];
    tempCantrips.splice(index, 1);

    localStorage.setItem("cantrips", JSON.stringify([...tempCantrips]));
    dispatch(updateCantrips([...tempCantrips]));
  };

  const handleUpdateCantrip = (
    { target }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const tempCantrips = [...spells.cantrips];
    tempCantrips[index] = target.value;

    localStorage.setItem("cantrips", JSON.stringify([...tempCantrips]));
    dispatch(updateCantrips([...tempCantrips]));
  };

  const handleAddCantrip = () => {
    const updatedCantrips = [...spells.cantrips, newCantrip];
    localStorage.setItem("cantrips", JSON.stringify(updatedCantrips));
    dispatch(updateCantrips(updatedCantrips));
    setNewCantrip("");
  };

  return (
    <Container component={Paper} sx={{ mb: 1 }}>
      <List dense sx={{ pt: 0 }}>
        <ListSubheader
          sx={{ height: 30, color: "rgb(25, 118, 210)" }}
          disableGutters
        >
          Cantrips
        </ListSubheader>
        {spells.cantrips.map((cantrip, index) => (
          <ListItem
            key={`${cantrip}-${index}`}
            dense
            disableGutters
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleDeleteCantrip(index)}
              >
                <DeleteIcon />
              </IconButton>
            }
          >
            <TextField
              fullWidth
              variant="standard"
              value={cantrip}
              placeholder="Add cantrip"
              onBlur={(event) => {
                if (event.target.value === "") handleDeleteCantrip(index);
              }}
              onChange={(event) => handleUpdateCantrip(event, index)}
            />
          </ListItem>
        ))}
        <ListItem
          dense
          disableGutters
          secondaryAction={
            <IconButton
              disabled={newCantrip === ""}
              edge="end"
              aria-label="add"
              onClick={handleAddCantrip}
            >
              <AddIcon />
            </IconButton>
          }
        >
          <TextField
            fullWidth
            variant="standard"
            placeholder="Add cantrip"
            value={newCantrip}
            onChange={(event) => setNewCantrip(event.target.value)}
          />
        </ListItem>
      </List>
    </Container>
  );
};
