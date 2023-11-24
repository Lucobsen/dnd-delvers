import {
  Box,
  CircularProgress,
  Container,
  Stack,
  Table,
  TableBody,
  Typography,
} from "@mui/material";
import React from "react";
import { useSkills } from "../services/skills/use-skills-query";
import { SkillInfo } from "../components/Skills/SkillInfo";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { getModifier } from "../models/abilities.models";
import { updateProficientSkills } from "../store/slices/HeroSlice";

const Skills = () => {
  const { skills, isLoading } = useSkills();
  const { proficiencyBonus, stats, proficientSkills } = useAppSelector(
    (state) => state.hero
  );
  const dispatch = useAppDispatch();

  const onSkillChecked = (skillIndex: string) => {
    const tempProficientSkills = [...proficientSkills];
    const index = tempProficientSkills.findIndex(
      (index) => index === skillIndex
    );

    if (index >= 0) {
      tempProficientSkills.splice(index, 1);
      dispatch(updateProficientSkills(tempProficientSkills));
    } else {
      const proficiencies = [...proficientSkills, skillIndex];
      dispatch(updateProficientSkills(proficiencies));
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
