import {
  Box,
  CircularProgress,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useState } from "react";
import { useSkills } from "../../services/skills/use-skills-query";
import { SkillInfo } from "./SkillInfo";
import { useAppSelector } from "../../hooks/hooks";
import { getModifier } from "../../models/abilities.models";

const getInitialProficiencies = () => {
  const skills = localStorage.getItem("skills");

  return skills ? JSON.parse(skills) : [];
};

export const Skills = () => {
  const { skills, isFetching } = useSkills();

  const { proficiencyBonus, stats } = useAppSelector((state) => state.hero);
  const [proficientSkills, setProficientSkills] = useState<string[]>(
    getInitialProficiencies()
  );

  const onSkillChecked = (skillIndex: string) => {
    const tempProficientSkills = [...proficientSkills];
    const index = tempProficientSkills.findIndex(
      (index) => index === skillIndex
    );

    if (index >= 0) {
      tempProficientSkills.splice(index, 1);
      localStorage.setItem("skills", JSON.stringify(tempProficientSkills));
      setProficientSkills(tempProficientSkills);
    } else {
      const proficiencies = [...proficientSkills, skillIndex];
      localStorage.setItem("skills", JSON.stringify(proficiencies));
      setProficientSkills(proficiencies);
    }
  };

  return (
    <Stack
      direction="row"
      spacing={1}
      alignItems="flex-start"
      mt={1}
      width="100%"
    >
      {isFetching ? (
        <Box
          sx={{
            display: "flex",
            m: "auto",
            height: "50vh",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer
          component={Paper}
          sx={{
            border: "solid 1px rgba(0, 0, 0, 0.25)",
            borderRadius: 1,
            minWidth: "100%",
          }}
        >
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell align="center">Prof.</TableCell>
                <TableCell>Mod.</TableCell>
                <TableCell>Skill</TableCell>
                <TableCell align="center">Bonus</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {skills.map((skill) => (
                <SkillInfo
                  stat={skill.stat}
                  key={skill.id}
                  modifier={getModifier(Number.parseInt(stats[skill.stat]))}
                  bonus={Number.parseInt(proficiencyBonus) ?? 0}
                  skillName={skill.name}
                  checked={proficientSkills.includes(skill.id)}
                  handleToggle={() => onSkillChecked(skill.id)}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Stack>
  );
};
