import {
  Box,
  CircularProgress,
  Container,
  Stack,
  Table,
  TableBody,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useSkills } from "../services/skills/use-skills-query";
import { SkillInfo } from "../components/Skills/SkillInfo";
import { useAppSelector } from "../hooks/hooks";
import { getModifier } from "../models/abilities.models";

const getInitialProficiencies = () => {
  const skills = localStorage.getItem("skills");

  return skills ? JSON.parse(skills) : [];
};

const Skills = () => {
  const { skills, isLoading } = useSkills();
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
    <Container sx={{ my: 6 }}>
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            height: "60vh",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Stack>
          <Typography color="rgb(25, 118, 210)" variant="h6" align="left">
            Skills
          </Typography>
          <Table size="small">
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
        </Stack>
      )}
    </Container>
  );
};

export default Skills;
