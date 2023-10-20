import { Autocomplete, Grid, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import { useRaces } from "../../services/races/races.services";
import { useClasses } from "../../services/classes/classes.service";
import { DataItem } from "../../services/api";
import { getProficiencyBonus, levels } from "../../models/levels.models";

export const CharacterDetails = () => {
  const { races, isFetching: isFetchingRaces } = useRaces();
  const { classes, isFetching: isFetchingClasses } = useClasses();

  const [selectedRace, setSelectedRace] = useState<DataItem | null>(null);
  const [selectedClass, setSelectedClass] = useState<DataItem | null>(null);
  const [selectedLevel, setSelectedLevel] = useState("1");

  const [characterName, setCharacterName] = useState("");
  const [characterRace, setCharacterRace] = useState("");
  const [characterClass, setCharacterClass] = useState("");
  const [characterLevel, setCharacterLevel] = useState("1");

  if (isFetchingRaces || isFetchingClasses) return null;

  return (
    <>
      <Grid container spacing={1} pb={2}>
        <Grid item xs={6}>
          <TextField
            fullWidth
            value={characterName}
            label="Name"
            placeholder="Enter Name"
            variant="outlined"
            onChange={(event) => setCharacterName(event.target.value)}
          />
        </Grid>

        <Grid item xs={3}>
          <Autocomplete
            fullWidth
            value={selectedLevel}
            onChange={(_, newValue) => newValue && setSelectedLevel(newValue)}
            inputValue={characterLevel}
            onInputChange={(_, newValue) => setCharacterLevel(newValue)}
            disablePortal
            options={levels}
            disableClearable
            renderInput={(params) => (
              <TextField {...params} label="Level" placeholder="Select Level" />
            )}
          />
        </Grid>

        <Grid item xs={3}>
          <TextField
            fullWidth
            value={getProficiencyBonus(characterLevel)}
            label="Prof. Bonus"
            InputProps={{
              readOnly: true,
            }}
            variant="outlined"
          />
        </Grid>
      </Grid>

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
