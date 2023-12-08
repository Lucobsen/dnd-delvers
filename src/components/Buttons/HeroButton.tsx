import {
  Button,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

interface HeroButtonProps {
  id: string;
  name: string;
  classId?: string;
  level: string;
  race?: string;
}

export const HeroButton = ({
  id,
  name,
  classId = "",
  level,
  race = "",
}: HeroButtonProps) => {
  const { breakpoints } = useTheme();
  const isMobile = useMediaQuery(breakpoints.down("sm"));

  return (
    <NavLink to={`../${id}/details`}>
      <Button
        variant="outlined"
        sx={{
          maxWidth: 320,
        }}
        fullWidth={isMobile}
      >
        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          sx={{
            overflow: "hidden",
          }}
        >
          <AccountBoxIcon fontSize="large" />
          <Stack
            alignItems="flex-start"
            sx={{
              overflow: "hidden",
            }}
          >
            <Typography
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                width: "100%",
              }}
            >
              {name === "" ? "Untitled Hero" : name}
            </Typography>
            {!isMobile && (
              <Stack direction="row" alignItems="center">
                <Typography variant="caption">{`Level ${level}`}</Typography>
                {race !== "" && (
                  <Typography variant="caption">{`-${race}`}</Typography>
                )}
                {classId !== "" && (
                  <Typography variant="caption">{`-${classId}`}</Typography>
                )}
              </Stack>
            )}
          </Stack>
        </Stack>
      </Button>
    </NavLink>
  );
};
