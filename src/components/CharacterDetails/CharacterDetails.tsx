import { Autocomplete, Container, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import { useRaces } from "../../services/races/races.services";
import { useClasses } from "../../services/classes/classes.service";
import { DataItem } from "../../services/api";

export const CharacterDetails = () => {
  const { races, isFetching: isFetchingRaces } = useRaces();
  const { classes, isFetching: isFetchingClasses } = useClasses();

  const [selectedRace, setSelectedRace] = useState<DataItem | null>(null);
  const [selectedClass, setSelectedClass] = useState<DataItem | null>(null);

  const [characterName, setCharacterName] = useState("");
  const [characterRace, setCharacterRace] = useState("");
  const [characterClass, setCharacterClass] = useState("");

  if (isFetchingRaces || isFetchingClasses) return null;

  return (
    <>
      <TextField
        sx={{ paddingBottom: 2 }}
        fullWidth
        value={characterName}
        label="Name"
        placeholder="Enter Name"
        variant="outlined"
        onChange={(event) => setCharacterName(event.target.value)}
      />
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-evenly"
        spacing={1}
        pb={2}
      >
        <Autocomplete
          fullWidth
          value={selectedRace}
          onChange={(_, newValue) => setSelectedRace(newValue)}
          inputValue={characterRace}
          onInputChange={(_, newValue) => setCharacterRace(newValue)}
          disablePortal
          options={races}
          getOptionLabel={(options) => options.name}
          renderInput={(params) => (
            <TextField {...params} label="Race" placeholder="Select Race" />
          )}
        />

        <Autocomplete
          fullWidth
          value={selectedClass}
          onChange={(_, newValue) => setSelectedClass(newValue)}
          inputValue={characterClass}
          onInputChange={(_, newValue) => setCharacterClass(newValue)}
          disablePortal
          options={classes}
          getOptionLabel={(options) => options.name}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Class"
              placeholder="Select Class"
              onChange={(event) => setCharacterClass(event.target.value)}
            />
          )}
        />
      </Stack>
    </>
  );
};
