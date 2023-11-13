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

export const Cantrips = () => {
  const [newCantrip, setNewCantrip] = useState("");
  const [cantrips, setCantrips] = useState<string[]>([]);

  return (
    <Container component={Paper} sx={{ mb: 1 }}>
      <List dense>
        <ListSubheader
          sx={{ height: 30, color: "rgb(25, 118, 210)" }}
          disableGutters
        >
          Cantrips
        </ListSubheader>
        {cantrips.map((cantrip, index) => (
          <ListItem
            dense
            disableGutters
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => {
                  const tempCantrips = [...cantrips];
                  tempCantrips.splice(index, 1);
                  setCantrips([...tempCantrips]);
                }}
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
            />
          </ListItem>
        ))}
        <ListItem
          dense
          disableGutters
          secondaryAction={
            <IconButton
              edge="end"
              aria-label="add"
              onClick={() => {
                setCantrips([...cantrips, newCantrip]);
                setNewCantrip("");
              }}
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
