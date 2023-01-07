import "./App.css";
import React, { useEffect, useState } from "react";
import {
  getAllMonsters,
  getMonstersByChallengeRating,
} from "./services/monsters/monsters.service";
import { Autocomplete, Stack, TextField } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { DataItem } from "./services/api";
import { challengeRatings } from "./services/monsters/monsters.model";
import { getAllClasses } from "./services/classes/classes.service";
import { getAllRaces } from "./services/races/races.services";

export const App = () => {
  const [monsters, setMonsters] = useState<DataItem[]>([]);
  const [classes, setClasses] = useState<DataItem[]>([]);
  const [races, setRaces] = useState<DataItem[]>([]);

  useEffect(() => {
    getAllMonsters().then((data) => setMonsters(data));
    getAllClasses().then((data) => setClasses(data));
    getAllRaces().then((data) => setRaces(data));
  }, []);

  const handleCrChange = (cr?: string) => {
    if (cr) getMonstersByChallengeRating(cr).then((data) => setMonsters(data));
  };

  return (
    <div className="App">
      <Stack direction="row">
        <Stack direction="column">
          <Autocomplete
            options={challengeRatings}
            renderInput={(params) => <TextField {...params} />}
            onChange={(_, value) => handleCrChange(value ?? undefined)}
          />
          <List sx={{ maxHeight: 300, overflowY: "scroll" }}>
            {monsters.map((monster) => (
              <ListItem key={monster.index}>{monster.name}</ListItem>
            ))}
          </List>
        </Stack>

        <List sx={{ maxHeight: 300, overflowY: "scroll" }}>
          {classes.map((classItem) => (
            <ListItem key={classItem.index}>{classItem.name}</ListItem>
          ))}
        </List>

        <List sx={{ maxHeight: 300, overflowY: "scroll" }}>
          {races.map((race) => (
            <ListItem key={race.index}>{race.name}</ListItem>
          ))}
        </List>
      </Stack>
    </div>
  );
};
