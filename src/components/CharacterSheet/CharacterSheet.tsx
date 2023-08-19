import { Autocomplete, Container, TextField } from "@mui/material";
import React, { useState } from "react";
import { useRaces } from "../../services/races/races.services";
import { useClasses } from "../../services/classes/classes.service";

export const CharacterSheet = () => {
    const { races, isFetching: isFetchingRaces } = useRaces();
    const { classes, isFetching: isFetchingClasses } = useClasses();

    if (isFetchingRaces || isFetchingClasses) return null;

    return (<Container>
        <TextField id='outlined-basic' label='Enter Character Name' variant='outlined' />

        <Autocomplete
            disablePortal
            options={races}
            getOptionLabel={(options) => options.name}
            renderInput={(params) => <TextField {...params} />} />

        <Autocomplete
            disablePortal
            options={classes}
            getOptionLabel={(options) => options.name}
            renderInput={(params) => <TextField {...params} />} />
    </Container>);

};