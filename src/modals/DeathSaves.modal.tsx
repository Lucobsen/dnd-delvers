import { Box, Dialog, Radio, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

const LIVING_GREEN = "#2e7d32;";
const DEAD_RED = "rgba(102, 23, 23, 0.8)";

interface DeathSaveModalProps {
  open: boolean;
  onClose: () => void;
}

export const DeathSaveModal = ({ open, onClose }: DeathSaveModalProps) => {
  const [successes, setSuccesses] = useState([false, false, false]);
  const [failures, setFailures] = useState([false, false, false]);
  const [heroState, setHeroState] = useState<"dead" | "alive" | "dying">(
    "dying"
  );

  useEffect(() => {
    const successesStatus = successes.reduce(
      (acc, value) => acc && value,
      true
    );
    const failuresStatus = failures.reduce((acc, value) => acc && value, true);

    if (successesStatus) {
      setHeroState("alive");
    } else if (failuresStatus) {
      setHeroState("dead");
    } else {
      setHeroState("dying");
    }
  }, [successes, failures]);

  const onSuccessChange = (newValue: boolean, index: number) => {
    const tempSuccesses = [...successes];

    tempSuccesses[index] = newValue;

    setSuccesses(tempSuccesses);
  };

  const onFailureChange = (newValue: boolean, index: number) => {
    const tempFailures = [...failures];

    tempFailures[index] = newValue;

    setFailures(tempFailures);
  };

  const onDialogClose = () => {
    setFailures([false, false, false]);
    setSuccesses([false, false, false]);
    onClose();
  };

  return (
    <Dialog
      onClose={onDialogClose}
      open={open}
      fullWidth
      slotProps={{
        backdrop: { style: { backgroundColor: DEAD_RED } },
      }}
    >
      <Box minHeight={100} p={1} textAlign="center">
        <Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography>Successes</Typography>
            <Box>
              {successes.map((success, index) => (
                <Radio
                  key={index}
                  color="success"
                  checked={success}
                  onClick={() => onSuccessChange(!success, index)}
                />
              ))}
            </Box>
          </Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography>Failures</Typography>
            <Box>
              {failures.map((failure, index) => (
                <Radio
                  key={index}
                  checked={failure}
                  onClick={() => onFailureChange(!failure, index)}
                  sx={{
                    "&.Mui-checked": {
                      color: DEAD_RED,
                    },
                  }}
                />
              ))}
            </Box>
          </Stack>
        </Stack>
        {heroState === "dead" && (
          <Typography fontWeight="bold" color={DEAD_RED}>
            YOU DIED
          </Typography>
        )}
        {heroState === "alive" && (
          <Typography fontWeight="bold" color={LIVING_GREEN}>
            YOU LIVED
          </Typography>
        )}
        {heroState === "dying" && (
          <Typography fontWeight="bold">DEATH SAVES</Typography>
        )}
      </Box>
    </Dialog>
  );
};
