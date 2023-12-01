import { Box, Button, Dialog, Stack, Typography } from "@mui/material";
import React from "react";

interface ConfirmationModalProps {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  content: string;
}

export const ConfirmationModal = ({
  open,
  onCancel,
  onConfirm,
  content,
}: ConfirmationModalProps) => {
  return (
    <Dialog onClose={onCancel} open={open} fullWidth>
      <Box minHeight={100} p={1} textAlign="center">
        <Typography fontWeight="bold" mb={1}>
          {content}
        </Typography>

        <Stack direction="row" spacing={1} justifyContent="center">
          <Button
            sx={{
              borderRadius: 10,
              fontSize: "12px",
            }}
            variant="contained"
            onClick={onCancel}
          >
            Cancel
          </Button>

          <Button
            sx={{
              borderRadius: 10,
              fontSize: "12px",
            }}
            color="error"
            variant="contained"
            onClick={onConfirm}
          >
            Confirm
          </Button>
        </Stack>
      </Box>
    </Dialog>
  );
};
