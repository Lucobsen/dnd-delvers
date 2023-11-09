import { Box, Dialog, Radio, Stack, Typography } from "@mui/material";
import React from "react";

const DEAD_RED = "rgba(102, 23, 23, 0.8)";

interface DeathSaveModalProps {
  open: boolean;
  onClose: () => void;
}

export const DeathSaveModal = ({ open, onClose }: DeathSaveModalProps) => {
  return (
    <Dialog
      onClose={onClose}
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
              <Radio color="success" />
              <Radio color="success" />
              <Radio color="success" />
            </Box>
          </Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography>Failures</Typography>
            <Box>
              <Radio
                sx={{
                  "&.Mui-checked": {
                    color: DEAD_RED,
                  },
                }}
              />
              <Radio
                sx={{
                  "&.Mui-checked": {
                    color: DEAD_RED,
                  },
                }}
              />
              <Radio
                sx={{
                  "&.Mui-checked": {
                    color: DEAD_RED,
                  },
                }}
              />
            </Box>
          </Stack>
        </Stack>
        <Typography fontWeight="bold">DEATH SAVES</Typography>
      </Box>
    </Dialog>
  );
};
